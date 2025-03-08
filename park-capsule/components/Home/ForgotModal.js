import "react-responsive-modal/styles.css";
import styles from "../../styles/Home/LoginModal.module.css";
import { Modal } from "react-responsive-modal";
import { useState, useEffect } from "react";
import axios from "axios";
export default function ForgotModal(props) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    setError("");
  }, []);
  const submitHandler = async () => {
    try {
      const res = await axios.post(
        "https://truth-gelatinous-group.glitch.me/user/forgotpassword",
        {
          email,
        }
      );
      props.setForgotOpen(false);
      setError("");
    } catch (error) {
      console.log(error);
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something Went Wrong,Please Try Again!");
      }
    }
  };
  return (
    <Modal
      open={props.forgotOpen}
      onClose={props.onCloseModal}
      center
      showCloseIcon={false}
    >
      <div className={styles.root}>
      <div className={styles.head}>
          <p style={{fontSize:"30px",marginBottom:"-5px"}} className={styles.headtext}>Forgot Password</p>
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
        </div>
        <div>
          <button
            style={{marginTop:"1rem"}}
            type="button"
            className={styles.button}
            onClick={submitHandler}
          >
            Send Link
          </button>
        </div>
      </div>
    </Modal>
  );
}
