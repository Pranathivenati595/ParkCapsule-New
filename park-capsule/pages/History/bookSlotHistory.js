import { useRouter } from "next/router";
import NavigationBar from "../../components/Home/navbar";
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/History/bookSlotHistory.module.css";
import BookSlotHistoryCard from "../../components/History/BookSlotHistoryCard";
import { useEffect,useState } from "react";
export default function BookSlotHistory() {
  const[bookingData,setBookingData]=useState([])
  const router = useRouter();
  const pushRoute = () => {
    router.push("/History/addSlotHistory");
  };
  useEffect(async()=>{
    if(localStorage.getItem("user")===null){
      router.push("/")
    }
    try{
      const res = await axios.get(
        "https://truth-gelatinous-group.glitch.me/book",
        {
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        }
      );
      setBookingData(res.data.history)
    }
    catch(error){
      console.log(error)
    }
  },[])
  return (
    <div className={styles.root}>
      <NavigationBar />
      <div className={styles.rectangular}>
        <div className={styles.add} onClick={pushRoute}>
          <p style={{ marginTop: "auto", marginBottom: "auto" }}>
            ADD SLOT HISTORY
          </p>
        </div>
        <div className={styles.book}>
          <p style={{ marginTop: "auto", marginBottom: "auto" }}>
            BOOK SLOT HISTORY
          </p>
        </div>
      </div>
      {bookingData.length===0?(
          <div className={styles.error}>
              <p>You have no previous bookings.</p>
          </div>
            
      ):
      <div className={styles.cards}>
          {
              bookingData.map((book)=>{
                  return(
                      <BookSlotHistoryCard key={book._id} image={book.parkingSlotImage} id={book._id} status={book.status} place={book.place} amount={book.totalAmount} twoWheeler={book.noOfTwoWheelerBooked} fourWheeler={book.noOfFourWheelerBooked} hoursBooked={book.hoursBooked}/>
                  )
              })
          }
      </div>
      }
      </div>
  );
}
