import CreateCityService from '@/modules/city/application/create_city.service';
import CreateCityCompanyService from '@/modules/city/application/create_city_company.service';
import CreateCityOrganService from '@/modules/city/application/create_city_organ.service';
import FindAllCitiesService from '@/modules/city/application/find_all_cities.service';
import CityController from '@/modules/city/controllers/city.controller';
import CityCompanyModel from '@/modules/city/infra/models/city-company.model';
import CityOrganModel from '@/modules/city/infra/models/city-organ.model';
import CityModel from '@/modules/city/infra/models/city.model';
import CityCompanyRepository from '@/modules/city/infra/repository/city-company.repository';
import CityOrganRepository from '@/modules/city/infra/repository/city-organ.repository';
import CityRepository from '@/modules/city/infra/repository/city.repository';
import {
  CITY_COMPANY_REPOSITORY,
  CITY_ORGAN_REPOSITORY,
  CITY_REPOSITORY,
  CREATE_CITY_COMPANY_SERVICE,
  CREATE_CITY_ORGAN_SERVICE,
  CREATE_CITY_SERVICE,
  FIND_ALL_CITIES_SERVICE,
} from '@/modules/city/symbols';
import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityModel, CityCompanyModel, CityOrganModel]),
  ],
  controllers: [CityController],
  providers: [
    {
      inject: [getRepositoryToken(CityModel)],
      provide: CITY_REPOSITORY,
      useFactory: (cityRepository: Repository<CityModel>) =>
        new CityRepository(cityRepository),
    },
    {
      inject: [getRepositoryToken(CityCompanyModel)],
      provide: CITY_COMPANY_REPOSITORY,
      useFactory: (cityCompanyRepository: Repository<CityCompanyModel>) =>
        new CityCompanyRepository(cityCompanyRepository),
    },
    {
      inject: [getRepositoryToken(CityOrganModel)],
      provide: CITY_ORGAN_REPOSITORY,
      useFactory: (cityOrganRepository: Repository<CityOrganModel>) =>
        new CityOrganRepository(cityOrganRepository),
    },
    {
      inject: [CITY_REPOSITORY],
      provide: CREATE_CITY_SERVICE,
      useFactory: (cityRepository: CityRepository) =>
        new CreateCityService(cityRepository),
    },
    {
      inject: [CITY_COMPANY_REPOSITORY],
      provide: CREATE_CITY_COMPANY_SERVICE,
      useFactory: (cityCompanyRepository: CityCompanyRepository) =>
        new CreateCityCompanyService(cityCompanyRepository),
    },
    {
      inject: [CITY_ORGAN_REPOSITORY],
      provide: CREATE_CITY_ORGAN_SERVICE,
      useFactory: (cityOrganRepository: CityOrganRepository) =>
        new CreateCityOrganService(cityOrganRepository),
    },
    {
      inject: [CITY_REPOSITORY],
      provide: FIND_ALL_CITIES_SERVICE,
      useFactory: (cityRepository: CityRepository) =>
        new FindAllCitiesService(cityRepository),
    },
  ],
})
export default class CityModule {}
