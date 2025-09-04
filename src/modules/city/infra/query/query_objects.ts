import CityModel from '@/modules/city/infra/models/city.model';

export interface CityQueryOptions {
  selectFields?: (keyof CityModel)[];
  relations?: string[];
  cityId?: number;
}
