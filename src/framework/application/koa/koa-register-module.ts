import Router from '@koa/router';
import RegisterModuleAbstraction from 'src/framework/application/register-module.abstract';
import { isValidModule } from 'src/framework/core';
import { IModule } from 'src/framework/core/interfaces/module.interface';
import { HTTP_METHOD_DELETE, HTTP_METHOD_GET, HTTP_METHOD_POST, HTTP_METHOD_PUT } from 'src/framework/core/tokens';
import { getModuleMetadata, Logger } from 'src/framework/utils';

export default class KoaRegisterModule extends RegisterModuleAbstraction<Router> {
  loadModule(moduleClass: object, initialRouter?: any): any {
    const { controllers, modules }: IModule = getModuleMetadata(moduleClass);

    const mainRouter = initialRouter || new Router();

    this.handleController(controllers, mainRouter, this.requestCreateFactory, this.routerApplyMethodFactory);

    if (modules) {
      modules.forEach((module: any) => {
        if (!isValidModule(module)) {
          Logger(module, 'Cant load a invalid module.');
          return;
        }

        this.loadModule(module, mainRouter);
      });
    }

    return mainRouter;
  }

  requestCreateFactory(handler: any): any {
    return (context: any) => {
      context.body = handler();
    };
  }

  routerApplyMethodFactory(router: any, method: any, path: string, handler: any): void {
    if (method === HTTP_METHOD_GET) {
      Logger('RouterApplyMethodFactory', `[GET] ${path}`);
      router.get(path, handler);
    } else if (method === HTTP_METHOD_POST) {
      Logger('RouterApplyMethodFactory', `[POST] ${path}`);
      router.post(path, handler);
    } else if (method === HTTP_METHOD_PUT) {
      Logger('RouterApplyMethodFactory', `[PUT] ${path}`);
      router.put(path, handler);
    } else if (method === HTTP_METHOD_DELETE) {
      Logger('RouterApplyMethodFactory', `[DELETE] ${path}`);
      router.delete(path, handler);
    }
  }
}
