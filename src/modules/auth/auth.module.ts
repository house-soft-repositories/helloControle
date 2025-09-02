import CoreModule from '@/core/core_module';
import { EncryptionService } from '@/core/services/encryption.service';
import JsonWebTokenService from '@/core/services/json_web_token.service';
import LoginService from '@/modules/auth/application/login.service';
import AuthController from '@/modules/auth/controller/auth.controller';
import { LOGIN_SERVICE } from '@/modules/auth/symbols';
import IUserRepository from '@/modules/users/adapters/i_user.repository';
import { USER_REPOSITORY } from '@/modules/users/symbols';
import UsersModule from '@/modules/users/users.module';
import { forwardRef, Module } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => UsersModule), CoreModule],
  controllers: [AuthController],
  providers: [
    {
      inject: [USER_REPOSITORY, EncryptionService, JsonWebTokenService],
      provide: LOGIN_SERVICE,
      useFactory: (
        userRepository: IUserRepository,
        encryptionService: EncryptionService,
        jsonWebTokenService: JsonWebTokenService,
      ) =>
        new LoginService(
          userRepository,
          encryptionService,
          jsonWebTokenService,
        ),
    },
  ],
})
export default class AuthModule {}
