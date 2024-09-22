import React from 'react';

const Main: React.FC = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="max-w-5xl pt-52 pb-24 mx-auto">
        <h1 className="text-6xl text-center font-bold text-white mb-6">
          Now earn for your Invoice bills on solana
        </h1>
        <h2 className="text-2xl font-semibold pb-11 text-gray-700 text-center">
          For the People and the world.
          <br />
        </h2>
      </div>

      <div className="container flex flex-col items-center justify-center mx-auto">
        <img
          className="object-cover object-center w-3/4 mb-2 border shadow-md"
          alt="Placeholder Image"
          src="/images/Designer.png"
        />
      </div>

      <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-7xl md:text-6xl">
        Share and Earn.
      </h2>
      <br />
      <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed lg:w-2/3">
        Features of EcoBash.
      </p>

      <div className="pt-12 pb-24 max-w-4xl mx-auto md:px-1 px-3">
        {Array(1).fill(0).map((_, i) => (
          <div key={i} className="mb-8">
            <h3 className="pt-3 font-semibold text-lg text-white">
              Share to Earn for End Customers
            </h3>
            <p className="pt-2 text-md text-gray-200">
               End customers can upload their purchase invoices directly to the platform. For each contribution, they earn rewards, turning their data into a valuable asset.
            </p>
            <h3 className="pt-3 font-semibold text-lg text-white">
              Hyper-local Deals Discovery
            </h3>
            <p className="pt-2 text-md text-gray-200">
            The platform serves as a hyper-local deals discovery tool, enabling customers to find the best local deals and save money on their purchases.
            </p>
            <h3 className="pt-3 font-semibold text-lg text-white">
              Challenge of Accessing Real-Time Data
            </h3>
            <p className="pt-2 text-md text-gray-200">
              AI models currently struggle with accessing real-time economic data, which diminishes their effectiveness in generating timely and accurate insights for economic forecasting and financial analysis.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Main;
