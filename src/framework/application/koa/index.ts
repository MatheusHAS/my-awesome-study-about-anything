import Koa from 'koa';
import { IHttpAdapter } from 'src/framework/core/adapters/http.adapter';
import KoaHttpAdapter from 'src/framework/application/koa/koa-http.adapter';
import { TServerConfigs } from 'src/framework/core/types/server-configs.type';

export default class KoaHttpServer {
  readonly httpServer: IHttpAdapter<any, any>;
  readonly port: string | number;

  constructor(configs: TServerConfigs) {
    this.port = configs.port;
    const instance = new Koa();
    this.httpServer = new KoaHttpAdapter(instance);
    if (configs.rootModule) {
      this.httpServer.useModule(configs.rootModule);
    }
  }

  start(callback?: () => void) {
    this.httpServer.listen(this.port, callback);
  }
}
