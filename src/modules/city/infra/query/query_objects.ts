import { CityCompanyModel, CityOrganModel } from '@/modules/city/infra/models';
import CityModel from '@/modules/city/infra/models/city.model';

export interface CityQueryOptions {
  selectFields?: (keyof CityModel)[];
  relations?: string[];
  cityId?: number;
}

export interface CityOrganQueryOptions {
  selectFields?: (keyof CityOrganModel)[];
  relations?: string[];
  organId?: number;
}

export interface CityCompanyQueryOptions {
  selectFields?: (keyof CityCompanyModel)[];
  relations?: string[];
  companyId?: number;
}
