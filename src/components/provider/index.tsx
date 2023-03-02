import React,{ createContext } from "react";
import Portal from "../portal";
 
const Content = createContext(null);

const { Provider,Consumer } = Content;

interface providerProps {
  children: React.ReactNode;
  value:any;
  setValue:any;
}

export const {
  Consumer
}

export default (props:providerProps) => {
  const { children, value, setValue } = props;
  return (
    <Provider value={{value, setValue}}>
      <Portal.Host>{children}</Portal.Host>
    </Provider>
  );
};