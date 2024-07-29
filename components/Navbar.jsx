'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

import logo from '@/assets/images/logo.svg';
import profileDefault from '@/assets/images/profile.png';

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import MessageCount from "@/components/MessageCount";
import MessageIcon from "@/components/icons/MessageIcon";
import UserIcon from "@/components/icons/UserIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import HeartIcon from "@/components/icons/HeartIcon";
import ExitIcon from "@/components/icons/ExitIcon";
import GearIcon from "@/components/icons/GearIcon";

import { CSSTabs } from "@/components/CSSTabs";
import { useTabs } from "@/components/useTabs";

const Navbar = () => {

  const pathname = usePathname();

  const [hookProps] = useState({
    tabs: [
      {
        label: "Home",
        id: "Home",
        href: "/"
      },
      {
        label: "Cars",
        id: "Cars",
        href: "/cars"
      }
    ],
  });

  const cssTabs = useTabs(hookProps);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [providers, setProviders] = useState(null);



  const {data: session} = useSession();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })()
  }, []);

  const profileImage = session?.user?.image;

  return (
    <nav className="border-b border-dividerGray">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="inset-y-0 flex items-center md:hidden">
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 gap-11 items-center justify-center md:justify-start">
            <Link className="flex flex-shrink-0 items-center" href="/">
              <span className="block text-white text-xl font-black mr-1">
                Next<span className="text-orange">Cars</span>
              </span>
              <Image
                className="h-8 w-auto"
                src={logo}
                alt="NextCars"
              />
            </Link>
            <div className="hidden md:block">
              <CSSTabs {...cssTabs.tabProps} />
            </div>
          </div>

          {/* <!-- Login button --> */}
          {!session && (<div className="block">
            <div className="flex items-center">
              {providers && Object.values(providers).map((provider, index) => (
                <button
                  onClick={() => signIn(provider.id)}
                  key={index}
                  className="text-light bg-dark hover:bg-backgroundGray border border-borderGray transition-all rounded-md px-3 py-2"
                >
                  <span className="font-medium text-base" >Sign in</span> 
                </button>
              ))}
            </div>
          </div>)}

          {/* <!-- Right Side Menu (Logged In) --> */}
          {(session && <div
            className="inset-y-0 flex gap-4 items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0"
          >
            <Link
            href="/cars/add"
            className={`${pathname === '/cars/add' ? 'md:hidden' : ''} font-semibold text-sm text-dark bg-orangeGradient rounded-md px-3 py-2 hidden md:block`}
            >Sell Car</Link>
            <Link href="/messages" className="relative rounded-md bg-dark p-1 hover:bg-backgroundGray transition-all">
                <span className="sr-only">View notifications</span>
                <MessageIcon className="stroke-silverGray w-7 h-7" />
              <MessageCount session={session} />
            </Link>
            <div className="relative">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-grayish focus:ring-offset-2 focus:ring-offset-dark select-none"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                >
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={ profileImage || profileDefault}
                    alt=""
                    width={40}
                    height={40}
                  />
                </button>
              </div>

              {/* <!-- Profile dropdown --> */}
              {isProfileMenuOpen && (<div
                className="absolute right-0 z-10 mt-4 w-44 origin-top-right overflow-hidden rounded-md bg-dark ring-1 ring-black ring-opacity-5 focus:outline-none select-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <Link
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                  }}
                  href="/profile"
                  className="flex items-center justify-between gap-2 px-6 py-3 font-medium text-base text-silverGray group hover:text-orange hover:bg-darkGray transition-colors"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                  ><span>Profile</span><UserIcon className="w-6 h-6 stroke-silverGray group-hover:stroke-orange transition-colors" /></Link>
                <Link
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                  }}
                  href="/cars/add"
                  className="flex items-center justify-between gap-2 px-6 py-3 font-medium text-base text-silverGray group hover:text-orange hover:bg-darkGray transition-colors"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                  ><span>Add Post</span><PlusIcon className="w-6 h-6 fill-silverGray group-hover:fill-orange transition-colors" /></Link>
                {session.user.admin && (<Link
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                  }}
                  href="/cars/admin"
                  className="flex items-center justify-between gap-2 px-6 py-3 font-medium text-base text-silverGray group hover:text-orange hover:bg-darkGray transition-colors"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                  ><span>Dashboard</span><GearIcon className="w-6 h-6 fill-silverGray group-hover:fill-orange transition-colors" /></Link>)}
                <Link
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                  }}
                  href="/cars/favorites"
                  className="flex items-center justify-between gap-2 px-6 py-3 font-medium text-base text-silverGray group hover:text-orange hover:bg-darkGray transition-colors"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                  ><span>Favorites</span><HeartIcon className="w-6 h-6 stroke-silverGray group-hover:stroke-orange transition-colors" /></Link>
                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    signOut({callbackUrl: '/'});
                  }}
                  className="flex w-full items-center justify-between gap-2 px-6 py-3 font-medium text-base text-silverGray group hover:text-orange hover:bg-darkGray transition-colors"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                  ><span>Sign out</span><ExitIcon className="w-6 h-6 stroke-silverGray group-hover:stroke-orange transition-colors" /></button>
              </div>)}
            </div>
          </div>)}
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}

      {isMobileMenuOpen && (<div>
        <div className="space-y-1 px-2 pb-3 pt-2">
          <Link
            href="/"
            className={`${pathname === '/' ? 'bg-black' : ''} text-white block rounded-md px-3 py-2 text-base font-medium`}
            >Home</Link>
          <Link
            href="/cars"
            className={`${pathname === '/cars' ? 'bg-black' : ''} text-white block rounded-md px-3 py-2 text-base font-medium`}
            >Cars</Link>
        </div>
      </div>)}
    </nav>
  )
}

export default Navbar