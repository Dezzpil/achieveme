import React, {ReactNode} from "react";

interface Props {
    children: ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
    return <>
        <h1>AchieveMe</h1>
        { children }
    </>
}

export default Layout;