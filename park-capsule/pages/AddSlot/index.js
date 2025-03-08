import NavigationBar from "../../components/Home/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import AddParkingSlot from "../../components/Addslot";
import { useEffect } from "react";
import { useRouter } from "next/router";
const AddSlot = () => {
  const router=useRouter()
  useEffect(()=>{
    if(localStorage.getItem("user")===null){
      router.push("/")
    }
  },[])
  return (
    <>
      <NavigationBar />
      <AddParkingSlot />
    </>
  );
};
export default AddSlot;
