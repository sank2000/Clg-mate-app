import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ViewMore from "../dialogs/details/PostDetails";

function PostCard(props) {
  let dueColor = {};
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  // console.log(tomorrow + ": tomorrow");
  let today = new Date();
  // console.log(today + ' : today');
  let due = new Date(props.dueDate);
  // fix this bug

  if (due === today) {
    console.log('due is today : ' + props.title);
    dueColor.color = 'red';
  } else if (due < today) {
    console.log('due not today : ' + props.title);
    dueColor.color = '#cc0000';
  } else if (due === tomorrow) {
    console.log('due is tomorrow : ' + props.title);
    dueColor.color = 'green';
  }

  return (
    <Card elevation={3} style={{ margin: "15px", borderRadius: "10px", padding: "3px" }}>
      <CardContent>
        <div className="top">
          <span className="due-date" style={dueColor}>
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
      </CardContent>
      <CardActions>
        <ViewMore data={props} />
      </CardActions>
    </Card>
  );
}

export default PostCard;
