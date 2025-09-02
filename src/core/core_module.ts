import { validateEnvironmentVariables } from '@/core/config/enviroment.validation';
import ConfigurationService from '@/core/services/configuration.service';
import { EncryptionService } from '@/core/services/encryption.service';
import JsonWebTokenService from '@/core/services/json_web_token.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate: validateEnvironmentVariables,
    }),
    JwtModule.registerAsync({
      imports: [CoreModule],
      inject: [ConfigurationService],
      useFactory: (configService: ConfigurationService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  providers: [ConfigurationService, EncryptionService, JsonWebTokenService],
  exports: [ConfigurationService, EncryptionService, JsonWebTokenService],
})
export default class CoreModule {}
