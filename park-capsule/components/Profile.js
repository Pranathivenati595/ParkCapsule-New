import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/Profile.module.css";
export default function Profile() {
  const router = useRouter();
  //radio buttons visibility
  const [cardVisibility, setCardVisibility] = useState(false);
  const [upiVisibility, setUpiVisibility] = useState(false);

  //user details
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountNumber, setAccountNUmber] = useState("");
  const [IFSC, setIFSC] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [upi, setUPI] = useState("");
  const [avatar, setAvatar] = useState("/avatar.jpg");

  const [disable, setDisable] = useState(true);
  const [error, setError] = useState("");

  const [refresh, setRefresh] = useState(true);

  useEffect(async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        return router.push("/");
      }
      const { data } = await axios.get(`https://truth-gelatinous-group.glitch.me/user/${user.id}`);
      setName(data.userInfo.name);
      setPhoneNumber(data.userInfo.phoneNumber);
      setEmail(data.userInfo.email);
      setPassword(data.userInfo.password);
      setAccountNUmber(data.userInfo.bankAccountNumber);
      setIFSC(data.userInfo.IFSCCode);
      setNameOnCard(data.userInfo.NameOnBank);
      setUPI(data.userInfo.upiId);
      setAvatar(data.userInfo.avatar);
    } catch (error) {
      setError(error);
      console.log(error);
      alert(error);
    }
  }, [refresh]);

  const handleBankingOption = (e) => {
    if (e.target.value === "upiPay") {
      setUpiVisibility(true);
      setCardVisibility(false);
    } else if (e.target.value === "card") {
      setCardVisibility(true);
      setUpiVisibility(false);
    }
  };

  const handleUpdate = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const obj = {
        name,
        phoneNumber,
        email,
        password,
        upiId: upi,
        bankAccountNumber: accountNumber,
        IFSCCode: IFSC,
        NameOnBank: nameOnCard,
        avatar: avatar.toString(),
      };
      console.log(obj);
      const updates = await axios.patch(
        `https://truth-gelatinous-group.glitch.me/user/updateuser/${user.id}`,
        obj
      );
      // console.log(updates.data);
      setRefresh(true);
      setDisable(true);
    } catch (error) {
      setError(error);
      console.log(error);
      alert(error);
    }
  };
  const clickHandler = () => {
    setDisable(!disable);
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setAvatar(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className={styles.profile__main}>
      <div>
        <button className={styles.profile__Edit} onClick={clickHandler}>
          Edit Profile
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pencil-fill"
            viewBox="0 0 16 16"
            style={{ "margin-left": "0.5rem" }}
          >
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
          </svg>
        </button>
        <div className={styles.profile__avatar}>
          {avatar ? (
            <img src={avatar} className={styles.img} />
          ) : (
            <img src="/avatar.jpg" className={styles.img} />
          )}

          <input
            type="file"
            id="file"
            className={styles.file}
            onChange={(e) => {
              uploadImage(e);
            }}
          />
          <label htmlFor="file" className={styles.file__label}>
            Choose Photo
          </label>
        </div>

        <div className={styles.deets}>
          <h2>{name}</h2>
          <div>{email}</div>
          <div>+91 {phoneNumber}</div>
          <div>Male</div>
        </div>
        <h3
          style={{
            color: "#4BE1DF",
            "text-align": "left",
            width: "60%",
            margin: "auto",
          }}
        >
          Details
        </h3>
        <div className={styles.profile__details}>
          <div className={styles.profile__deets}>
            <div className={styles.profile__heading}>Name</div>
            <input
              type="text"
              className={styles.profile__values}
              placeholder="Name"
              disabled={disable}
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.profile__deets}>
            <div className={styles.profile__heading}>PhoneNumber</div>
            <input
              type="text"
              className={styles.profile__values}
              placeholder="Phone Number"
              defaultValue={phoneNumber}
              disabled={disable}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className={styles.profile__deets}>
            <div className={styles.profile__heading}>Email</div>
            <input
              type="email"
              className={styles.profile__values}
              placeholder="Email"
              defaultValue={email}
              disabled={disable}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.profile__deets}>
            <div className={styles.profile__heading}>Password</div>
            <input
              type="password"
              className={styles.profile__values}
              placeholder="password"
              defaultValue={password}
              disabled={disable}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <h3>Payment Process</h3>
          <div>
            <div className={styles.profile__bank}>
              <input
                type="radio"
                name="bank"
                value="upiPay"
                onChange={handleBankingOption}
              />
              <label htmlFor="upiPay" className={styles.profile__bank}>
                UPI PAY
              </label>
              <div className={styles.profile__upiSubText}>
                Safe Payment Online. Card not needed
              </div>
              <img src="/upi.png" className={styles.profile__upiImg} />
            </div>
            {upiVisibility && (
              <div className={styles.profile__bankInput}>
                <input
                  type="text"
                  placeholder="Upi id number.."
                  className={styles.profile__values}
                  defaultValue={upi}
                  disabled={disable}
                  onChange={(e) => setUPI(e.target.value)}
                />
              </div>
            )}
            <br />
            <div className={styles.profile__bank}>
              <input
                type="radio"
                id="css"
                name="bank"
                value="card"
                onChange={handleBankingOption}
              />
              <label htmlFor="card" className={styles.profile__bank}>
                Credit/Debit Card
              </label>
              <img src="/visa.png" className={styles.profile__visapic} />
            </div>

            {cardVisibility && (
              <div className={styles.profile__bankInput}>
                <input
                  type="text"
                  placeholder="Name On Card"
                  className={styles.profile__values}
                  defaultValue={nameOnCard}
                  disabled={disable}
                  onChange={(e) => setNameOnCard(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="xxxx xxxx xxxx xxxx"
                  className={styles.profile__values}
                  defaultValue={accountNumber}
                  disabled={disable}
                  onChange={(e) => setAccountNUmber(e.target.value)}
                />
                <br></br>
                <input
                  type="text"
                  placeholder="IFSC"
                  className={styles.profile__values}
                  style={{ width: "25%" }}
                  defaultValue={IFSC}
                  disabled={disable}
                  onChange={(e) => setIFSC(e.target.value)}
                />
              </div>
            )}
            <br></br>
            {disable ? (
              <button className={styles.btn}>Submit</button>
            ) : (
              <button className={styles.btn} onClick={() => handleUpdate()}>
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
