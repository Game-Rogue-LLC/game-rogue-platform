import { useRouter } from 'next/router';
import { createContext, useState } from 'react';
import { useContext } from 'react';

const AppContext = createContext({});

export const useAppContext = () => useContext(AppContext)

export default (props) => {
    const router = useRouter();
    const [title, setTitle] = useState(null);

    return (
        <AppContext.Provider value={{
            title, setTitle
        }}>
            {props.children}
        </AppContext.Provider>
    )
}
