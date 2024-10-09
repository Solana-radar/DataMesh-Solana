// components/WarningDialog.js
'use client'
import React from 'react'
const WarningDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}) => {
  if (!isOpen) return null // Do not render if not open

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div className='border border-white p-6 rounded-lg shadow-lg'>
        <h2 className='text-lg font-bold mb-4'>Warning</h2>
        <p>Are you sure you want to proceed?</p>
        <div className='flex justify-end mt-4'>
          <button
            className='bg-gray-300 text-black px-4 py-2 rounded mr-2'
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className='bg-red-500 text-white px-4 py-2 rounded'
            onClick={onConfirm}
          >
            OK
          </button>
        </div>
      </div>
      <div
        className='fixed inset-0 bg-black opacity-50'
        onClick={onClose}
      ></div>
    </div>
  )
}

export default WarningDialog
