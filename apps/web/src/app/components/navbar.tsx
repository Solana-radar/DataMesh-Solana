"use client";
import Link from "next/link";
import ThemeChanger from "./DarkSwitch";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import WalletButtonWrapper from "./wallet/WalletButtonWrapper";
import { useEffect } from "react";
import styles from "./navbar.module.css";
import Blinks from "./blinks";

export default function Navbar() {
  const navigation = ["Share and Earn"];

  // Effect to manage overflow behavior when wallet modal is open
  useEffect(() => {
    const handleBodyOverflow = () => {
      const modalOpen = document.querySelector(".wallet-adapter-modal-wrapper");
      if (modalOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    const observer = new MutationObserver(handleBodyOverflow);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full bg-black">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-1">
        {/* Logo */}
        <Link href="/">
          <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
            <span>
              <Image
                src="/images/designer1.png"
                width="32"
                height="32"
                alt="N"
                className="w-8"
              />
            </span>
            <span className={styles.DataMesh}>DataMesh</span>
          </span>
        </Link>
        {/* Get started and wallet button */}
        <div
          className={`gap-3 nav__item  lg:flex ml-auto lg:ml-0 lg:order-2  ${styles.nav_Button}  `}
        >
          {/* <ThemeChanger /> */}
          <WalletButtonWrapper />
          <div className={styles.Blinks}>
            <Blinks />
          </div>
        </div>{" "}
        <div
          className={`flex flex-wrap items-center justify-center p-8 lg:justify-end  ${styles.navLink} `}
        >
          {/* Desktop menu */}
          <div className="hidden text-center lg:flex lg:items-end">
            <ul className="items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
              <li className="mr-3 nav__item">
                <Link
                  href="/"
                  className="inline-block px-4 py-2 text-2xl font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  Home{" "}
                </Link>{" "}
                <Link
                  href="#features"
                  className="inline-block px-4 py-2 text-2xl font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  Features{" "}
                </Link>{" "}
                <Link
                  href="/share"
                  className="inline-block px-4 py-2 text-2xl font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                >
                  Share and Earn{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Mobile menu button */}
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                aria-label="Toggle Menu"
                className="px-2 py-1 mx-1 text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  {open ? (
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                    />
                  ) : (
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    />
                  )}
                </svg>
              </Disclosure.Button>

              <Disclosure.Panel className="flex flex-wrap flex-col w-full my-5 lg:hidden">
                <>
                  <Link
                    href="/"
                    className="inline-block px-4 py-2 text-2xl font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                  >
                    Home{" "}
                  </Link>{" "}
                  <Link
                    href="#features"
                    className="inline-block px-4 py-2 text-2xl font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                  >
                    Features{" "}
                  </Link>{" "}
                  <Link
                    href="/share"
                    className="inline-block px-4 py-2 text-2xl font-normal text-gray-800 no-underline rounded-md dark:text-gray-200 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:focus:bg-gray-800"
                  >
                    Share and Earn{" "}
                  </Link>
                  <Link
                    href="/"
                    className="w-full px-6 py-2 mt-3 text-center text-white bg-indigo-600 rounded-md lg:ml-5"
                  >
                    <div className={styles.shareToX}>
                      <Blinks /> <p>Share to Twitter</p>
                    </div>
                  </Link>
                </>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </nav>
    </div>
  );
}
