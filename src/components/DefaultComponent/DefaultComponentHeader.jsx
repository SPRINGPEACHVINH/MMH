import React from "react";
import Header from "../Header/Header";

const DefaultComponentHeader = ({ children }) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

export default DefaultComponentHeader;