import React from "react";
import ViewMore from "./ViewDetails";
import GetAppIcon from '@material-ui/icons/GetApp';

function Card(props) {
    return (
        <div className="post" >
            <p>{props.dueDate}</p>
            <h2>{props.title}</h2>
            <h3>{props.subName}</h3>
            {/* <p>{props.description.substring(0,20) + "....."}</p> */}
            <ViewMore data={props} />
        </div>

    );

}


export default Card;
