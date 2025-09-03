export interface ContractQueryOptions {
  contractId?: string;
  contractUuid?: string;
  secretariaContratante?: string;
  empresaContratada?: string;
  cidadeContratanteId?: number;
  dataAssinaturaInicio?: Date;
  dataAssinaturaFim?: Date;
  dataVencimentoInicio?: Date;
  dataVencimentoFim?: Date;
  valorTotalMinimo?: number;
  valorTotalMaximo?: number;
  selectFields?: (keyof ContractModel)[];
}

interface ContractModel {
  uuid: string;
  id: string;
  nome: string;
  descricao: string;
  valorTotal: number;
  valorGlosado: number;
  dataAssinatura: Date;
  dataVencimento: Date;
  secretariaContratante: string;
  empresaContratada: string;
  cidadeContratante: any;
  cidadeContratanteId: number;
  createdAt: Date;
  updatedAt: Date;
}
