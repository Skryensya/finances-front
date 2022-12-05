import Navbar from "../../components/layout/Navbar";
import styles from "./page.module.scss";
import SingInForm from "../../components/SignInForm";

export default function Login() {
  return (
    <>
      <Navbar />
      <div className=" flex justify-center">
        <SingInForm></SingInForm>
      </div>
    </>
  );
}
