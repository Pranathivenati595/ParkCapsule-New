import styles from "../../styles/Home/Features.module.css";
import "aos/dist/aos.css"
export default function Features(props) {
  return (
    <div className={styles.features__main} id="features" style={{filter:props.open||props.signUpOpen?"blur(10px)":""}}>
      <div className={styles.features__cards}>
        <div className={styles.features__one}>
          <div className={styles.features}>
            <div className={styles.features__leftText}>
              <h3 style={{ "font-weight": "bolder" }}>Add Slot</h3>
              <p className={styles.features__subtext}>
                One can easily add a parking slot of a place if they have that available and can earn money if some one books that particular parking slot.
              </p>
            </div>
            <img
              src="/Valetparking.png"
              alt="valet parking"
              style={{ "margin-left": "1rem" }}
            />
          </div>
          <div className={styles.features}>
            <div className={styles.features__leftText}>
              <h3 style={{ "font-weight": "bolder" }}>History</h3>
              <p className={styles.features__subtext}>
                A user can check the history of his/her added parking slots and even his/her bookings,one can edit the parking slots also if they want to.
              </p>
            </div>
            <img
              src="/shorttremlot.png"
              alt="valet parking"
              style={{ "margin-left": "1rem" }}
            />
          </div>
          <div className={styles.features}>
            <div className={styles.features__leftText}>
              <h3 style={{ "font-weight": "bolder" }}>Extend-Time</h3>
              <p className={styles.features__subtext}>
                If a user want to extend the time for booking he can even do that by visiting our history page and extending the time of booking.
              </p>
            </div>
            <img
              src="/Longtermlot.png"
              alt="valet parking"
              style={{ "margin-left": "1rem" }}
            />
          </div>
        </div>

        <div className={styles.features__two}></div>

        <div className={styles.features__three}>
          <div className={styles.features}>
            <img
              src="/Economicslot.png"
              alt="economy lot"
              style={{ "margin-right": "1rem" }}
            />
            <div>
              <h3 style={{ "font-weight": "bolder" }}>Payments</h3>
              <p className={styles.features__subtext}>
                Payments are made much easier make a payment, the money is directly transferred to the parking slot's owner's account.
              </p>
            </div>
          </div>
          <div className={styles.features}>
            <img
              src="/Premiumuser.png"
              alt="premium parking"
              style={{ "margin-right": "1rem" }}
            />
            <div>
              <h3 style={{ "font-weight": "bolder" }}>Profile</h3>
              <p className={styles.features__subtext}>
                One can easily edit their details such as bank details,avatar,password etc by visiting the profile page of our website.
              </p>
            </div>
          </div>
          <div className={styles.features}>
            <img
              src="/Parkinggarage.png"
              alt="parking garage"
              style={{ "margin-right": "1rem" }}
            />
            <div>
              <h3 style={{ "font-weight": "bolder" }}>Book Slot</h3>
              <p className={styles.features__subtext}>
              A user can book a parking slot by seraching for a location and our website lists out all the parking slots that are near to the user.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
