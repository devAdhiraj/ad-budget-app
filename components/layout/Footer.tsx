import styles from "../../styles/Footer.module.css";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillGoogleCircle,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.author}>Project by: Adhiraj Singh</p>
      <ul className={styles.listContainer}>
        <li className={styles.navitem}>
          <a
            className={styles.navlink}
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/adhiraj-singh-954b19206/"
          >
            <AiFillLinkedin className={styles.icon} />
          </a>
        </li>
        <li className={styles.navitem}>
          <a
            className={styles.navlink}
            rel="noopener noreferrer"
            target="_blank"
            href="https://www.github.com/devAdhiraj/"
          >
            <AiFillGithub />
          </a>
        </li>
        <li className={styles.navitem}>
          <a
            className={styles.navlink}
            rel="noopener noreferrer"
            target="_blank"
            href="mailto:adhiraj.bal@gmail.com"
          >
            <AiFillGoogleCircle />
          </a>
        </li>
      </ul>
      <span className={styles.navitem}>
        <a className={styles.navlink} rel="noopener noreferrer"
            target="_blank" href="https://github.com/devAdhiraj/ad-budget-app">
          Source Code
        </a>
      </span>
    </footer>
  );
};

export default Footer;