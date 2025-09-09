import ItemDomainException from '@/modules/contract/exceptions/item_domain.exception';
import ItemEntity from './item.entity';
import ItemTypeEnum from './item_type.enum';

describe('ItemEntity.validate', () => {
  const validServiceProps = {
    name: 'Service Test',
    amountUsed: 50,
    totalPrice: 100,
    type: ItemTypeEnum.SERVICE,
    contractUuid: 'contract-123',
    unitPrice: null,
  };

  const validProductProps = {
    name: 'Product Test',
    amountUsed: 10,
    quantityUsed: 2,
    quantityTotal: 5,
    type: ItemTypeEnum.PRODUCT,
    contractUuid: 'contract-123',
    unitPrice: 50,
  };

  describe('General validations', () => {
    it('should throw when name is empty', () => {
      const props = { ...validServiceProps, name: '' };

      expect(() => ItemEntity.validate(props)).toThrow(
        new ItemDomainException('Name is required'),
      );
    });

    it('should throw when amountUsed is negative', () => {
      const props = { ...validServiceProps, amountUsed: -1 };

      expect(() => ItemEntity.validate(props)).toThrow(
        new ItemDomainException(
          'Amount used must be greater than or equal to 0',
        ),
      );
    });
  });

  describe('SERVICE type validations', () => {
    it('should throw when totalPrice is missing', () => {
      const props = { ...validServiceProps, totalPrice: undefined };

      expect(() => ItemEntity.validate(props)).toThrow(
        new ItemDomainException('Item type service must have totalPrice'),
      );
    });

    it('should throw when amountUsed exceeds totalPrice', () => {
      const props = { ...validServiceProps, amountUsed: 150, totalPrice: 100 };

      expect(() => ItemEntity.validate(props)).toThrow(
        new ItemDomainException(
          'Amount used must be than or equal to total price',
        ),
      );
    });

    it('should not throw for valid service', () => {
      expect(() => ItemEntity.validate(validServiceProps)).not.toThrow();
    });
  });

  describe('PRODUCT type validations', () => {
    it('should throw when quantityTotal is null or zero', () => {
      const propsNull = { ...validProductProps, quantityTotal: null };
      const propsZero = { ...validProductProps, quantityTotal: 0 };

      expect(() => ItemEntity.validate(propsNull)).toThrow(
        new ItemDomainException('Product must have quantityTotal > 0'),
      );
      expect(() => ItemEntity.validate(propsZero)).toThrow(
        new ItemDomainException('Product must have quantityTotal > 0'),
      );
    });

    it('should throw when quantityUsed is null or negative', () => {
      const propsNull = { ...validProductProps, quantityUsed: null };
      const propsNegative = { ...validProductProps, quantityUsed: -1 };

      expect(() => ItemEntity.validate(propsNull)).toThrow(
        new ItemDomainException('Product must have quantityUsed >= 0'),
      );
      expect(() => ItemEntity.validate(propsNegative)).toThrow(
        new ItemDomainException('Product must have quantityUsed >= 0'),
      );
    });

    it('should throw when quantityUsed exceeds quantityTotal', () => {
      const props = {
        ...validProductProps,
        quantityUsed: 10,
        quantityTotal: 5,
      };

      expect(() => ItemEntity.validate(props)).toThrow(
        new ItemDomainException(
          'Quantity used must be than or equal to quantity total',
        ),
      );
    });

    it('should not throw for valid product', () => {
      expect(() => ItemEntity.validate(validProductProps)).not.toThrow();
    });
  });
});
