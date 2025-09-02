import { Injectable } from '@nestjs/common';

import ErrorMessages from '@/core/constants/error_messages';
import AppException from '@/core/exceptions/app_exception';
import { compare, hash } from 'bcryptjs';
import ConfigurationService from './configuration.service';

@Injectable()
export class EncryptionService implements IEncryptionService {
  constructor(private readonly configurationService: ConfigurationService) {}

  async hashString(anyString: string): Promise<string> {
    try {
      return await hash(anyString, this.configurationService.get('SALT'));
    } catch (error) {
      throw new AppException(ErrorMessages.UNEXPECTED_ERROR, 500, error);
    }
  }
  async isMatch(hashedString: string, normalString: string): Promise<boolean> {
    try {
      return await compare(normalString, hashedString);
    } catch (error) {
      throw new AppException(ErrorMessages.UNEXPECTED_ERROR, 500, error);
    }
  }
}

export interface IEncryptionService {
  hashString(anyString: string): Promise<string>;
  isMatch(hashedString: string, normalString: string): Promise<boolean>;
}
