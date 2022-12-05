"use client";

// get the token fron localstorage
// if token is not present redirect to login
// decode it
// get the expiration time
// compare the expiration time with the current time
// if the expiration time is less than the current time, redirect to login
// if the expiration time is greater than the current time, save the expiration time in a state

import { useEffect, useState } from "react";

export default function SessionTimer() {
  const [expirationTime, setExpirationTime] = useState<number | undefined>();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      //   redirect to login
      return;
    } else {
      const decoded = JSON.parse(atob(access_token.split(".")[1]));
      const exp = decoded.exp;
      setExpirationTime(exp);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      if (expirationTime && currentTime >= expirationTime) {
        localStorage.removeItem("access_token");
        return;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expirationTime]);

  // get the time remaining, update it every second and parse it to be readable

  const [timeRemaining, setTimeRemaining] = useState<string | undefined>();

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000);
      if (expirationTime && currentTime < expirationTime) {
        const time = expirationTime - currentTime;
        //parse time to be mm:ss
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        setTimeRemaining(
          `${minutes < 10 ? "0" + minutes : minutes}:${
            seconds < 10 ? "0" + seconds : seconds
          }`
        );
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expirationTime]);

  return (
    <>
      <h1 className="text-sm text-mono mx-2">
        {timeRemaining ? timeRemaining : "LOGGED OUT"}
      </h1>
    </>
  );
}
