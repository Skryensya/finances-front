import Navbar from "../../components/layout/Navbar";
import styles from "./page.module.scss";
import SingUpForm from "../../components/SignUpForm";

export default function signUp() {
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <SingUpForm></SingUpForm>
      </div>
    </>
  );
}
