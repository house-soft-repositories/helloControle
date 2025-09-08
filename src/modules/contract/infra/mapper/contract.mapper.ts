import ContractEntity from '@/modules/contract/domain/entities/contract.entity';
import ItemMapper from '@/modules/contract/infra/mapper/item.mapper';
import ContractModel from '@/modules/contract/infra/models/contract.model';
import ItemModel from '@/modules/contract/infra/models/item.model';

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
      items: contractModel.items.map(itemModel =>
        ItemMapper.toEntity(itemModel),
      ),
      fileUrl: contractModel.fileUrl || null,
      createdAt: contractModel.createdAt,
      updatedAt: contractModel.updatedAt,
    });
  }

  static toModel(contractEntity: ContractEntity): Partial<ContractModel> {
    return {
      uuid: contractEntity.uuid,
      id: contractEntity.id,
      nome: contractEntity.nome || null,
      descricao: contractEntity.descricao || null,
      valorTotal: contractEntity.valorTotal,
      valorGlosado: contractEntity.valorGlosado,
      dataAssinatura: contractEntity.dataAssinatura,
      dataVencimento: contractEntity.dataVencimento,
      orgaoContratante: contractEntity.orgaoContratante,
      empresaContratada: contractEntity.empresaContratada,
      fileUrl: contractEntity.fileUrl,
      // Note: cidadeContratante relationship is handled separately
      cidadeContratanteId: null, // This should be set when relating to a city
      items: (contractEntity.items ?? []).map(item => {
        return ItemMapper.toModel(item) as ItemModel;
      }),
      createdAt: contractEntity.createdAt,
      updatedAt: contractEntity.updatedAt,
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
