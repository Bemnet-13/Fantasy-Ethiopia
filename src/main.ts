/* eslint-disable prettier/prettier */
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as express from "express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  app.useStaticAssets(join(__dirname, "..", "FrontEnd/Pages"));
  app.use(
    "/FrontEnd/FantasyEthiopiadesigns",
    express.static(join(__dirname, "..", "FrontEnd/FantasyEthiopiadesigns"))
  );
  app.use(
    "/FrontEnd/FantasyEthiopialogos",
    express.static(join(__dirname, "..", "FrontEnd/FantasyEthiopialogos"))
  );
  app.use(
    "/FrontEnd/Pages/css",
    express.static(join(__dirname, "..", "FrontEnd/Pages/css"))
  );
  app.use("/FrontEnd/js", express.static(join(__dirname, "..", "FrontEnd/js")));
  app.setViewEngine("html");
  await app.listen(3000, '0.0.0.0');
}
bootstrap();