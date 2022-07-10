import ExpressHttpAdapter from 'src/application/express/express.adapter';
import { IHttpAdapter } from 'src/core/adapters/http.adapter';
import express, { RequestHandler } from 'express';

export default class Server {
  readonly httpServer: IHttpAdapter<express.Express, RequestHandler>;
  readonly port: string | number;

  constructor(port: string | number) {
    this.port = port;
    this.httpServer = new ExpressHttpAdapter(express());
  }

  start(callback?: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
