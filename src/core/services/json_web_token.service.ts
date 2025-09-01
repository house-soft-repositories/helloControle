import ErrorMessages from '@/core/constants/error_messages';
import JsonWebServiceException from '@/core/exceptions/json_web_service.exception';
import { JwtSignPayload, JwtVerifyPayload } from '@/core/interface/jwt.payload';
import ConfigurationService from '@/core/services/configuration.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class JsonWebTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configurationService: ConfigurationService,
  ) {}

  async sign(payload: JwtSignPayload) {
    try {
      if (payload.type === 'access') {
        return this.jwtService.sign(payload, {
          expiresIn: this.configurationService.get(
            'ACCESS_TOKEN_EXPIRES_IN_SECONDS',
          ),
        });
      }
      return this.jwtService.sign(payload, {
        expiresIn: this.configurationService.get(
          'REFRESH_TOKEN_EXPIRES_IN_SECONDS',
        ),
      });
    } catch (error) {
      throw new JsonWebServiceException(
        ErrorMessages.UNEXPECTED_ERROR,
        500,
        error,
      );
    }
  }

  async verify(token: string): Promise<JwtVerifyPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtVerifyPayload>(
        token,
        {
          secret: this.configurationService.get('JWT_SECRET'),
        },
      );
      return payload;
    } catch (error) {
      throw new JsonWebServiceException(
        ErrorMessages.UNEXPECTED_ERROR,
        500,
        error,
      );
    }
  }
}
