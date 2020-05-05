import React from "react";

function Card(props) {
    return (
        <div className="post" >
            <h1>{props.subCode} </h1>
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            <h3>{props.subName}</h3>
            <h4>{props.file}</h4>
            <a href={props.url}>Download</a>
        </div>

    );

}


export default Card;
