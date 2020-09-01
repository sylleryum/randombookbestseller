import React from 'react';
import {Jumbotron} from "react-bootstrap";

const Header = ({handler, current}) => {
    return (
        <div fluid className={"mx-auto header"}>
            <h3>I want a
            <select
                name={"seBooks"}
                id={"seBooks"}
                className={"rounded-lg border-0"}
                onChange={(e)=> {
                    handler(e.target.value)
                    document.getElementById("seBooks").selectedIndex = 0
                }}>
                <option value={999} disabled selected style={{display:"none"}}>
                    {current=0?"Fiction":"Non-fiction"}
                </option>
                <option value={0}>Fiction</option>
                <option value={1}>Non-Fiction</option>
            </select>
            Best-selling book
            </h3>
        </div>
    );
};

export default Header;
