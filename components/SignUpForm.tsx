"use client";

import { useForm } from "react-hook-form";
import { $axios } from "../config/axios";

type FormData = {
  firstName: string;
  lastName: string;
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

  const signUp = handleSubmit((data) => {
    $axios
      .post("/auth/signup", data)
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
      <form onSubmit={signUp} className="w-[50%] p-10 bg-[#129493]">
        <div className="flex flex-col items-center gap-2 ">
          <h1 className="text-xl font-bold">Sing Up</h1>
          <label>Nombre</label>
          <input {...register("firstName")} />
          <label>Apellido</label>
          <input {...register("lastName")} />
          <label>Email</label>
          <input {...register("email")} />
          <label>password</label>
          <input {...register("password")} />
          <div className="flex justify-between w-full px-20">
            <button
              onClick={() => {
                setValue("firstName", "Allison"); // ✅
                setValue("lastName", "Peña"); // ✅
                setValue("email", "allison.jpb@gmail.com"); // ✅
                setValue("password", "password"); // ✅
              }}
            >
              rellenar
            </button>
            <button onClick={signUp}>enviar</button>
          </div>
        </div>
      </form>
    </>
  );
}
