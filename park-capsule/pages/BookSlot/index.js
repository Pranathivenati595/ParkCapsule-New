import NavigationBar from "../../components/Home/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import BookParkingSlot from "../../components/BookSlot/BookParkingSlot";
import { useRouter } from "next/router";
const BookSlot = () => {
  const router=useRouter()
  return (
    <>
      <NavigationBar />
      <BookParkingSlot />
    </>
  );
};
export default BookSlot;