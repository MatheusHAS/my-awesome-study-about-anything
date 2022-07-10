import 'reflect-metadata';
import ExpressApplicationAdapter from 'src/application/express/express.adapter';
import RootModule from 'src/example-app/root.module';

(async () => {
  const PORT = process.env.PORT || 3000;
  const application = new ExpressApplicationAdapter(PORT);
  application.useModule(RootModule);
  application.listen();
})();
