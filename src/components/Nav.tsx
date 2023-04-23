import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

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
          fill="#E02727"
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
          fill="#E02727"
          d="M22,7.82a1.25,1.25,0,0,0,0-.19v0h0l-2-5A1,1,0,0,0,19,2H5a1,1,0,0,0-.93.63l-2,5h0v0a1.25,1.25,0,0,0,0,.19A.58.58,0,0,0,2,8H2V8a4,4,0,0,0,2,3.4V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V11.44A4,4,0,0,0,22,8V8h0A.58.58,0,0,0,22,7.82ZM13,20H11V16h2Zm5,0H15V15a1,1,0,0,0-1-1H10a1,1,0,0,0-1,1v5H6V12a4,4,0,0,0,3-1.38,4,4,0,0,0,6,0A4,4,0,0,0,18,12Zm0-10a2,2,0,0,1-2-2,1,1,0,0,0-2,0,2,2,0,0,1-4,0A1,1,0,0,0,8,8a2,2,0,0,1-4,.15L5.68,4H18.32L20,8.15A2,2,0,0,1,18,10Z"
        ></path>
      </svg>
    ),
  },
];

const Nav = () => {
  const { user, isSignedIn } = useUser();

  const [show, setShow] = useState(false);
  const [parent] = useAutoAnimate();

  const reveal = () => setShow(!show);

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
        <div className="flex grow items-center justify-around gap-2">
          {/* hidden until medium devices */}
          {links.map((link: Link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hidden md:inline-block"
            >
              {link.title}
            </Link>
          ))}
          {!isSignedIn && (
            <>
              <div className="rounded-xl bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-2 font-semibold text-slate-950">
                <SignInButton />
              </div>
            </>
          )}
          {!!isSignedIn && (
            <>
              <div className="rounded-xl bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-2 font-semibold text-slate-950">
                <SignOutButton />
              </div>
              <Image
                src={user?.profileImageUrl}
                alt={`@${user.firstName}'s profile picture`}
                height={64}
                width={64}
                className="h-16 w-16 rounded-full"
              />
            </>
          )}
        </div>
      </div>

      {/* menu */}

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
              fill="#FFFFFF"
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
    </div>
  );
};

export default Nav;
