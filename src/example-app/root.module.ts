import Module from 'src/core/decorators/module.decorator';
import UserModule from 'src/example-app/users/user.module';

@Module({
  modules: [UserModule],
})
export default class RootModule {}
