import React from "react";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GetAppIcon from '@material-ui/icons/GetApp';

function Card(props) {
    return (
        <div className="post" >
            <p>{props.DueDate}</p>
            <h2>{props.title}</h2>
            <h3>{props.subName}</h3>
            <h4>{props.author}</h4>
            <ExpansionPanel>
                <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
               Description
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <p>{props.description}</p>  
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <h5>{props.file}</h5>
            {props.url !== "" && <a href={props.url}><GetAppIcon className="DowIco" /></a> }
        </div>

    );

}


export default Card;
