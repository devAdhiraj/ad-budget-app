import {useState, useEffect} from "react"
import { Modal, Button, Form } from "react-bootstrap";
import styles from "../../styles/ModalForm.module.css";

const ModalForm = ({onConfirm, onCancel, show, payload}:any) => {
    const [descript, setDescript] = useState(payload?.description? payload.description : "")
    const [date, setDate] = useState("")
    const [amount, setAmount] = useState(payload?.amt ? Math.abs(payload.amt) : "")
    const [type, setType] = useState(payload?.amt < 0 ? "expense" : "income");
  
    useEffect(() => {
      function formatDate(date:any) {
        if(!date){
          return ""
        }
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
     
      if(show){
        setDescript(payload?.description? payload.description : "")
        setDate(formatDate(payload?.date))
        setAmount(payload?.amt ? Math.abs(payload.amt) : "")
        setType(payload?.amt < 0 ? "expense" : "income");
      }
    }, [show])

    return (
    <Modal
    className={styles.modal}
      size="sm"
      show={show}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={styles.header}>
        <Modal.Title id="contained-modal-title-vcenter">
            Add/Edit Transaction
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
            <Form.Label htmlFor="description" >Description</Form.Label>
            <Form.Control name="description" type="text"minLength={1} maxLength={80} value={descript} onChange={e => setDescript(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label htmlFor="amount">Amount</Form.Label>
            <Form.Control name="amount" type="number" min={0} value={amount} onChange={e => setAmount(e.target.value)} />
            </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="date">
            End:
            <Form.Control name="date" type="date" value={date} onChange={e => setDate(e.target.value)}/>
            </Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="type">Sort by:
                <Form.Select name="sort" value={type} onChange={(e) => setType(e.target.value)} >
                    <option key={1} value="income" >Income</option>
                    <option key={2} value="expense" >Expense</option>
                    </Form.Select>
                </Form.Label>
            </Form.Group>
          </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setDate("")
          setDescript("")
          setType("")
          setAmount("")
          onCancel()
        }} > Cancel</Button>
        <Button variant="primary" onClick={() => {
          setDate("")
          setDescript("")
          setType("")
          setAmount("")
         onConfirm(descript, date, amount, type, payload?.id)}}>Save</Button>
      </Modal.Footer>
    </Modal>);
}

export default ModalForm;