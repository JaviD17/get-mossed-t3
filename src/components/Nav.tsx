import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Cart from "./Cart";
import { AnimatePresence } from "framer-motion";

export type Link = {
  title: string;
  href: string;
  element: JSX.Element;
};

export const links: Link[] = [
  {
    title: "Home",
    href: "/",
    element: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        id="estate"
        width={20}
        height={20}
      >
        <path
          fill="#F8FAFC"
          d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm5-1a1,1,0,0,1-1,1H16V15a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v5H6a1,1,0,0,1-1-1V10.25a1,1,0,0,1,.34-.75l6-5.25a1,1,0,0,1,1.32,0l6,5.25a1,1,0,0,1,.34.75Z"
        ></path>
      </svg>
    ),
  },
  {
    title: "Shop",
    href: "/shop",
    element: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        id="store"
        width={20}
        height={20}
      >
        <path
          fill="#F8FAFC"
          d="M22,7.82a1.25,1.25,0,0,0,0-.19v0h0l-2-5A1,1,0,0,0,19,2H5a1,1,0,0,0-.93.63l-2,5h0v0a1.25,1.25,0,0,0,0,.19A.58.58,0,0,0,2,8H2V8a4,4,0,0,0,2,3.4V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V11.44A4,4,0,0,0,22,8V8h0A.58.58,0,0,0,22,7.82ZM13,20H11V16h2Zm5,0H15V15a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v5H6V12a4,4,0,0,0,3-1.38,4,4,0,0,0,6,0A4,4,0,0,0,18,12Zm0-10a2,2,0,0,1-2-2,1,1,0,0,0-2,0,2,2,0,0,1-4,0A1,1,0,0,0,8,8a2,2,0,0,1-4,.15L5.68,4H18.32L20,8.15A2,2,0,0,1,18,10Z"
        ></path>
      </svg>
    ),
  },
];

const Nav = () => {
  const { user, isSignedIn } = useUser();

  const [show, setShow] = useState<boolean>(false);
  const [parent] = useAutoAnimate<HTMLDivElement>();

  const reveal = () => setShow(!show);

  const [showCart, setShowCart] = useState<boolean>(false);

  const revealCart = () => setShowCart(!showCart);

  // if(!user) return null
  return (
    <div className="">
      <div className="flex h-min w-full justify-between bg-slate-900">
        <Link href={"/"} className="">
          <Image
            src={"/get-mossed-1.png"}
            alt="Get Mossed Logo"
            width={200}
            height={200}
          />
        </Link>

        {/* home and shop links for desktop */}
        <div className="hidden grow items-center justify-evenly md:flex">
          {/* hidden until medium devices */}
          {links.map((link: Link) => (
            <Link key={link.title} href={link.href} className="">
              {link.title}
            </Link>
          ))}
        </div>

        {/* sign in/out buttons and profile image, hidden until medium devices*/}
        <>
          {!isSignedIn && (
            <div className="mr-10 hidden items-center gap-6 md:flex">
              <div className="rounded-xl bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-2 font-semibold text-slate-950">
                <SignInButton />
              </div>
            </div>
          )}
          {!!isSignedIn && (
            <div className="hidden basis-1/4 items-center justify-evenly md:flex">
              <div className="rounded-xl bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-2 font-semibold text-slate-950">
                <SignOutButton />
              </div>
              <Image
                src={user?.profileImageUrl}
                alt={`@${user.firstName ?? "someone"}'s profile picture`}
                height={56}
                width={56}
                className="h-14 w-14 rounded-full"
              />
              <svg
                id="shopping-cart"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height={40}
                width={40}
                onClick={revealCart}
                className="cursor-pointer"
              >
                <path
                  fill="#F8FAFC"
                  d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z"
                ></path>
              </svg>
            </div>
          )}
        </>

        {/* mobile sign in/out buttons */}
        <>
          {!isSignedIn && (
            <div className="flex items-center justify-center gap-4 px-4 md:hidden">
              <div className="rounded-xl bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-2 font-semibold text-slate-950">
                <SignInButton />
              </div>
            </div>
          )}
          {!!isSignedIn && (
            <div className="flex basis-4/6 items-center justify-evenly md:hidden">
              <div className="rounded-xl bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-2 font-semibold text-slate-950">
                <SignOutButton />
              </div>
              <Image
                src={user?.profileImageUrl || user?.imageUrl}
                alt={`@${user.firstName ?? "someone"}'s profile picture`}
                height={56}
                width={56}
                className="h-14 w-14 rounded-full"
              />
              {/* {(user?.profileImageUrl || user?.imageUrl) && (
                <Image
                  src={user?.profileImageUrl ?? user?.imageUrl}
                  alt={`@${user.firstName ?? "someone"}'s profile picture`}
                  height={56}
                  width={56}
                  className="h-14 w-14 rounded-full"
                />
              )} */}
              <svg
                id="shopping-cart"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                height={40}
                width={40}
                onClick={revealCart}
              >
                <path
                  fill="#F8FAFC"
                  d="M8.5,19A1.5,1.5,0,1,0,10,20.5,1.5,1.5,0,0,0,8.5,19ZM19,16H7a1,1,0,0,1,0-2h8.49121A3.0132,3.0132,0,0,0,18.376,11.82422L19.96143,6.2749A1.00009,1.00009,0,0,0,19,5H6.73907A3.00666,3.00666,0,0,0,3.92139,3H3A1,1,0,0,0,3,5h.92139a1.00459,1.00459,0,0,1,.96142.7251l.15552.54474.00024.00506L6.6792,12.01709A3.00006,3.00006,0,0,0,7,18H19a1,1,0,0,0,0-2ZM17.67432,7l-1.2212,4.27441A1.00458,1.00458,0,0,1,15.49121,12H8.75439l-.25494-.89221L7.32642,7ZM16.5,19A1.5,1.5,0,1,0,18,20.5,1.5,1.5,0,0,0,16.5,19Z"
                ></path>
              </svg>
            </div>
          )}
        </>
      </div>

      {/* mobile drawer menu */}
      <div
        ref={parent}
        className="flex flex-col items-center justify-center bg-slate-800 py-1 md:hidden"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            id="bars"
            width={40}
            height={40}
            onClick={reveal}
          >
            <path
              fill="#F8FAFC"
              d="M3,8H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,8Zm18,8H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0-5H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
            ></path>
          </svg>
        </div>

        {show && (
          <div className="flex flex-col items-center justify-center gap-2 py-2 text-xl font-thin tracking-widest">
            {links.map((link: Link) => (
              <Link href={link.href} key={link.href}>
                <div className="flex items-center justify-center gap-1">
                  <span>{link.element}</span>
                  <p className="">{link.title}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* positioned absolute for side drawer cart */}
      <AnimatePresence>
        {!!showCart && <Cart firstName={user?.firstName ?? "User"} />}
      </AnimatePresence>
    </div>
  );
};

export default Nav;
