export interface IRouteItem {
  path: string;
  handler: Function;
  method: 'GET' | 'POST';
}
