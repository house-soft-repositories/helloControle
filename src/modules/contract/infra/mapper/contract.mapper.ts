import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import ContractModel from '@/modules/contract/infra/models/contract.model';

export default abstract class ContractMapper {
  static toEntity(contractModel: ContractModel): ContractEntity {
    return ContractEntity.fromData({
      uuid: contractModel.uuid,
      id: contractModel.id,
      nome: contractModel.nome || undefined,
      descricao: contractModel.descricao || undefined,
      valorTotal: contractModel.valorTotal,
      valorGlosado: contractModel.valorGlosado,
      dataAssinatura: contractModel.dataAssinatura,
      dataVencimento: contractModel.dataVencimento,
      orgaoContratante: contractModel.orgaoContratante,
      empresaContratada: contractModel.empresaContratada,
      cidadeContratante: contractModel.cidadeContratante?.name,
      createdAt: contractModel.createdAt,
      updatedAt: contractModel.updatedAt,
    });
  }

  static toModel(contractEntity: ContractEntity): Partial<ContractModel> {
    const entityObject = contractEntity.toObject();
    return {
      uuid: entityObject.uuid,
      id: entityObject.id,
      nome: entityObject.nome || null,
      descricao: entityObject.descricao || null,
      valorTotal: entityObject.valorTotal,
      valorGlosado: entityObject.valorGlosado,
      dataAssinatura: entityObject.dataAssinatura,
      dataVencimento: entityObject.dataVencimento,
      orgaoContratante: entityObject.orgaoContratante,
      empresaContratada: entityObject.empresaContratada,
      // Note: cidadeContratante relationship is handled separately
      cidadeContratanteId: null, // This should be set when relating to a city
      createdAt: entityObject.createdAt,
      updatedAt: entityObject.updatedAt,
    };
  }

  static toModelForUpdate(
    contractEntity: ContractEntity,
  ): Partial<ContractModel> {
    const entityObject = contractEntity.toObject();
    return {
      id: entityObject.id,
      nome: entityObject.nome || null,
      descricao: entityObject.descricao || null,
      valorTotal: entityObject.valorTotal,
      valorGlosado: entityObject.valorGlosado,
      dataAssinatura: entityObject.dataAssinatura,
      dataVencimento: entityObject.dataVencimento,
      orgaoContratante: entityObject.orgaoContratante,
      empresaContratada: entityObject.empresaContratada,
      // Exclude cidadeContratante relationship field for updates
      updatedAt: new Date(),
    };
  }
}
