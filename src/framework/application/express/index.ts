import express, { RequestHandler } from 'express';
import { IHttpAdapter } from 'src/framework/core/adapters/http.adapter';
import ExpressHttpAdapter from 'src/framework/application/express/express-http.adapter';
import { TServerConfigs } from 'src/framework/core/types';

export default class ExpressHttpServer {
  readonly httpServer: IHttpAdapter<express.Express, RequestHandler>;
  readonly port: string | number;

  constructor(configs: TServerConfigs) {
    this.port = configs.port;
    this.httpServer = new ExpressHttpAdapter(express());
    configs.middlewares?.forEach(middleware => this.httpServer.useMiddleware(middleware));
    if (configs.rootModule) {
      this.httpServer.useModule(configs.rootModule);
    }
  }

  start(callback?: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
