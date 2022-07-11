import { Router } from 'express';
import RegisterModuleAbstraction from 'src/framework/application/register-module.abstract';
import { isValidModule } from 'src/framework/core';
import { IModule } from 'src/framework/core/interfaces/module.interface';
import { HTTP_METHOD_DELETE, HTTP_METHOD_GET, HTTP_METHOD_POST, HTTP_METHOD_PUT } from 'src/framework/core/tokens';
import { getModuleMetadata, Logger } from 'src/framework/utils';

export default class ExpressRegisterModule extends RegisterModuleAbstraction<Router> {
  loadModule(moduleClass: object, initialRouter?: any): any {
    const { controllers, modules }: IModule = getModuleMetadata(moduleClass);

    const mainRouter = initialRouter || Router();

    this.handleController(controllers, mainRouter, this.requestCreateFactory, this.routerApplyMethodFactory);

    if (modules) {
      modules.forEach((module: any) => {
        if (!isValidModule(module)) {
          Logger(module, 'Cant load a invalid module.');
          return;
        }

        const moduleRouter = Router();
        this.loadModule(module, moduleRouter);
        mainRouter.use(moduleRouter);
      });
    }

    return mainRouter;
  }

  requestCreateFactory(handler: any): any {
    return (request: any, response: any) => {
      return response.send(handler(request.body));
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
