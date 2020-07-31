import React from "react";
import Navigator from "./Navigator";
const PageTemplate = ({children}) => <div className={"page"}>
    <Navigator/>
    {children}
</div>
export default PageTemplate