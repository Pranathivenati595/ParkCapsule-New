import styles from "../../styles/History/addSlotHistoryCard.module.css";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
export default function AddSlotHistoryCard(props) {
  const router=useRouter()
  const deleteHandler = async () => {
    try {
      const res = await axios.delete(
        `https://truth-gelatinous-group.glitch.me/parking/${props.id}`,
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      const updatedParkingData=props.parkingData.filter((park)=>park._id!==props.id)
      props.setParkingData(updatedParkingData)
    } catch (error) {
      console.log(error);
    }
  };
  
  const editHandler=()=>{
    const addSlot={
      twoWheelers:props.twoWheeler,
      fourWheelers:props.fourWheeler,
      amount:props.amount,
      location:props.place,
      image:props.image,
      id:props.id
    }
    localStorage.setItem("addSlot",JSON.stringify(addSlot))
    router.push("/AddSlot")

  }
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <img src={props.image?props.image:"/parkingLotImage.jpg"} className={styles.img} />
      </div>
      <div className={styles.details}>
        <div className={styles.field}>
          <p>Active Bookings:</p>
          <p className={styles.value}>{props.activeSlots}</p>
        </div>
        <div className={styles.field}>
          <p>Amount per hour:</p>
          <p className={styles.value}>{props.amount}</p>
        </div>
        <div className={styles.field}>
          <p>Two Wheeler lots:</p>
          <p className={styles.value}>{props.twoWheeler}</p>
        </div>
        <div className={styles.field}>
          <p>Four wheeler lots:</p>
          <p className={styles.value}>{props.fourWheeler}</p>
        </div>
        <div className={styles.field}>
          <p>Place:</p>
          <p className={styles.value}>
            {props.place.length > 15
              ? props.place.slice(0, 14) + "..."
              : props.place}
          </p>
        </div>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button1} type="button" onClick={editHandler}>
          Edit
        </button>
        <button
          className={styles.button2}
          type="button"
          onClick={deleteHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
