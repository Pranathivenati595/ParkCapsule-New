import "react-responsive-modal/styles.css";
import styles from "../../styles/Home/LoginModal.module.css";
import { Modal } from "react-responsive-modal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "../../context/userContext"
export default function ModalLogin(props) {
  const { setUser } = useUser();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
  }, []);
  const signUpHandler = () => {
    props.onCloseModal();
    props.onOpenSignUpModal();
  };
  const close = () => {
    props.onCloseModal();
    props.setLocalUser(true);
  };
  const submitHandler = async (props) => {
    try {
      const res = await axios.post("https://truth-gelatinous-group.glitch.me/user/signin", {
        email,
        password,
      });
      const user = { token: res.data.token, id: res.data.userInfo._id };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      setError("");
      close();
      router.push("/");
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        console.log(error);
        setError("Something Went Wrong,Please Try Again!");
      }
    }
  };
  const forgotPassword = async () => {
    props.onCloseModal();
    props.setForgotOpen(true);
  };
  return (
    <Modal
      open={props.open}
      onClose={props.onCloseModal}
      center
      showCloseIcon={false}
    >
      <div className={styles.root}>
        <div className={styles.head}>
          <p className={styles.headtext}>Log Into Your Account</p>
        </div>
        <div style={{ marginTop: "1rem" }}>
          {error ? (
            <div className={styles.error}>
              <p>{error}</p>
            </div>
          ) : (
            ""
          )}
          <input
            value={email}
            className={styles.input}
            type="email"
            placeholder="Enter Your Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            style={{ marginTop: "2rem" }}
            className={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.part}>
            <div>
              <input
                type="checkbox"
                name="Login"
                value="Keep Me Logged In"
                style={{ marginRight: "8px" }}
                className={styles.checkbox}
              />
              <label htmlFor="Login">Keep me Logged In</label>
            </div>
            <div onClick={forgotPassword}>
              <p className={styles.forgot}>Forgot Password?</p>
            </div>
          </div>
        </div>
        <div>
          <button
            type="button"
            className={styles.button}
            onClick={submitHandler}
          >
            Log In
          </button>
        </div>
        <div className={styles.need}>
          <p className={styles.ns}>
            Need an Account?{" "}
            <span
              style={{ color: "#1b9bf0", cursor: "pointer" }}
              onClick={signUpHandler}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
}
