"use client";

import { useForm } from "react-hook-form";
import { $axios } from "../config/axios";

type FormData = {
  email: string;
  password: string;
};

export default function SingInForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  //if user is logged in redirect to dashboard
  if (localStorage.getItem("access_token")) {
    window.location.href = "/dashboard";
  }

  const singIn = handleSubmit((data) => {
    $axios
      .post("/auth/signin", data)
      .then(({ data }) => {
        const { access_token } = data;
        // save access_token in localstorage
        localStorage.setItem("access_token", access_token);

        //redirect to dashboard
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.log({ err });
      });
  });

  return (
    <>
    
      <form onSubmit={singIn} className="w-[50%] p-10 bg-[lightgreen]">
        <div className="flex flex-col items-center gap-2 ">
          <h1 className="text-xl font-bold">Login</h1>
          <label>Email</label>
          <input {...register("email")} />
          <label>password</label>
          <input {...register("password")} />
          <div className="flex justify-between w-full px-20">
            <button
              onClick={() => {
                setValue("email", "allison.jpb@gmail.com"); // ✅
                setValue("password", "password"); // ✅
              }}
            >
              rellenar
            </button>
            <button onClick={singIn}>Ingresar</button>
          </div>
        </div>
      </form>
    </>
  );
}
