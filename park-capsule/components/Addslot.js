import { useState,useEffect } from "react";
import axios from "axios";
import styles from "../styles/AddSlot.module.css";
import SearchLocationInput from "./AutocompleteInput";
import { useRouter } from "next/router";
const AddParkingSlot = () => {
  const router = useRouter();
  const [twoWheeler, setTwoWheeler] = useState("");
  const [fourWheeler, setFourWheeler] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [parkingImage, setParkingImage] = useState("");
  const [latitude, setLat] = useState(0);
  const [longitude, setLng] = useState(0);
  const[finalImage,setFinalImage]=useState("")
  const [error, setError] = useState("");
  const[updateFlag,setUpdateFlag]=useState(false)
  const[parkingSlotId,setParkingSlotId]=useState("")
  useEffect(async()=>{
    if(localStorage.getItem("addSlot")){
      const addSlot=JSON.parse(localStorage.getItem("addSlot"))
      setTwoWheeler(addSlot.twoWheelers)
      setFourWheeler(addSlot.fourWheelers)
      setParkingImage(addSlot.image)
      setAmount(addSlot.amount)
      setLocation(addSlot.location)
      setFinalImage(addSlot.image)
      setParkingSlotId(addSlot.id)
      console.log(encodeURIComponent(location),process.env.NEXT_PUBLIC_GEOCODE_TOKEN)
      setUpdateFlag(true)
      update()
    }
  },[])
  const update=async()=>{
    if(location){
      const url =
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
          encodeURIComponent(location) +
          ".json?access_token=" +
          process.env.NEXT_PUBLIC_GEOCODE_TOKEN;
        console.log(url)
        const { data } = await axios.get(url);
        setLng(data.features[0].geometry.coordinates[0]);
        setLat(data.features[0].geometry.coordinates[1]);
    }
  }
  const handleAddSlot = async () => {
    try {
      if (!location) {
        return setError("Location Field is mandatory!");
      } else if (!twoWheeler || !fourWheeler) {
        return setError("FourWheeler or TwoWheeler field is mandatory");
      } else if (!amount) {
        return setError("amount field is mandatory");
      }
      else if(updateFlag===true){
        const obj = {
          location,
          fourWheeler,
          twoWheeler,
          amount,
          latitude,
          longitude,
          parkingImage: parkingImage.toString(),
        };
        const res=await axios.patch(`https://truth-gelatinous-group.glitch.me/parking/${parkingSlotId}`,obj,{
          headers: {
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("user")).token
            }`,
          },
        })
        console.log(res)
        localStorage.removeItem("addSlot")
        alert("Parking slot succesfully updated");
        router.push("/History/addSlotHistory");
      }
      
      
      else {
        const obj = {
          location,
          fourWheeler,
          twoWheeler,
          amount,
          latitude,
          longitude,
          parkingImage: parkingImage.toString(),
        };
        const res = await axios.post(
          "https://truth-gelatinous-group.glitch.me/parking/addSlot",
          obj,
          {
            headers: {
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("user")).token
              }`,
            },
          }
        );
        alert("Parking slot succesfully added");
        router.push("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setParkingImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
        setFinalImage(fileReader.result.toString())
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className={styles.parking__main}>
      <div className={styles.parking__head}>
        <img src="/addSlot.jpeg" className={styles.parking__car} />
        <div className={styles.parking__box}>
          <div className={styles.parking__white}>
            <h2 className={styles.addslottext}>ADD SLOT</h2>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.parking__content}>
              <div className={styles.parking__range}>
                <div className={styles.inputtext}>Range for two wheelers</div>
                <input
                  type="Number"
                  placeholder="ex:100"
                  className={styles.parking__inputs}
                  defaultValue={twoWheeler}
                  onChange={(e) => setTwoWheeler(e.target.value)}
                />
              </div>
              <div className={styles.parking__range}>
                <div className={styles.inputtext}>Range for four wheelers</div>
                <input
                  type="Number"
                  placeholder="ex:100"
                  className={styles.parking__inputs}
                  defaultValue={fourWheeler}
                  onChange={(e) => setFourWheeler(e.target.value)}
                />
              </div>
              <div className={styles.parking__range}>
                <div className={styles.inputtext}>Location</div>
                <SearchLocationInput
                  updateFlag={updateFlag}
                  location={location}
                  setLocation={setLocation}
                  setLat={setLat}
                  setLng={setLng}
                />
              </div>
              <div className={styles.parking__range}>
                <div className={styles.inputtext}>Amount</div>
                <input
                  type="Number"
                  className={styles.parking__inputs}
                  placeholder="ex: 25"
                  defaultValue={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className={styles.parking__range}>
                <input
                  type="file"
                  id="picture"
                  className={styles.file}
                  onChange={(e) => {
                    uploadImage(e);
                  }}
                />
                <label htmlFor="picture" style={{ cursor: "pointer" }}>
                  <p
                    style={{
                      display: "inline",
                      fontWeight: "500",
                    }}
                  >
                    Picture Upload{" "}
                  </p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-plus-circle-fill"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                  </svg>
                </label>
                {finalImage&&(
                  <img style={{width:"2rem",marginLeft:"1rem",height:"2rem"}} src={finalImage}/>
                )}
              </div>
              <button className={styles.parking__btn} onClick={handleAddSlot}>
                ADD
              </button>
            </div>
          </div>
          <div className={styles.parking__image}>
            <img src="/car.jpg" className={styles.car__image} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddParkingSlot;
