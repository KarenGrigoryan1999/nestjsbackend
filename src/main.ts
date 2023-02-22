import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";
import * as fs from "fs";

async function start() {
  const PORT = process.env.PORT || 5000;
  let app;

  if (process.env.SSL === "true") {
    app = await NestFactory.create(AppModule, {
      httpsOptions: {
        key: fs.readFileSync(
          "./certs/priv.pem"
        ),
        cert: fs.readFileSync(
          "./certs/cert.pem"
        ),
      },
    });
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

start();
