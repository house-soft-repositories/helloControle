import ICityRepository from '@/modules/city/adapters/i_city_repository';
import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsActiveCityConstraint implements ValidatorConstraintInterface {
  constructor(private readonly cityRepository: ICityRepository) {}

  async validate(cityId: number, args: ValidationArguments) {
    if (!cityId) {
      return false;
    }

    try {
      const cityResult = await this.cityRepository.findOne({
        cityId: cityId,
      });

      if (cityResult.isLeft()) {
        return false;
      }

      const city = cityResult.value;
      return city.isActive;
    } catch (error) {
      return false;
    }
  }

  defaultMessage(args: ValidationArguments) {
    return 'A cidade selecionada deve estar ativa';
  }
}

export function IsActiveCity(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsActiveCityConstraint,
    });
  };
}
