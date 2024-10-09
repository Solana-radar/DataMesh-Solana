'use client'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { useEffect, useMemo, useState } from 'react'
import { EconomicDataEntry } from '../../web3/types'
import { Web3Service } from '../../web3/Web3Service'
import Success from '../components/Success'

const ShareAndEarn = () => {
  const [formData, setFormData] = useState<EconomicDataEntry>({
    invoiceData: '',
    hsnNumber: '',
    amount: '',
    quantity: 0,
    timestamp: '',
    signature: crypto.randomUUID().replace(/-/g, ''),
    isVerified: false,
  })

  const [rewards, setRewards] = useState<number>(0)
  const [extimatedRewards, setExtimatedRewards] = useState<number>(0)

  const [error, setError] = useState<string>()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const wallet = useAnchorWallet()
  const web3Service = useMemo(
    () => (wallet ? new Web3Service(wallet) : null),
    [wallet]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(undefined)
    setIsSubmitting(true)
    if (!web3Service) {
      setError('Please connect your wallet!')
      return
    }

    try {
      const signature = await web3Service.submitEconomicData(formData)
      setIsSubmitted(true)
      console.log('Signature ', signature)
    } catch (error: any) {
      console.log(error)
      setError('Transaction could not be successfully completed!')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    console.log('rewards...', rewards)
    // Simulate rewards earning
    const earned = formData.invoiceData.trim().length / 1000
    setExtimatedRewards(rewards + earned)
  }, [formData.invoiceData])

  // Fetch and set the invoice data when the component mounts
  const loadInvoices = async () => {
    const data = await web3Service?.fetchNodeAccount()
    if (data) {
      setRewards(Number(data.totalRewards))
    }
  }

  useEffect(() => {
    loadInvoices()
  }, [web3Service])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='container mx-auto p-8'>
      <section className='max-w-4xl mx-auto p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-semibold text-center text-gray-800 mb-6'>
          Share to Earn for End Customers
        </h1>

        {isSubmitted ? (
          <Success message='Your invoice was successfully submitted!' />
        ) : (
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='invoiceData'
                className='block text-sm font-medium text-gray-800'
              >
                Invoice Data (JSON)
              </label>
              <textarea
                name='invoiceData'
                id='invoiceData'
                value={formData.invoiceData}
                onChange={handleChange}
                required
                className='mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100'
                placeholder='{"item": "Product A", "price": 100, "quantity": 2}'
              />
            </div>

            <div>
              <label
                htmlFor='hsnNumber'
                className='block text-sm font-medium text-gray-800'
              >
                HSN Number
              </label>
              <input
                type='text'
                name='hsnNumber'
                id='hsnNumber'
                value={formData.hsnNumber}
                onChange={handleChange}
                required
                className='mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100'
                placeholder='1234'
              />
            </div>

            <div>
              <label
                htmlFor='amount'
                className='block text-sm font-medium text-gray-800'
              >
                Amount
              </label>
              <input
                type='number'
                name='amount'
                id='amount'
                value={formData.amount}
                onChange={handleChange}
                required
                className='mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100'
                placeholder='500'
              />
            </div>

            <div>
              <label
                htmlFor='quantity'
                className='block text-sm font-medium text-gray-800'
              >
                Quantity
              </label>
              <input
                type='number'
                name='quantity'
                id='quantity'
                value={formData.quantity}
                onChange={handleChange}
                required
                className='mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100'
                placeholder='2'
              />
            </div>

            <div>
              <label
                htmlFor='timestamp'
                className='block text-sm font-medium text-gray-800'
              >
                Purchase Timestamp
              </label>
              <input
                type='datetime-local'
                name='timestamp'
                id='timestamp'
                value={formData.timestamp}
                onChange={handleChange}
                required
                className='mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-100'
              />
            </div>

            <button
              type='submit'
              disabled={!wallet || isSubmitting}
              className={`w-full ${isSubmitting ? '' : 'bg-purple-800'} text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition`}
            >
              Submit and Earn Rewards
            </button>
            {error && (
              <div
                className='text-center p-4 mb-4 text-sm text-red-800 rounded-lg dark:text-red-400'
                role='alert'
              >
                {error}
              </div>
            )}
          </form>
        )}

        <div className='mt-8 text-center'>
          <h2 className='text-xl text-gray-400 font-semibold'>
            Extimated Rewards:{' '}
            <span className='text-blue-400'>{extimatedRewards}</span> sol
          </h2>
        </div>
      </section>
    </div>
  )
}

export default ShareAndEarn
