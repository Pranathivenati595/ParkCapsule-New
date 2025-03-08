import '../styles/globals.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { UserProvider } from '../context/userContext';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init();
  }, []);
  return  <UserProvider>
  <Component {...pageProps} />
</UserProvider>
}

export default MyApp
