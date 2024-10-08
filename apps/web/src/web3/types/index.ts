export * from './den'
import { BN } from '@coral-xyz/anchor'

export type EconomicDataEntry = {
  invoiceData: string
  hsnNumber: string
  amount: string
  quantity: number
  timestamp: string
  signature: string
  isVerified: boolean
}

export type NodeAccount = {
  nodeId: string
  data: Array<EconomicDataEntry>
  activeSince: Date
  isActive: boolean
  totalRewards: BN
}

export type NodeEconomicData = EconomicDataEntry & {
  nodeId: string
}