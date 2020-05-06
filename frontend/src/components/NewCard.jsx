import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ScheduleIcon from '@material-ui/icons/Schedule';

function NewCard(props) {
  return (
    <Card elevation={3} style={{ maxWidth: "50%", minWidth: "40%", margin: "15px", borderRadius: "10px", padding: "7px" }}>
      <CardContent>
        <div className="top">
          <span className="due-date">
            <ScheduleIcon fontSize="small" className="due-icon" /> {props.dueDate}
          </span>
          <span className="post-type">
            {props.postType}
          </span>
        </div>
        <h2 className="post-title">
          {props.title}
        </h2>
        <div className="subject">
          {props.subject}
        </div>
        <div className="description">
          {props.description}
        </div>
      </CardContent>
      <CardActions>
        <Button size="medium" color="primary">SHOW DETAILS</Button>
      </CardActions>
    </Card>
  );
}

export default NewCard;
