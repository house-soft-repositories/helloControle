import ContractDomainException from '@/modules/contract/exceptions/contract_domain_exception';
import ContractEntity from './contract.entity';

describe('ContractEntity', () => {
  const validContractData = {
    id: 'CT001',
    nome: 'Contrato de Teste',
    descricao: 'Descrição do contrato de teste',
    valorTotal: 100000,
    valorGlosado: 5000,
    dataAssinatura: new Date('2024-01-01'),
    dataVencimento: new Date('2024-12-31'),
    orgaoContratante: 'Secretaria de Saúde',
    empresaContratada: 'Empresa ABC Ltda',
    cidadeContratante: 'São Paulo',
  };

  describe('create', () => {
    it('should create a valid contract entity', () => {
      const contract = ContractEntity.create(validContractData);

      expect(contract.id).toBe(validContractData.id);
      expect(contract.nome).toBe(validContractData.nome);
      expect(contract.descricao).toBe(validContractData.descricao);
      expect(contract.valorTotal).toBe(validContractData.valorTotal);
      expect(contract.valorGlosado).toBe(validContractData.valorGlosado);
      expect(contract.dataAssinatura).toBe(validContractData.dataAssinatura);
      expect(contract.dataVencimento).toBe(validContractData.dataVencimento);
      expect(contract.orgaoContratante).toBe(
        validContractData.orgaoContratante,
      );
      expect(contract.empresaContratada).toBe(
        validContractData.empresaContratada,
      );
      expect(contract.cidadeContratante).toBe(
        validContractData.cidadeContratante,
      );
    });

    it('should throw error when id is missing', () => {
      const invalidData = { ...validContractData, id: '' };

      expect(() => ContractEntity.create(invalidData)).toThrow(
        ContractDomainException,
      );
    });

    it('should throw error when valorTotal is negative', () => {
      const invalidData = { ...validContractData, valorTotal: -1000 };

      expect(() => ContractEntity.create(invalidData)).toThrow(
        ContractDomainException,
      );
    });

    it('should throw error when valorGlosado is negative', () => {
      const invalidData = { ...validContractData, valorGlosado: -500 };

      expect(() => ContractEntity.create(invalidData)).toThrow(
        ContractDomainException,
      );
    });

    it('should throw error when dataAssinatura is after dataVencimento', () => {
      const invalidData = {
        ...validContractData,
        dataAssinatura: new Date('2024-12-31'),
        dataVencimento: new Date('2024-01-01'),
      };

      expect(() => ContractEntity.create(invalidData)).toThrow(
        ContractDomainException,
      );
    });

    it('should throw error when orgaoContratante is missing', () => {
      const invalidData = { ...validContractData, orgaoContratante: '' };

      expect(() => ContractEntity.create(invalidData)).toThrow(
        ContractDomainException,
      );
    });

    it('should throw error when empresaContratada is missing', () => {
      const invalidData = { ...validContractData, empresaContratada: '' };

      expect(() => ContractEntity.create(invalidData)).toThrow(
        ContractDomainException,
      );
    });
  });

  describe('toObject', () => {
    it('should return object representation of contract', () => {
      const contract = ContractEntity.create(validContractData);
      const contractObject = contract.toObject();

      expect(contractObject).toEqual(
        expect.objectContaining({
          id: validContractData.id,
          nome: validContractData.nome,
          descricao: validContractData.descricao,
          valorTotal: validContractData.valorTotal,
          valorGlosado: validContractData.valorGlosado,
          dataAssinatura: validContractData.dataAssinatura,
          dataVencimento: validContractData.dataVencimento,
          orgaoContratante: validContractData.orgaoContratante,
          empresaContratada: validContractData.empresaContratada,
          cidadeContratante: validContractData.cidadeContratante,
        }),
      );
    });
  });
});
