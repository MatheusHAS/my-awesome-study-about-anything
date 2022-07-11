import Koa from 'koa';
import Router from '@koa/router';
import { IHttpAdapter } from 'src/framework/core/adapters/http.adapter';
import KoaRegisterModule from 'src/framework/application/koa/koa-register-module';

export default class KoaHttpAdapter extends IHttpAdapter<Koa, any> {
  private router: Router;

  constructor(instance: Koa) {
    super(instance, new KoaRegisterModule());
    this.router = new Router();
  }

  public useMiddleware(middleware: any) {
    this.instance.use(middleware);
  }

  public get(path: string, handler: any): void {
    this.router.get(path, handler);
  }

  public post(path: string, handler: any): void {
    this.router.post(path, handler);
  }

  public put(path: string, handler: any): void {
    this.router.put(path, handler);
  }

  public delete(path: string, handler: any): void {
    this.router.delete(path, handler);
  }

  public listen(port: string | number, callback?: () => void): void {
    this.instance.use(this.router.routes());
    this.instance.listen(port, callback);
  }

  public useModule(module: object): void {
    this.router = this.registrationModule.loadModule(module, this.router);
  }
}
