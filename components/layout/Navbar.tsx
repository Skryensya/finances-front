"use client";
import Image from "next/image";
import SessionTimer from "../SessionTimer";

export default function Navbar() {
  //get the the last segment of the url
  const url = window.location.href;
  const lastSegment = url.split("/").pop();
  const PageName = lastSegment
    ? lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
    : "Home";

  return (
    <nav className="h-10 w-full bg-[gray] mb-2 flex z-10 justify-between">
      <h3 className=" flex items-center ">
        <Image
          src="/vercel.svg"
          alt="Next.js Logo"
          width={100}
          height={30}
          className="ml-4 mr-2"
        />
        <span className="text-lg font-semibold">{"/ " + PageName}</span>
      </h3>

      <div className="flex items-center">
        <SessionTimer />
        <a href="/" className="mx-2">
          home
        </a>
        <a href="/dashboard" className="mx-2">
          dashboard
        </a>
        <a href="/sign-up" className="mx-2">
          Sign up
        </a>
        <a href="/login" className="mx-2">
          Login
        </a>
        <a href="/logout" className="mx-2">
          logOut
        </a>
      </div>
    </nav>
  );
}
