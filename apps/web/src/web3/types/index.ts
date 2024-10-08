export * from './den'
import { BN } from '@coral-xyz/anchor'

export type EconomicDataEntry = {
  invoiceData: string
  hsnNumber: string
  amount: string
  quantity: number
  timestamp: string
  signature: string
  is_verified: boolean
}

export type NodeAccount = {
  nodeId: string
  data: Array<EconomicDataEntry>
  activeSince: BN
  isActive: boolean
  totalRewards: BN
}

export type NodeEconomicData = EconomicDataEntry & {
  nodeId: string
}