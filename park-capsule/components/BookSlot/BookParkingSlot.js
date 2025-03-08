import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/BookSlot/BookParkingSlot.module.css";
import BookParkingSlotCard from "./BookParkingSlotCard";
import AutoCompleteInput from "../AutocompleteInput";
export default function BookParkingSlot() {
  const [searchLocation, setSearchLocation] = useState("");
  const [lat, setLatitude] = useState(0);
  const [lng, setLongitude] = useState(0);
  const [slots, setSlots] = useState([]);
  const [flags, setFlags] = useState(false);
  const [radius, setRadius] = useState(1);
  useEffect(() => {
    if (radius != 1) handleSearchSlots();
  }, [radius]);
  const handleSearchSlots = async () => {
    try {
      console.log('here')
      const obj = {
        lat,
        lng,
        km: radius,
      };
      console.log(obj);
      const res = await axios.post(
        "https://truth-gelatinous-group.glitch.me/parking/getSlots",
        obj
      );
      console.log(res.data.data);
      setSlots(res.data.data);
      setFlags(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div style={{ position: "relative", display: "inline" }}>
          <AutoCompleteInput
            book={true}
            setSearchLocation={setSearchLocation}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
            style={{
              position: "absolute",
              right: "1rem",
              top: "0.75rem",
              cursor: "pointer",
            }}
            onClick={handleSearchSlots}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </div>
      </div>
      {slots.length !== 0 ? (
        slots.map((slot) => (
          <div>
            <BookParkingSlotCard
              id={slot._id}
              location={slot.location}
              amount={slot.amount}
              parkingImage={slot.parkingImage}
              // id={slot._id}
              twoWheelers={slot.twoWheeler}
              fourWheelers={slot.fourWheeler}
            />
            <br></br>
          </div>
        ))
      ) : flags ? (
        <div>
          <h3 style={{ color: "gray", textAlign: "center" }}>
            Looks like there are no Slots available in your area, You can
            increase the radius.
          </h3>
          <div
            style={{ margin: "auto", display: "block", textAlign: "center" }}
            name="radius"
          >
            <label htmlFor="radius" style={{ marginRight: "0.5rem" }}>
              Choose a radius:
            </label>
            <select onChange={(e) => setRadius(e.target.value)}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
