import React, { createContext, useContext, useReducer } from 'react';

//prepares dataLayer
export const StateContext=createContext();

//wrap our app and provide dataLayer
export const StateProvider = ({reducer,initialState,children}) => {
    return (
        <StateContext.Provider  value={useReducer(reducer,initialState)}>
            {children}
        </StateContext.Provider>
    );
};
//pull information from the dataLayer
export const useStateValue=()=> useContext(StateContext);