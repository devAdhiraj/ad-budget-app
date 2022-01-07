import {useContext} from "react"; 
import styles from "../../styles/Navigation.module.css";
import AuthContext from "../auth-context";
import { Button } from "react-bootstrap";

const Navigation = () => {
  const ctx = useContext(AuthContext)

  const renderLogout = ():JSX.Element => {
    if(ctx.user){
      return (<div className={styles.btnWrapper}>
        <Button className={styles.btn} onClick={ctx.logout}>Logout</Button>
        </div>)
    }
    return <></>;
  }
  return (
    <header className={styles.header}>
        <nav>
      <div className={styles.container}>
        <figure className={styles.imgWrapper}>
          <img className={styles.logo} src="logo.svg" alt="Logo" />
        </figure>
        {renderLogout()}
      </div>
      </nav>
    </header>
  );
};

export default Navigation;