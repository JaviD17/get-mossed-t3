import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export type Link = {
  title: string;
  href: string;
};

export const links: Link[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Shop",
    href: "/shop",
  },
];

const Nav = () => {
  const { isSignedIn } = useUser();
  return (
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
        {links.map((link: Link) => (
          <Link key={link.title} href={link.href} className="">
            {link.title}
          </Link>
        ))}
        {!isSignedIn && (
          <div className="rounded-xl bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-2 font-semibold text-slate-950">
            <SignInButton />
          </div>
        )}
        {!!isSignedIn && (
          <div className="rounded-xl bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 p-2 font-semibold text-slate-950">
            <SignOutButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
