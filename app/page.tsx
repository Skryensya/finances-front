import Image from "next/image";
import styles from "./page.module.scss";
import Navbar from "../components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="w-full flex flex-col gap-4 justify-center items-center h-96">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-6xl mb-0">Finances app</h1>
          {/* <span>(Money & Savings Tracker)</span> */}
        </div>
        {/* <p className="text-sm ">made with ❤️ by Allison Peña</p> */}
      </div>
      <div className="grid grid-cols-12 gap-8 mx-32 ">
        <div className="col-span-4 h-72 bg-[gray]">.</div>

        <div className="col-span-4 h-72 bg-[gray]">.</div>

        <div className="col-span-4 h-72 bg-[gray]">.</div>
      </div>
    </>
  );
}
