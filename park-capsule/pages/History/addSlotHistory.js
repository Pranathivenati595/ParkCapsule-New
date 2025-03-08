import { useRouter } from "next/router";
import NavigationBar from "../../components/Home/navbar";
import axios from "axios";
import { useEffect,useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/History/addSlotHistory.module.css";
import AddSlotHistoryCard from "../../components/History/AddSlotHistoryCard";
export default function AddSlotHistory() {
    const[parkingData,setParkingData]=useState([])
    const router = useRouter();
  useEffect(async () => {
    if(localStorage.getItem("user")===null){
      router.push("/")
    }
    try {
      const res = await axios.get(
        "https://truth-gelatinous-group.glitch.me/parking/getParkingSlots",
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      setParkingData(res.data.parkingData)
    } catch (error) {
      console.log(error);
    }
  }, []);
  const pushRoute = () => {
    router.push("/History/bookSlotHistory");
  };
  return (
    <div>
      <NavigationBar />
      <div className={styles.rectangular}>
        <div className={styles.add}>
          <p style={{ marginTop: "auto", marginBottom: "auto" }}>
            ADD SLOT HISTORY
          </p>
        </div>
        <div className={styles.book} onClick={pushRoute}>
          <p style={{ marginTop: "auto", marginBottom: "auto" }}>
            BOOK SLOT HISTORY
          </p>
        </div>
      </div>
      {parkingData.length===0?(
          <div className={styles.error}>
              <p>You have no parking slots history.</p>
          </div>
            
      ):
      <div className={styles.cards}>
          {
              parkingData.map((park)=>{
                  return(
                      <AddSlotHistoryCard key={park._id} image={park.parkingImage} id={park._id} place={park.location} amount={park.amount} twoWheeler={park.twoWheeler} fourWheeler={park.fourWheeler} activeSlots={park.noOfActiveSlots} setParkingData={setParkingData} parkingData={parkingData}/>
                  )
              })
          }
      </div>
      }
    </div>
  );
}
