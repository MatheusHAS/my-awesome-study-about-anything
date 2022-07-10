import { CONTROLLER_WATERMARK, MODULE_WATERMARK, ROUTE_WATERMARK } from 'src/core/tokens';

export const isValidController = (target: any) => {
  return !!Reflect.getMetadata(CONTROLLER_WATERMARK, target);
};

export const isValidModule = (target: any) => {
  return !!Reflect.getMetadata(MODULE_WATERMARK, target);
};

export const isValidRoute = (target: any) => {
  return !!Reflect.getMetadata(ROUTE_WATERMARK, target);
};
