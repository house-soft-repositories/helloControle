import CoreModule from '@/core/core_module';
import AuthModule from '@/modules/auth/auth.module';
import {
  ICityCompanyRepository,
  ICityOrganRepository,
} from '@/modules/city/adapters';
import ICityRepository from '@/modules/city/adapters/i_city_repository';
import CepConsultationService from '@/modules/city/application/cep-consultation.service';
import CnpjValidationService from '@/modules/city/application/cnpj-validation.service';
import CreateCityService from '@/modules/city/application/create_city.service';
import CreateCityCompanyService from '@/modules/city/application/create_city_company.service';
import CreateCityOrganService from '@/modules/city/application/create_city_organ.service';
import FindAllCitiesService from '@/modules/city/application/find_all_cities.service';
import FindAllCityCompaniesService from '@/modules/city/application/find_all_city_companies.service';
import FindAllCityOrgansService from '@/modules/city/application/find_all_city_organs.service';
import FindCityCompanyByIdService from '@/modules/city/application/find_city_company_by_id.service';
import FindCityOrganByIdService from '@/modules/city/application/find_city_organ_by_id.service';
import FindCompaniesByCityIdService from '@/modules/city/application/find_companies_by_city_id.service';
import FindOrgansByCityIdService from '@/modules/city/application/find_organs_by_city_id.service';
import UpdateCityCompanyService from '@/modules/city/application/update_city_company.service';
import UpdateCityOrganService from '@/modules/city/application/update_city_organ.service';
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
  CNPJ_VALIDATION_SERVICE,
  CREATE_CITY_COMPANY_SERVICE,
  CREATE_CITY_ORGAN_SERVICE,
  CREATE_CITY_SERVICE,
  FIND_ALL_CITIES_SERVICE,
  FIND_ALL_CITY_COMPANIES_SERVICE,
  FIND_ALL_CITY_ORGANS_SERVICE,
  FIND_CITY_COMPANY_BY_ID_SERVICE,
  FIND_CITY_ORGAN_BY_ID_SERVICE,
  FIND_COMPANIES_BY_CITY_ID_SERVICE,
  FIND_ORGANS_BY_CITY_ID_SERVICE,
  UPDATE_CITY_COMPANY_SERVICE,
  UPDATE_CITY_ORGAN_SERVICE,
} from '@/modules/city/symbols';
import { forwardRef, Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CityModel, CityCompanyModel, CityOrganModel]),
    forwardRef(() => AuthModule),
    CoreModule,
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
      useFactory: (cityRepository: ICityRepository) =>
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
      useFactory: (cityRepository: ICityRepository) =>
        new FindAllCitiesService(cityRepository),
    },
    {
      inject: [CITY_COMPANY_REPOSITORY],
      provide: FIND_ALL_CITY_COMPANIES_SERVICE,
      useFactory: (cityCompanyRepository: CityCompanyRepository) =>
        new FindAllCityCompaniesService(cityCompanyRepository),
    },
    {
      inject: [CITY_COMPANY_REPOSITORY],
      provide: FIND_CITY_COMPANY_BY_ID_SERVICE,
      useFactory: (cityCompanyRepository: CityCompanyRepository) =>
        new FindCityCompanyByIdService(cityCompanyRepository),
    },
    {
      inject: [CITY_COMPANY_REPOSITORY],
      provide: UPDATE_CITY_COMPANY_SERVICE,
      useFactory: (cityCompanyRepository: CityCompanyRepository) =>
        new UpdateCityCompanyService(cityCompanyRepository),
    },
    {
      inject: [CITY_ORGAN_REPOSITORY],
      provide: FIND_ALL_CITY_ORGANS_SERVICE,
      useFactory: (cityOrganRepository: CityOrganRepository) =>
        new FindAllCityOrgansService(cityOrganRepository),
    },
    {
      inject: [CITY_ORGAN_REPOSITORY],
      provide: FIND_CITY_ORGAN_BY_ID_SERVICE,
      useFactory: (cityOrganRepository: CityOrganRepository) =>
        new FindCityOrganByIdService(cityOrganRepository),
    },
    {
      inject: [CITY_ORGAN_REPOSITORY],
      provide: UPDATE_CITY_ORGAN_SERVICE,
      useFactory: (cityOrganRepository: CityOrganRepository) =>
        new UpdateCityOrganService(cityOrganRepository),
    },
    {
      inject: [CITY_ORGAN_REPOSITORY],
      provide: FIND_ORGANS_BY_CITY_ID_SERVICE,
      useFactory: (cityOrganRepository: ICityOrganRepository) =>
        new FindOrgansByCityIdService(cityOrganRepository),
    },
    {
      inject: [CITY_COMPANY_REPOSITORY],
      provide: FIND_COMPANIES_BY_CITY_ID_SERVICE,
      useFactory: (cityCompanyRepository: ICityCompanyRepository) =>
        new FindCompaniesByCityIdService(cityCompanyRepository),
    },
    {
      provide: CNPJ_VALIDATION_SERVICE,
      useClass: CnpjValidationService,
    },
    CepConsultationService,
  ],
  exports: [
    {
      inject: [getRepositoryToken(CityModel)],
      provide: CITY_REPOSITORY,
      useFactory: (cityRepository: Repository<CityModel>) =>
        new CityRepository(cityRepository),
    },
  ],
})
export default class CityModule {}
