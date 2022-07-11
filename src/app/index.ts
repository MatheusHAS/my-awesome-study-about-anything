import { json, urlencoded } from 'express';
import 'reflect-metadata';
import HttpServer from 'src/framework/application/express';
import RootModule from 'src/app/root.module';

(async () => {
  const port = process.env.PORT || 3000;

  const application = new HttpServer({
    port,
    middlewares: [json(), urlencoded()],
    rootModule: RootModule,
  });

  application.start(() => {
    console.log(`Listening server on http://localhost:${port}`);
  });
})();
