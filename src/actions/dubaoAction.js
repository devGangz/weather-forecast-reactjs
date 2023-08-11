import { PRESS_ENTER, INPUT_CHANGE, LOADING_DATA,LOADING_DATA_OK, LOADING_ERROR, LOADING_DATA_OK_CO_DU_LIEU, CLEAR_INPUT,RESTORE_INPUT } from "../constants/dubaoConstants";
//import React, { useState } from 'react';

export const GetApi = (value1) => {
    console.log(value1)
    return async (dispatch) => {
        try {
            const api = {
                key: "4f8e795dcd6dbf7b9f5276bff095ffc1",
                base: "https://api.openweathermap.org/data/2.5/forecast?q="
            }
            
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
    
            await dispatch({
                type: LOADING_DATA
            })
    
            const getData5day1 = await fetch(`${api.base}${value1}&appid=${api.key}&units=metric`, requestOptions);
            const getData5day2 = await getData5day1.json()
            console.log("dữ liệu 5 ngày", getData5day2.list)
            if(getData5day2.list == undefined) {
                dispatch ({type: LOADING_ERROR})  
                dispatch ({type: LOADING_DATA_OK})
            }
            return dispatch({
                type: LOADING_DATA_OK_CO_DU_LIEU,
                data5:getData5day2.list

            })
        } catch {
            return dispatch ({
                type: LOADING_ERROR,
            })             
        }
    }
}




export const inputCityAction = (inputValue) => {
    return {
        type: INPUT_CHANGE,
        payload: inputValue
    }
}

export const pressEnterAction = (inputValue) => {
    return {
        type: PRESS_ENTER,
        payload:inputValue
    }
}
export const clearText = () => {
    return {
        type: CLEAR_INPUT
    } 
}

export const pressAfterError = () => {
    return {
        type: RESTORE_INPUT,
    } 
}