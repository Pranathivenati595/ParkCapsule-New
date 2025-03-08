import styles from "../../styles/Home/Card.module.css";
export default function Card(props) {
  return (
    <div className={styles.root}>
      <div>
        <img src={props.image} className={styles.image} />
      </div>
      <div className={styles.text}>
        <p className={styles.subHead}>{props.subHeading}</p>
        <p className={styles.para}>
            {props.para}
        </p>
      </div>
    </div>
  );
}
