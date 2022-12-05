"use client";
export default function Logout() {
  //if user is logged in redirect to dashboard, delete access_token
  if (localStorage.getItem("access_token")) {
    localStorage.removeItem("access_token");
  }
  window.location.href = "/login";
  return null;
}
