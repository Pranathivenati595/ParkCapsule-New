import NavigationBar from "../components/Home/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "../components/Home/HomePage";
import Features from "../components/Home/Features";
import AboutUs from "../components/Home/AboutUs";
import ContactUs from "../components/Home/ContactUs";
import { useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  return (
    <div>
      <NavigationBar
        open={open}
        setOpen={setOpen}
        forgotOpen={forgotOpen}
        signUpOpen={signUpOpen}
        setSignUpOpen={setSignUpOpen}
        setForgotOpen={setForgotOpen}
      />
      <HomePage open={open} signUpOpen={signUpOpen} forgotOpen={forgotOpen} />
      <AboutUs open={open} signUpOpen={signUpOpen} forgotOpen={forgotOpen} />
      <Features open={open} signUpOpen={signUpOpen} forgotOpen={forgotOpen} />
      <ContactUs open={open} signUpOpen={signUpOpen} forgotOpen={forgotOpen} />
    </div>
  );
}
