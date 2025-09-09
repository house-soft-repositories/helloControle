import UseCase from '@/core/interface/use_case';
import { CityOrganEntity } from '@/modules/city/domain/entities';

export default interface IFindOrgansByCityIdUseCase
  extends UseCase<FindOrgansByCityIdParam, FindOrgansByCityIdResponse> {}
export interface FindOrgansByCityIdParam {
  cityId: number;
}

export class FindOrgansByCityIdResponse {
  constructor(public readonly organsList: CityOrganEntity[]) {}

  fromResponse() {
    return this.organsList.map(organ => organ.toObject());
  }
}
