import styles from "../../styles/Home/About.module.css";
import Card from "./Card";
import "aos/dist/aos.css"
export default function AboutUs(props) {
  return (
    <div className={styles.root} id="about" style={{filter:props.open||props.signUpOpen?"blur(10px)":""}}>
      <div className={styles.head}>
        <p className={styles.heading}>About Us</p>
      </div>
      <div className={styles.cards}>
        <Card
          image="/FirstPerson.png"
          subHeading="App Consultancy"
          para="We help you define
            the best features for your app."
        />
        <Card
          image="/SecondPerson.png"
          subHeading="UX and UI Design"
          para="We provide outstanding app design for your users."
        />
        <Card
          image="/FirstPerson.png"
          subHeading="App Development"
          para="We employ a team
          of experts to build
          your app."
        />
      </div>
      <div className={styles.contact}>
          <p className={styles.contactText} style={{marginTop:"1.9rem"}}>Connect us with: </p>
          <img src="/Instagram.png" className={styles.insta}/>
          <p className={styles.contactText} style={{marginRight:"2rem"}}>Park_capsule/insta</p>
          <img src="/Facebook.png" className={styles.contactImage}/>
          <p className={styles.contactText} style={{marginRight:"2rem",marginLeft:"3px"}}>Park_capsule/facebook</p>
          <img src="/Linkdin.png" className={styles.contactImage}/>
          <p className={styles.contactText} style={{marginLeft:"3px"}}>Park_capsule/linkdin</p>
      </div>
    </div>
  );
}
