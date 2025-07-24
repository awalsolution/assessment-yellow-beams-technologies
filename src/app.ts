import 'reflect-metadata';
import fs from 'node:fs';
import path from 'node:path';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, HOST, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@/src/config/env';
import connectDB from '@/src/config/database';
import { Routes } from '@/src/interfaces/routes';
import { ErrorMiddleware } from '@/src/middleware/error';
import { logger, stream } from '@/src/utils/logger';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public host: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.host = HOST || '127.0.0.1';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App is started at http://${this.host}:${this.port}`);
      logger.info(`🚀 REST API docs is available at http://${this.host}:${this.port}/docs`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await connectDB();
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    // this.app.options('*', cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/uploads', express.static('uploads'));
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'REST API',
          version: '3.0.0',
          description: 'API docs',
        },
        servers: [
          {
            url: `http://${this.host}:${this.port}`,
            description: 'Development Server',
          },
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },

      apis: this.getSwaggerFilePaths(__dirname + '/docs'),
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  public getSwaggerFilePaths(directory: any) {
    if (!fs.existsSync(directory)) {
      logger.warn(`Swagger docs directory not found: ${directory}`);
      return [];
    }

    const swaggerFiles = fs.readdirSync(directory).filter(file => {
      return path.extname(file) === '.yaml';
    });
    return swaggerFiles.map(file => path.join(directory, file));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
