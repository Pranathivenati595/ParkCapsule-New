import axios from "axios";
import { useState } from "react";
import styles from "../styles/Home/SignUpModal.module.css";
import { useRouter } from "next/router";
const Reset = (props) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetPassword = async () => {
    try {
      if (password != confirmPassword) {
        return setError("Passwords do not match");
      }
      const res = await axios.post(
        `https://truth-gelatinous-group.glitch.me/user/updateuser/${user.id}`,
        {
          password,
        }
      );
      setError("");
      router.push("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div
      style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"97vh"
      }}
    >
      <div
        className={styles.root}
        style={{
          backgroundColor: "#283a59",
          display: "inline-block",
          margin: "auto",
          padding: "3rem",
        }}
      >
        <div className={styles.inputs}>
          {error ? (
            <div className={styles.error}>
              <p>{error}</p>
            </div>
          ) : (
            ""
          )}
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            style={{
              height: "1.5rem",
              backgroundColor: "#fff",
              color: "black",
              fontSize:"18px"
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            value={confirmPassword}
            type="password"
            placeholder="Confirm Password"
            className={styles.input}
            style={{
              height: "1.5rem",
              backgroundColor: "#fff",
              color: "black",
              fontSize:"18px"
            }}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={styles.but}>
          <button
            className={styles.button}
            type="button"
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
};
export default Reset;
