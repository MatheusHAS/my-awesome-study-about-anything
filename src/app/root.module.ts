import Module from 'src/framework/core/decorators/module.decorator';
import UserModule from 'src/app/users/user.module';

@Module({
  modules: [UserModule],
})
export default class RootModule {}
