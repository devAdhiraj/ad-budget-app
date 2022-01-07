import { createContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
import type {User} from "firebase/auth";
import {auth} from "../helpers/firebase";
import { useRouter } from 'next/router'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

// import {auth} from "./firebase";
interface AuthType {
    user: string | User | null,
    login: () => Promise<void>,
    logout: () => Promise<void>
}
const AuthObj :AuthType = {
    user: "pending",
    login: async () => {},
    logout: async () => {}
}

const AuthContext = createContext(AuthObj);

export const AuthContextProvider = ({children} :any) => {
    const [user, setUser] = useState<string | User | null>("pending");
    const router = useRouter()
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/spreadsheets");
    useEffect(() => {
        auth.onAuthStateChanged((res_user) => {
            setUser(res_user)
        })
    }, [])

    const handleLogin = async () => {
        try{
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential ? credential.accessToken : null;
            const idToken = await auth?.currentUser?.getIdToken(/* forceRefresh */ true)
              const resp = await fetch("/api/login", {method: "POST", headers: {
              authorization: `Bearer ${idToken}`
            }})
            const ans = await resp.json();     
            router.replace("/")
      
          } catch(error:any) {
            console.log("Error logging in")
          }
    }

    const handleLogout = async () => {
        try{
          await auth.signOut()
          await fetch("/api/logout", {
            method: "POST"
          })
          console.log("should logout")
          router.replace('/login')
          
        }catch(err){
          console.log("Error logging out")
        }
      }
    
    const context:AuthType = {
        user: user,
        login: handleLogin,
        logout: handleLogout
    }
    return(
        <AuthContext.Provider value={context} >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext