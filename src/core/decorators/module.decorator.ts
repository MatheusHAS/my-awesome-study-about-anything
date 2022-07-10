import { IModule } from 'src/core/interfaces/module.interface';
import { MODULE_METADATA, MODULE_WATERMARK } from 'src/core/tokens';

const Module = (module: IModule): ClassDecorator => {
  return (target: object) => {
    Reflect.defineMetadata(MODULE_WATERMARK, true, target);
    Reflect.defineMetadata(MODULE_METADATA, module, target);
  };
};

export default Module;
export { Module };
