import { NestFactory } from "@nestjs/core";
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import { AppModule } from "./app.module";
import { ValidationPipe } from "./pipes/validation.pipe";
import * as fs from "fs";
import { ExpressAdapter } from "@nestjs/platform-express";

const cors = require('cors');

async function start() {
  const PORT = process.env.PORT || 5000;

  const httpsOptions = {
    key: fs.readFileSync(
      "./certs/priv.pem"
    ),
    cert: fs.readFileSync(
      "./certs/cert.pem"
    ),
  };

  const server = express();

  server.use(cors());

  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server),
  );
  await app.init();

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());

  http.createServer(server).listen(7071);
  https.createServer(httpsOptions, server).listen(PORT);
}

start();
