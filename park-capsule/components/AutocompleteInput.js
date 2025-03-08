import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/AddSlot.module.css";
import style from "../styles/BookSlot/BookParkingSlot.module.css";
let autoComplete;

function SearchLocationInput(props) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP}&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (
          script.readyState === "loaded" ||
          script.readyState === "complete"
        ) {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  function handleScriptLoad(updateQuery, autoCompleteRef) {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current,
      { componentRestrictions: { country: "in" } }
    );
    autoComplete.setFields(["address_components", "formatted_address"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }

  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const query = addressObject.formatted_address;
    updateQuery(query);
    if (props.book) {
      props.setSearchLocation(addressObject.formatted_address);
      const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(addressObject.formatted_address) +
        ".json?access_token=" +
        process.env.NEXT_PUBLIC_GEOCODE_TOKEN;
      const { data } = await axios.get(url);
      props.setLongitude(data.features[0].geometry.coordinates[0]);
      props.setLatitude(data.features[0].geometry.coordinates[1]);
    } else {
      props.setLocation(addressObject.formatted_address);
      const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(addressObject.formatted_address) +
        ".json?access_token=" +
        process.env.NEXT_PUBLIC_GEOCODE_TOKEN;
      const { data } = await axios.get(url);
      props.setLng(data.features[0].geometry.coordinates[0]);
      props.setLat(data.features[0].geometry.coordinates[1]);
    }
  }

  return (
    <div className="search-location-input" style={{ display: "inline" }}>
      <input
        ref={autoCompleteRef}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter a place"
        defaultValue={props.location}
        value={props.updateFlag?props.location:query}
        className={props.book ? style.input : styles.parking__inputs}
      />
    </div>
  );
}

export default SearchLocationInput;
