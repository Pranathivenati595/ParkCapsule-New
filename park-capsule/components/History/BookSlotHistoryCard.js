import styles from "../../styles/History/bookSlotHistoryCard.module.css";
import axios from "axios";
import useRazorpay from "react-razorpay";
import { useRouter } from "next/router";
import { useState } from "react";
import { Modal } from "react-responsive-modal";
export default function BookSlotHistoryCard(props) {
  const [open, setOpen] = useState(false);
  const[report,setReport]=useState("")
  const [error, setError] = useState("");
  const onCloseModal = () => setOpen(false);
  const router = useRouter();
  const Razorpay = useRazorpay();
  const [extendTime, setExtendTime] = useState();

  const extendTimeHandler = async () => {
    try {
      const res = await axios.post(
        "https://truth-gelatinous-group.glitch.me/book/extend",
        {
          bookingId: props.id,
          extendedTime: parseFloat(extendTime),
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      const url = "https://truth-gelatinous-group.glitch.me/payment";
      const response = await axios.post(
        url,
        {
          id: res.data.data._id,
        },
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      const data = response.data.data;
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        name: "travelCapsule",
        description: "Some Description",
        order_id: data.payment_id,
        handler: async (response) => {
          try {
            const updateUrl = `https://truth-gelatinous-group.glitch.me/${data._id}`;
            const captureResponse = await axios.patch(
              updateUrl,
              {
                status: "success",
                razorpay_payment_id_res: response.razorpay_payment_id,
                razorpay_order_id_res: response.razorpay_order_id,
                razorpay_signature_res: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                },
              }
            );
            alert("Your booking is Extended");
            router.push("/");
          } catch (error) {
            console.log(error);
          }
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }
  };
  const submitHandler=()=>{
    setOpen(false)
    alert("Report submitted successfully. Your money will be refunded based on your report")
  }
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img
          src={props.image ? props.image : "/parkingLotImage.jpg"}
          className={styles.img}
        />
      </div>
      <div className={styles.details}>
        <div className={styles.field}>
          <p>Place:</p>
          <p className={styles.value}>
            {props.place.length > 15
              ? props.place.slice(0, 14) + "..."
              : props.place}
          </p>
        </div>
        <div className={styles.field}>
          <p>Total Amount:</p>
          <p className={styles.value}>{props.amount}</p>
        </div>
        <div className={styles.field}>
          <p>Hours Booked</p>
          <p className={styles.value}>{props.hoursBooked}</p>
        </div>
        <div className={styles.field}>
          <p>Two Wheeler slots:</p>
          <p className={styles.value}>{props.twoWheeler}</p>
        </div>
        <div className={styles.field}>
          <p>Four wheeler slots:</p>
          <p className={styles.value}>{props.fourWheeler}</p>
        </div>
      </div>
      {props.status === "Active" ? (
        <div className={styles.buttons}>
          <input
            type="text"
            placeholder="Extend Time"
            className={styles.input}
            value={extendTime}
            onChange={(e) => setExtendTime(e.target.value)}
          />
          <button
            className={styles.button2}
            type="button"
            onClick={extendTimeHandler}
          >
            Submit
          </button>
        </div>
      ) : (
        ""
      )}
      <button
          className={styles.button3}
          type="button"
          onClick={() => setOpen(true)}
        >
          Report
        </button>
      <Modal
      open={open}
      onClose={onCloseModal}
      center
      showCloseIcon={false}
    >
      <div className={styles.modalRoot}>
      <div className={styles.modalHead}>
          <p className={styles.modalHeadtext}>Report Details</p>
        </div>
        
        <div>
          {error ? (
            <div className={styles.modalError}>
              <p>{error}</p>
            </div>
          ) : (
            ""
          )}
          <input
            value={report}
            className={styles.modalInput}
            type="text"
            placeholder="Reason for reporting"
            onChange={(e) => setReport(e.target.value)}
          />
          
        </div>
        <div>
          <button
            type="button"
            className={styles.modalButton}
            onClick={submitHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
    </div>
  );
}
