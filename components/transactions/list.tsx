import { useState, useContext } from "react";
import DataContext from "../data-context";
import Item from "./item";
import styles from "../../styles/List.module.css"
import ModalForm from "../modal-form/ModalForm";
import DeleteModal from "../modal-form/deleteModal";

const List = () => {
    const ctx = useContext(DataContext);
    const [show, setShow] = useState(false);
    const [delShow, setDelShow] = useState(false);
    const [payload, setPayload] = useState({})
    const [id, setId] = useState("")

    const renderDate = (curr:string) => {
        if(curr !== prev){
            prev = curr
            return <div className={styles.dateContainer}>
                {curr}
            </div>
        }
        return <></>
    }
    
    if(!ctx.entries || ctx.entries.length === 0){
        return (
            <h1>
                No transactions yet.
            </h1>
        )
    }
    let prev:string = new Date (ctx.entries[0].date).toDateString()

    const closeModal = () => {
        setShow(false)
    }

    const updateItem = (descript:string, date:string, amount:number, type:string, id:string) => {
        ctx.edit(id, {
            id:id,
          date: new Date(date).getTime() + 1000 * 300 * 60 + 1000,
          description: descript,
          amt: type === "income" ? Math.abs(amount) : -1*Math.abs(amount)
        })
        setShow(false)
    }

    const editHandler = (entry:any) => {
        setPayload(entry)
        setShow(true)
    }

    const deleteItem = (id:any) => {
        ctx.delete(id)
        setDelShow(false)
    }

    const delClose = () => {
        setDelShow(false)
    }

    const delHandler = (tId:any) => {
        setId(tId)
        setDelShow(true);

    }

    return (
        <div>
        <DeleteModal onConfirm={deleteItem} onCancel={delClose} show={delShow} itemId={id} />
        <ModalForm onConfirm={updateItem} onCancel={closeModal} show={show} payload={payload} />
        <ul>
            <div className={styles.dateContainer}>{prev}</div>
            {ctx.entries.map((entry: { date: number; id: string | null | undefined; description:string; amt:Number | any}) => {
                return (
                    <div key={entry.id}>
                    {renderDate(new Date(entry.date).toDateString())}
                    <li className={styles.list}>
                    <Item entry={entry} onEdit={editHandler} onDelete={delHandler} />
                    </li>
                    </div>
                )
            })
        }
        </ul>
        </div>
    )
}
export default List;