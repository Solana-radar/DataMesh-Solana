'use client'
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react'
import { useMemo, useState } from 'react'
import { Web3Service } from '../../web3/Web3Service'
import { EconomicDataEntry } from '../../web3/types'
import { randomUUID } from 'crypto'

const ShareAndEarn = () => {
  const [formData, setFormData] = useState<EconomicDataEntry>({
    invoiceData: '',
    hsnNumber: '',
    amount: '',
    quantity: 0,
    timestamp: '',
    signature: crypto.randomUUID().replace(/-/g, ''),
  })

  const [rewards, setRewards] = useState<number>(0)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const wallet = useAnchorWallet()
  const web3Service = useMemo(
    () => (wallet ? new Web3Service(wallet) : null),
    [wallet]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true)
    e.preventDefault()
    if (!web3Service) {
      console.error('Service was not initialized')
      return
    }

    console.log(formData)
    const signature = await web3Service.submitEconomicData(formData)

    console.log('Signature ', signature)
    // Simulate rewards ear,ning
    const earned = Math.floor(Math.random() * 100) // random reward points
    setRewards(rewards + earned)
    setIsSubmitting(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className='min-h-screen bg-black p-8'>
      <div className='max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg'>
        <h1 className='text-3xl font-semibold text-center text-white mb-6'>
          Share to Earn for End Customers
        </h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='invoiceData'
              className='block text-sm font-medium text-gray-300'
            >
              Invoice Data (JSON)
            </label>
            <textarea
              name='invoiceData'
              id='invoiceData'
              value={formData.invoiceData}
              onChange={handleChange}
              required
              className='mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-900 text-white'
              placeholder='{"item": "Product A", "price": 100, "quantity": 2}'
            />
          </div>

          <div>
            <label
              htmlFor='hsnNumber'
              className='block text-sm font-medium text-gray-300'
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
              className='mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-900 text-white'
              placeholder='1234'
            />
          </div>

          <div>
            <label
              htmlFor='amount'
              className='block text-sm font-medium text-gray-300'
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
              className='mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-900 text-white'
              placeholder='500'
            />
          </div>

          <div>
            <label
              htmlFor='quantity'
              className='block text-sm font-medium text-gray-300'
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
              className='mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-900 text-white'
              placeholder='2'
            />
          </div>

          <div>
            <label
              htmlFor='timestamp'
              className='block text-sm font-medium text-gray-300'
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
              className='mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-900 text-white'
            />
          </div>

          <button
            type='submit'
            disabled={!wallet || isSubmitting}
            className={`w-full ${isSubmitting ? '' : 'bg-blue-600'} text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition`}
          >
            Submit and Earn Rewards
          </button>
        </form>

        <div className='mt-8 text-center'>
          <h2 className='text-xl font-semibold text-white'>
            Total Rewards: <span className='text-blue-400'>{rewards}</span>{' '}
            points
          </h2>
        </div>
      </div>
    </div>
  )
}

export default ShareAndEarn
