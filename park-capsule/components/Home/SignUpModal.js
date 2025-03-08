import { Modal } from "react-responsive-modal";
import { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import styles from "../../styles/Home/SignUpModal.module.css";
import { useUser } from "../../context/userContext"
import axios from "axios";
import { useRouter } from "next/router";
export default function SignUpModal(props) {
  const { setUser } = useUser();
  const router = useRouter();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    setError("");
  }, []);
  const signUpHandler = async () => {
    if (
      name === "" ||
      email === "" ||
      phoneNumber === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("Please Fill all the fields!");
      return;
    } else if (password !== confirmPassword) {
      setError("Password and confirm password should be same");
      return;
    } else {
      try {
        const res = await axios.post("https://truth-gelatinous-group.glitch.me/user/signup", {
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
        });
        const user = { token: res.data.token, id: res.data.userInfo._id };
        console.log("user details",user)
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        setError("");
        router.push("/profile");
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("Something Went Wrong,Please Try Again!");
        }
      }
    }
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
          <p className={styles.heading}>Create Your Account</p>
        </div>
        <div className={styles.inputs}>
          {error ? (
            <div className={styles.error}>
              <p>{error}</p>
            </div>
          ) : (
            ""
          )}
          <input
            value={name}
            type="text"
            placeholder="Name"
            className={styles.inputFirst}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            value={phoneNumber}
            type="tel"
            placeholder="Phone Number"
            className={styles.input}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <input
            value={email}
            type="email"
            placeholder="Email"
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="password"
            placeholder="Password"
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.but}>
          <button
            onClick={signUpHandler}
            className={styles.button}
            type="button"
          >
            Sign Up
          </button>
        </div>
      </div>
    </Modal>
  );
}
