'use client'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { useEffect, useMemo, useState } from 'react'
import { ADMIN_ADDRESSES } from '../../utils/constants'
import { Web3Service } from '../../web3/Web3Service'
import {
  NodeEconomicData
} from '../../web3/types'
import Footer from '../components/Footer'
import { NavbarDemo } from '../components/navbar'

const Invoices = () => {
  const [invoices, setInvoices] = useState<NodeEconomicData[]>([
    {
      nodeId: '',
      amount: '200',
      hsnNumber: 'hsn-number #1',
      invoiceData: "{ name: 'Yello yam', price: 3542 }",
      is_verified: false,
      quantity: 0,
      signature: 'signature-signature',
      timestamp: Date.now().toString(),
    },
  ])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const wallet = useAnchorWallet()
  const web3Service = useMemo(
    () => (wallet ? new Web3Service(wallet) : null),
    [wallet]
  )

  const validateInvoiceData = async (
    nodePublicKey: string,
    hsnNumber: string
  ) => {
    setIsSubmitting(true)
    if (!web3Service) {
      alert('Please connect your wallet!')
      return
    }

    try {
      const signature = await web3Service.validateInvoiceData(
        nodePublicKey,
        hsnNumber
      )

      console.log('Signature ', signature)

      loadInvoices()
    } catch (error: any) {
      console.error(error)
      alert(error.toString())
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fetch and set the invoice data when the component mounts
  const loadInvoices = async () => {
    const data = await web3Service?.fetchAllNodeAccounts()
    if (data) {
      const allInvoices = data.reduce<NodeEconomicData[]>(
        (invoices, { data, nodeId }) => [
          ...invoices,
          ...data.map((data) => ({ nodeId, ...data })),
        ],
        []
      )
      setInvoices(allInvoices)
    }
  }

  useEffect(() => {
    loadInvoices()
  }, [])

  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <NavbarDemo />
      </header>
      <main className='flex-grow'>
        <div className='container mx-auto p-4'>
          <h1 className='text-3xl font-bold mb-4'>Stored Invoices</h1>
          {invoices.length > 0 ? (
            <div className='overflow-x-auto'>
              <table className='min-w-full table-auto border-collapse border border-gray-300'>
                <thead>
                  <tr>
                    <th className='border border-gray-300 p-2'>HSN Number</th>
                    <th className='border border-gray-300 p-2'>Invoice Data</th>
                    <th className='border border-gray-300 p-2'>Amount</th>
                    <th className='border border-gray-300 p-2'>Quantity</th>
                    <th className='border border-gray-300 p-2'>Timestamp</th>
                    <th className='border border-gray-300 p-2'>Signature</th>
                    <th className='border border-gray-300 p-2'>Is Verified</th>
                    {wallet &&
                      ADMIN_ADDRESSES.includes(wallet.publicKey.toBase58()) && (
                        <th className='border border-gray-300 p-2'>...</th>
                      )}
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice, index) => (
                    <tr key={index}>
                      <td className='border border-gray-300 p-2'>
                        {invoice.hsnNumber}
                      </td>
                      <td className='border border-gray-300 p-2'>
                        {invoice.invoiceData}
                      </td>
                      <td className='border border-gray-300 p-2'>
                        {invoice.amount}
                      </td>
                      <td className='border border-gray-300 p-2'>
                        {invoice.quantity}
                      </td>
                      <td className='border border-gray-300 p-2'>
                        {new Date(
                          Number(invoice.timestamp) * 1000
                        ).toLocaleString()}
                      </td>
                      <td className='border border-gray-300 p-2'>
                        {invoice.signature}
                      </td>
                      <td className='border border-gray-300 p-2'>
                        {invoice.is_verified}
                      </td>
                      {wallet &&
                        ADMIN_ADDRESSES.includes(wallet.publicKey.toBase58()) &&
                        !invoice.is_verified && (
                          <td className='border border-gray-300 p-2'>
                            <button
                              disabled={!wallet || isSubmitting}
                              className={`${isSubmitting ? '' : 'bg-blue-600'} text-white py-1 px-2 rounded`}
                              onClick={() =>
                                validateInvoiceData(
                                  invoice.nodeId,
                                  invoice.hsnNumber
                                )
                              }
                            >
                              Approve
                            </button>
                          </td>
                        )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No invoices found for this node account.</p>
          )}
        </div>
      </main>
      <footer className='mt-auto'>
        <Footer />
      </footer>
    </div>
  )
}

export default Invoices
