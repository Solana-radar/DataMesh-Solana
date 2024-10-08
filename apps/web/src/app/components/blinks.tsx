import React from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import styles from "./blinks.module.css";
import { ShareIcon } from "@heroicons/react/20/solid";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";

export default function Blinks() {
  const generateBlinks = () => {
    console.log("Blinks generated!");
    const actionUrl = "https://data-mesh-solana-web.vercel.app/api/action"; // Local API endpoint
    const encodedActionUrl = encodeURIComponent(`solana-action:${actionUrl}`);
    const blinkUrl = `https://data-mesh-solana-web.vercel.app/api/action?data=${encodedActionUrl}`;

    console.log("Share this Blink link:", blinkUrl);

    // Copy the Blink URL to the clipboard
    navigator.clipboard
      .writeText(blinkUrl)
      .then(() => {
        // Show an alert when successfully copied
        // alert("Blink link copied to clipboard!");
        toast.success("Blink link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        // alert("Failed to copy the Blink link.");
        toast.error("Failed to copy the Blink link.");
      });

    return blinkUrl;
  };
  return (
    <div className={styles.blinks}>
      <div className="flex  w-full justify-center ">
        <div className="flex gap-8">
          <Popover>
            <PopoverButton className="block text-sm/6 font-semibold focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black">
              <ShareIcon />
            </PopoverButton>
            <PopoverPanel
              transition
              anchor="bottom"
              className="divide-y divide-black/5 rounded-xl bg-black/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <div
                className={`p-3 ${styles.share_btn} `}
                onClick={generateBlinks}
              >
                Share to
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#212121"
                    fill-rule="evenodd"
                    d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    fill="#fff"
                    d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"
                  ></path>
                  <polygon
                    fill="#fff"
                    points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"
                  ></polygon>
                  <polygon
                    fill="#fff"
                    points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"
                  ></polygon>
                </svg>{" "}
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </div>
      <div className="flex justify-center mt-4">{/* Add the new button */}</div>{" "}
      <ToastContainer />
    </div>
  );
}
