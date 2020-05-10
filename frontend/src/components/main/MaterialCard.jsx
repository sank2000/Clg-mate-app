import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ViewMore from "./../dialogs/PostDetails";
import ViewMetMore from "./../dialogs/MaterialDetails";

function PostCard(props) {
  return (
    <Card elevation={3} style={{ margin: "15px", borderRadius: "10px", padding: "3px" }}>
      <CardContent>
        <div className="top">
          {/* <span className="due-date">
            <ScheduleIcon fontSize="small" className="due-icon" /> {props.dueDate}
          </span> */}
          <span className="post-type">
            {props.subCode}
          </span>
        </div>
        <h2 className="post-title">
          {props.title}
        </h2>
        <div className="subject">
          {props.author}
        </div>
      </CardContent>
      <CardActions>
        <ViewMetMore data={props} />
      </CardActions>
    </Card>
  );
}

export default PostCard;
