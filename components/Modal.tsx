import { useState, useEffect } from "react";

export default function Modal({
  setOpen,
  children,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element | undefined;
}) {
  // disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  //   cose the modal when escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [setOpen]);

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto bg-gray-900 bg-opacity-20 "
      onClick={() => {
        setOpen(false);
      }}
    >
      <div className="flex items-center justify-center min-h-screen  ">
        <div
          className="p-10 bg-white rounded-lg"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
