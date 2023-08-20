import { useEffect, useState } from "react";
import { createContext } from "react";
export const DataContext = createContext(null)
export const ProductContext=createContext(null)
const DataProvider = ({ children }) => {
    const [arr,setArr]=useState([]);
    const [account, setAccount] = useState('');
    return (
        <ProductContext.Provider value={{arr,setArr}}>
            <DataContext.Provider value={{
                account,
                setAccount
            }}>
                {children}
            </DataContext.Provider>
        </ProductContext.Provider>
    )
}
export default DataProvider