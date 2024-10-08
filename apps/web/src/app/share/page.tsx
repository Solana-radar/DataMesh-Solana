"use client";
import { useState } from "react";
import styles from "./share.module.css";

const ShareAndEarn = () => {
  const [formData, setFormData] = useState({
    invoiceData: "",
    hsnNumber: "",
    amount: "",
    quantity: "",
    timestamp: "",
  });

  const [rewards, setRewards] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Simulate rewards earning
    const earned = Math.floor(Math.random() * 100); // random reward points
    setRewards(rewards + earned);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={`min-h-screen bg-black p-8   ${styles.shareDiv}`}>
      <section className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-white mb-6">
          Share to Earn <br /> for End Customers
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="invoiceData"
              className="block text-sm font-medium text-gray-300"
            >
              Invoice Data (JSON)
            </label>
            <textarea
              name="invoiceData"
              id="invoiceData"
              value={formData.invoiceData}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-900 text-white"
              placeholder='{"item": "Product A", "price": 100, "quantity": 2}'
            />
          </div>

          <div>
            <label
              htmlFor="hsnNumber"
              className="block text-sm font-medium text-gray-300"
            >
              HSN Number
            </label>
            <input
              type="text"
              name="hsnNumber"
              id="hsnNumber"
              value={formData.hsnNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-900 text-white"
              placeholder="1234"
            />
          </div>

          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300"
            >
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-900 text-white"
              placeholder="500"
            />
          </div>

          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-300"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-900 text-white"
              placeholder="2"
            />
          </div>

          <div>
            <label
              htmlFor="timestamp"
              className="block text-sm font-medium text-gray-300"
            >
              Purchase Timestamp
            </label>
            <input
              type="datetime-local"
              name="timestamp"
              id="timestamp"
              value={formData.timestamp}
              onChange={handleChange}
              required
              className="mt-1 block w-full p-2.5 rounded-md border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-gray-900 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Submit and Earn Rewards
          </button>
        </form>

        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-white">
            Total Rewards: <span className="text-blue-400">{rewards}</span>{" "}
            points
          </h2>
        </div>
      </section>
    </div>
  );
};

export default ShareAndEarn;
