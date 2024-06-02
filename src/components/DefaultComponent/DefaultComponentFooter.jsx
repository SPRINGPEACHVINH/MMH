import React from "react";
import Footer from "../Footer/Footer";

const DefaultComponentFooter = ({ children }) => {
    return (
        <div>
            {children}
            <Footer />
        </div>
    );
}

export default DefaultComponentFooter;