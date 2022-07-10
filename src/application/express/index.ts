import ExpressHttpAdapter from 'src/application/express/express.adapter';
import { IHttpAdapter } from 'src/core/adapters/http.adapter';
import express, { RequestHandler } from 'express';

export default class Server {
  readonly httpServer: IHttpAdapter<express.Express, RequestHandler>;
  readonly port: string | number;

  constructor(port: string | number, middlewares?: any[]) {
    this.port = port;
    this.httpServer = new ExpressHttpAdapter(express());
    middlewares?.forEach(middleware => this.httpServer.useMiddleware(middleware));
  }

  start(callback?: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
