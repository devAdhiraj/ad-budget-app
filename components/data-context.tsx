import { createContext, useState } from "react";
import {auth} from "../helpers/firebase";

interface EntryType {
    id: string,
    amt: Number,
    date: number,
    description: string
}
interface DataType {
    entries: Array<EntryType> | null,
    add: (payload:EntryType) => Promise<void>,
    edit: (id:string, payload:EntryType) => Promise<void>,
    delete: (id:string) => Promise<void>,
    update_entries: (data:Array<EntryType> | null) => void
}

const DataObj : DataType = {
    entries: [],
    add: async () => {},
    edit: async (id:string) => {},
    delete: async (id:string) => {},
    update_entries: () => {}
}

const DataContext = createContext(DataObj);

export const DataContextProvider = ({children} :any) => {
    const [entries, setEntries] = useState<Array<EntryType>>([]);

    const handleAdd = async (payload:EntryType) => {
        try{

            const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true)
            const resp = await fetch("/api/add", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            const {result, newId} = await resp.json();
            if(!result || result !== "success" || !newId){
                console.log("Error adding")
            } else{
                payload.id = newId
                let i = 0;
                for(;i < entries.length; ++i){
                    if(entries[i].date < payload.date){
                        break;
                    }
                }
                console.log(i)
                let newEntries = [...entries]
                newEntries.splice(i, 0, payload)
                setEntries(newEntries)
            }
        } catch(err) {
            console.log("Error adding")
        }
      }

      const handleDelete = async(id:string) => {
        try{
            const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true)
            const resp = await fetch(`/api/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${idToken}`
                }
            })
            const {result} = await resp.json()
            if(!result || result !== "deleted"){
                console.log("Error deleting")
            } else{
                setEntries(entries.filter(entry => entry.id !== id))
            }
        } catch(err){
            console.log("error deleting")
        }
      }

      const handleUpdate = async(id:string, payload:EntryType) => {
        try{
            const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true)
            const resp = await fetch(`/api/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                    "Content-type": "application/json"
                },
                body: JSON.stringify(payload)
            })
            const {result} = await resp.json()
            if(!result || result !== "updated"){
                console.log("Error updating")
            } else{
                setEntries(entries.map(entry => entry.id === id ? payload : entry))
            }
        } catch(err){
            console.log("Error updating")
        }
      }
      
      const updateEntries = (data:Array<EntryType> | null) => {
        setEntries(data || [])
      }

    const context:DataType = {
        entries: entries,
        add: handleAdd,
        edit: handleUpdate,
        delete: handleDelete,
        update_entries: updateEntries
    }
    return(
        <DataContext.Provider value={context} >
            {children}
        </DataContext.Provider>
    )
}
export default DataContext