import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Buffer} from 'buffer';


export interface UserInfoType {
    id?: string
    token?: string

    setUserData: (token: string) => void
}

export const UserInfoContext = createContext<UserInfoType>({
    id: "",
    token: "",

    setUserData: (token: string) => {}
});

export const UserInfoProvider = ({children}: any) => {
    const [token, setToken] = useState<string>("");
    const [id, setId] = useState<string>("");


    useEffect(() => {
        getData("@id").then((res:any) => {
            setId(res);
        });

        getData("@token").then((res:any) => {
            setToken(res);
        });
    }, [])

    function setUserData(token: string) {
        let id = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('ascii')).sub;
        setId(id);
        setToken(token);
        storeData("@id", id);
        storeData("@token", token);
    }

    const storeData = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            console.log(e);
        }
    }

    const getData = async (key: string) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if(value !== null) {
                return value;
            }
            return null;

        } catch(e) {
            console.log(e);
        }
    }

    return (
        <UserInfoContext.Provider value={{id, token, setUserData}}>
            {children}
        </UserInfoContext.Provider>
    )
}