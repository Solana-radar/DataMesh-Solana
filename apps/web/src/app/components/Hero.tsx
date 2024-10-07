"use client";
import React from "react";
import Image from "next/image";
import { InvoiceImg, shareImg } from "../images";
import styles from "./Hero.module.css";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from '@heroicons/react/24/solid';

const Main: React.FC = () => {
  const generateBlinks = () => {
    console.log("Blinks generated!");
    const actionUrl = "http://https://data-mesh-solana-web.vercel.app/api/action"; // Local API endpoint
    const encodedActionUrl = encodeURIComponent(`solana-action:${actionUrl}`);
    const blinkUrl = `http://https://data-mesh-solana-web.vercel.app/api/action=${encodedActionUrl}`;
  
    console.log("Share this Blink link:", blinkUrl);
    
    // Copy the Blink URL to the clipboard
    navigator.clipboard.writeText(blinkUrl)
      .then(() => {
        // Show an alert when successfully copied
        alert("Blink link copied to clipboard!");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy the Blink link.");
      });

    return blinkUrl;
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="flex justify-center mt-4">
        {/* Add the new button */}
        <button 
          onClick={generateBlinks} 
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center" // Added flex and items-center
        >
          Share to
          <XMarkIcon className="h-5 w-5 mr-2" />
        </button>
      </div>
      <div className={`container pt-12 mx-auto  flex  ${styles.HeroDiv}  `}>
        <div className={`${styles.HeroDiv_text}`}>
          <h1 className="text-6xl font-bold text-white mb-6">
            Now earn for your Invoice bills on solana
          </h1>
          <p>
            Welcome to DataMesh - Your Key to Earning and Saving with EcoBash
            <br />
          </p>
        </div>

        <div className={styles.InvoiceImg}>
          <Image src={InvoiceImg} alt="InvoiceImg" width={500} height={500} />
        </div>
      </div>

      <div
        className={`container flex flex-col items-center justify-center mx-auto ${styles.hero_Share} `}
      >
        <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-7xl md:text-6xl">
          Share and Earn.
        </h2>
        <p>
          By uploading your purchase invoices to the EcoBash platform, you
          convert your data into real value. Each contribution earns you
          rewards, allowing you to profit from the data you generate. Your
          purchase history becomes a powerful tool not just for you, but for the
          broader economy.
        </p>
        <div className="container flex flex-col items-center justify-center mx-auto">
          <Image
            className="object-cover object-center w-3/4 mb-2 border shadow-md"
            alt="Placeholder Image"
            src={shareImg}
            width={800}
            height={800}
          />
        </div>
        <br />
        <h1 className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed lg:w-2/3">
          Features of EcoBash.
        </h1>
        <div className="h-screen w-full pt-10 px-4">
          <div className="mx-auto w-full max-w-5xl divide-y divide-white/5 rounded-xl bg-white/5">
            <Disclosure as="div" className="p-6" defaultOpen={true}>
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                  Share to Earn for End Customers
                </span>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                End customers can upload their purchase invoices directly to the
                platform. For each contribution, they earn rewards, turning
                their data into a valuable asset.{" "}
              </DisclosurePanel>
            </Disclosure>
            <Disclosure as="div" className="p-6">
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                  Hyper-local Deals Discovery
                </span>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                The platform serves as a hyper-local deals discovery tool,
                enabling customers to find the best local deals and save money
                on their purchases.{" "}
              </DisclosurePanel>
            </Disclosure>{" "}
            <Disclosure as="div" className="p-6">
              <DisclosureButton className="group flex w-full items-center justify-between">
                <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                  Challenge of Accessing Real-Time Data
                </span>
                <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
              </DisclosureButton>
              <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
                AI models currently struggle with accessing real-time economic
                data, which diminishes their effectiveness in generating timely
                and accurate insights for economic forecasting and financial
                analysis.
              </DisclosurePanel>
            </Disclosure>
          </div>
        </div>
        {/* <div className="pt-12 pb-24 max-w-4xl mx-auto md:px-1 px-3" id="features">
        {Array(1)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="mb-8">
              <h3 className="pt-3 font-semibold text-lg text-white"></h3>
              <p className="pt-2 text-md text-gray-200"></p>
              <h3 className="pt-3 font-semibold text-lg text-white"></h3>
              <p className="pt-2 text-md text-gray-200"></p>
              <h3 className="pt-3 font-semibold text-lg text-white"></h3>
              <p className="pt-2 text-md text-gray-200"></p>
            </div>
          ))}
      </div> */}
      </div>

      
    </section>
  );
};

export default Main;
