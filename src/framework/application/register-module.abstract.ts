import { isValidController, isValidRoute } from 'src/framework/core';
import { IRequestCreateFactory, IRouterApplyMethodFactory } from 'src/framework/core/types';
import {
  getFormattedPath,
  getFunctionsFromClass,
  getMethodMetadata,
  getPathMetadata,
  Logger,
} from 'src/framework/utils';

export default abstract class RegisterModuleAbstraction<TRouter = any> {
  abstract loadModule(moduleClass: object, initialRouter?: any): any;
  abstract requestCreateFactory(handler: any): any;
  abstract routerApplyMethodFactory(router: any, method: any, path: string, handler: any): void;

  loadController(
    router: TRouter,
    basePath: string,
    controllerClass: any,
    requestCreateFactory: IRequestCreateFactory,
    routerApplyMethodFactory: IRouterApplyMethodFactory,
  ) {
    if (!isValidController(controllerClass)) {
      Logger(controllerClass, 'Cant load a INVALID CONTROLLER');
      return;
    }

    const functions = getFunctionsFromClass(controllerClass);

    if (!functions.length) {
      Logger(controllerClass, 'Without routes to load, skipped.');
      return;
    }

    functions.forEach(functionName => {
      const handler = controllerClass.prototype[functionName];
      const methodMetadata = getMethodMetadata(handler);
      if (!isValidRoute(handler)) {
        Logger(controllerClass, 'Cant load a not is valid route, skipped.');
        return;
      }

      if (!methodMetadata) {
        Logger(controllerClass, `The method ${functionName} dont have a verbs (GET, POST, PUT or DELETE), skipping.`);
        return;
      }

      let pathMetadata = getPathMetadata(handler);

      const routePath = getFormattedPath(basePath, pathMetadata);
      const routeRequestHandler = requestCreateFactory(handler);

      routerApplyMethodFactory(router, methodMetadata, routePath, routeRequestHandler);
    });
  }

  handleController(
    controllers: any[] | undefined,
    router: TRouter,
    requestCreateFactory: IRequestCreateFactory,
    routerApplyMethodFactory: IRouterApplyMethodFactory,
  ) {
    if (controllers) {
      controllers.forEach((controller: any) => {
        let basePathMetadata = getPathMetadata(controller);
        if (!basePathMetadata) {
          basePathMetadata = '/';
        }
        this.loadController(router, basePathMetadata, controller, requestCreateFactory, routerApplyMethodFactory);
      });
    }
  }
}
