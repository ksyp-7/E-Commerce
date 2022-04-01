import React,{createContext, useState, useEffect} from "react";
import ProductsAPI from "./api/ProductsAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import UserAPI from "./api/UserAPI";
import axios from 'axios'

export const globalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false);

    const refreshToken  = async  () => { 
        const tok = await axios.get('/user/refresh_token')
        // console.log()
        setToken(tok.data.accesstoken)
    }

    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
        
                setToken(res.data.accesstoken)
    
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])

    const state = {
        token : [token, setToken],
        productsApi: ProductsAPI(),
        userApi: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }
    return(
        <globalState.Provider value={state}>
            {children}
        </globalState.Provider>
    )
}