import styles from "../../styles/Item.module.css"
import { Button } from "react-bootstrap";

const Item = ({entry, onEdit, onDelete}:any) => {
    return (
        <div className={`${styles.container} ${entry.amt > 0 ? styles.income : styles.expense} `}>
            <div className={styles.btnWrapper}>
      <      Button className={styles.delBtn} size="sm" variant="danger" onClick={() => onDelete(entry.id)}>-</Button>
            </div>
            <span className={styles.title} onClick={() => onEdit(entry)}>
            {entry.description}
            </span>
            <span className={styles.amt} onClick={() => onEdit(entry)}>
                ${" "}{Math.abs(parseFloat(entry.amt)).toFixed(2)}
            </span>
        </div>
    )
}

export default Item;