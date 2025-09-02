import CoreModule from '@/core/core_module';
import AuthController from '@/modules/auth/controller/auth.controller';
import UsersModule from '@/modules/users/users.module';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => UsersModule), CoreModule],
  controllers: [AuthController],
})
export default class AuthModule {}
