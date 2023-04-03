import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import * as uuid from "uuid";
import { InjectModel } from "@nestjs/sequelize";
import { File } from "./files.model";
import { InjectS3, S3 } from "nestjs-s3";
let bucket = { Bucket: "bad_teacher_production" };

if (process.env.NODE_ENV === "development") {
  bucket = { Bucket: "bad_teacher_development" };
}

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File) private filesRepository: typeof File,
    @InjectS3() private readonly s3: S3
  ) {}

  async createFile(inputFiles, catalog: string, isPrivate = false) {
    const { files } = inputFiles;
    let outputFiles = { id: 0 };
    try {
      if (files) {
        for (const file of files) {
          const originalFileName = file.originalname.split(".");
          const extension = originalFileName[originalFileName.length - 1];
          const fileName = `${uuid.v4()}.${extension}`;
          const filePath = path.resolve(__dirname, "..", "static", "api", catalog);
          if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
          }
          fs.writeFileSync(path.join(filePath, fileName), file.buffer);

          const savedFile = await this.filesRepository.create({
            name: fileName,
            catalog: catalog,
            is_private: isPrivate,
          });

          if (savedFile.id) {
            outputFiles = savedFile;
          }
        }

        return outputFiles;
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(
        "Ошибка при записи файла",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async uploadToS3(file: Buffer, type) {
    try {
      const generatedName = `${uuid.v4()}.${type}`;

      const { UploadId, Bucket, Key } = await this.s3
        .createMultipartUpload({
          Bucket: bucket.Bucket,
          Key: generatedName,
        })
        .promise();

      const partSize = 1024 * 1024 * 5;
      const partsCount = Math.ceil(file.length / partSize);

      const uploadedParts = [];
      let remainingBytes = file.length;

      for (let i = 1; i <= partsCount; i++) {
        let partStart = file.length - remainingBytes;
        let partEnd = Math.min(partSize, partStart + remainingBytes);

        if (i > 1) {
          partEnd = partStart + Math.min(partSize, remainingBytes);
          partStart += 1;
        }

        const uploadParams = {
          Body: file.slice(partStart, partEnd + 1),
          Bucket,
          Key,
          UploadId,
          PartNumber: i,
        };

        const uploadPartResponse = await this.s3
          .uploadPart(uploadParams)
          .promise();

        console.log(`Part #${i} uploaded. ETag: `, uploadPartResponse.ETag);

        remainingBytes -= Math.min(partSize, remainingBytes);

        uploadedParts.push({ PartNumber: i, ETag: uploadPartResponse.ETag });
      }

      const completeParams = {
        Bucket,
        Key,
        UploadId,
        MultipartUpload: {
          Parts: uploadedParts,
        },
      };
      console.log("Completing upload...");
      const completeData = await this.s3
        .completeMultipartUpload(completeParams)
        .promise();
      console.log("Upload complete: ", completeData, "\n---");

      const savedFile = await this.filesRepository.create({
        name: generatedName,
        catalog: "",
        is_private: true,
      });

      if (savedFile.id) {
        return {
          id: savedFile.id,
          name: generatedName,
          is_private: true,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getVideo(video) {
    try {
      const file = await this.s3.getObject({
        Bucket: bucket.Bucket,
        Key: video,
      });

      return new StreamableFile(file.createReadStream());
    } catch (error) {
      console.log(error);
    }
  }
}
