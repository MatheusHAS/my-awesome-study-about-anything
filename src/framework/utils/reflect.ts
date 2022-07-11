import { IModule } from 'src/framework/core/interfaces/module.interface';
import { METHOD_METADATA, MODULE_METADATA, PATH_METADATA } from 'src/framework/core/tokens';

export const getFunctionsFromClass = (classElement: any): string[] => {
  const functions = Reflect.ownKeys(classElement.prototype);
  return functions.filter(name => name !== 'constructor').map(name => name.toString());
};

export const getModuleMetadata = (target: any): IModule => {
  const metadata: IModule = Reflect.getMetadata(MODULE_METADATA, target);
  return metadata;
};

export const getPathMetadata = (target: any): string => {
  return Reflect.getMetadata(PATH_METADATA, target);
};

export const getMethodMetadata = (target: any): Symbol => {
  return Reflect.getMetadata(METHOD_METADATA, target);
};
