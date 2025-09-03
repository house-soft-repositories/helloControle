import AppException from '@/core/exceptions/app_exception';
import { left, right } from '@/core/types/either';
import ICityRepository from '@/modules/city/adapters/i_city_repository';
import FindAllCitiesService from '@/modules/city/application/find_all_cities.service';
import CityEntity from '@/modules/city/domain/entities/city.entity';
import { FindAllCitiesParam } from '@/modules/city/domain/usecase/i_find_all_cities_use_case';

describe('FindAllCitiesService', () => {
  let service: FindAllCitiesService;
  let mockCityRepository: jest.Mocked<ICityRepository>;

  beforeEach(() => {
    mockCityRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
    };
    service = new FindAllCitiesService(mockCityRepository);
  });

  describe('execute', () => {
    it('should return all cities successfully', async () => {
      // Arrange
      const mockCities = [
        new CityEntity({
          id: 1,
          name: 'São Paulo',
          state: 'SP',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
        new CityEntity({
          id: 2,
          name: 'Rio de Janeiro',
          state: 'RJ',
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
      ];

      mockCityRepository.findAll.mockResolvedValue(right(mockCities));

      const param = new FindAllCitiesParam();

      // Act
      const result = await service.execute(param);

      // Assert
      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value.cities).toHaveLength(2);
        expect(result.value.cities[0].name).toBe('São Paulo');
        expect(result.value.cities[1].name).toBe('Rio de Janeiro');

        const response = result.value.fromResponse();
        expect(response).toHaveLength(2);
      }
      expect(mockCityRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no cities exist', async () => {
      // Arrange
      mockCityRepository.findAll.mockResolvedValue(right([]));

      const param = new FindAllCitiesParam();

      // Act
      const result = await service.execute(param);

      // Assert
      expect(result.isRight()).toBe(true);
      if (result.isRight()) {
        expect(result.value.cities).toHaveLength(0);

        const response = result.value.fromResponse();
        expect(response).toHaveLength(0);
      }
      expect(mockCityRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return left when repository fails', async () => {
      // Arrange
      const mockError = new AppException('Database error', 500);
      mockCityRepository.findAll.mockResolvedValue(left(mockError));

      const param = new FindAllCitiesParam();

      // Act
      const result = await service.execute(param);

      // Assert
      expect(result.isLeft()).toBe(true);
      if (result.isLeft()) {
        expect(result.value).toBe(mockError);
        expect(result.value.message).toBe('Database error');
        expect(result.value.statusCode).toBe(500);
      }
      expect(mockCityRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
