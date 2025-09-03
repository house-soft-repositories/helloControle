import CreateCityService from '@/modules/city/application/create_city.service';
import CityController from '@/modules/city/controllers/city.controller';
import CityModel from '@/modules/city/infra/models/city.model';
import CityRepository from '@/modules/city/infra/repository/city.repository';
import { CITY_REPOSITORY, CREATE_CITY_SERVICE } from '@/modules/city/symbols';
import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CityModel])],
  controllers: [CityController],
  providers: [
    {
      inject: [getRepositoryToken(CityModel)],
      provide: CITY_REPOSITORY,
      useFactory: (cityRepository: Repository<CityModel>) =>
        new CityRepository(cityRepository),
    },
    {
      inject: [CITY_REPOSITORY],
      provide: CREATE_CITY_SERVICE,
      useFactory: (cityRepository: CityRepository) =>
        new CreateCityService(cityRepository),
    },
  ],
})
export default class CityModule {}
