"use client";
import axios from "axios";

export const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export const setAxiosToken = (token: Text) => {
  $axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const removeAxiosToken = () => {
  $axios.defaults.headers.common["Authorization"] = null;
};
