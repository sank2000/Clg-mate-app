import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ViewMore from "../dialogs/details/PostDetails";

function PostCard(props) {
  let dueColor = {};
  let cardclr = {};

  let DaTomorrow = new Date();
  DaTomorrow.setDate(DaTomorrow.getDate() + 2);
  DaTomorrow.setHours(0, 0, 0, 0);

  let today = new Date();
  today.setHours(0, 0, 0, 0);

  let due = new Date(props.dueDate);

  if (due < today) {
    dueColor = { color: '#ff9999' };
    cardclr = { backgroundColor: "rgba(150,150,150,.4)" };
  }
  if (due > today && due < DaTomorrow) {
    dueColor = { color: '#3399ff' }
  }
  else if (due.getDate() === today.getDate() && due.getMonth() === today.getMonth() && due.getFullYear === today.getFullYear) {
    dueColor = { color: '#ff1a1a' }
  }

  return (
    <Card elevation={3} style={{ borderRadius: "10px", padding: "3px", ...cardclr }} >
      <CardContent>
        <div>
          <span style={dueColor}>
            <ScheduleIcon fontSize="small" className="due-icon" /> {props.dueDate}
          </span>
          <span style={{ float: 'right' }}>
            {props.postType}
          </span>
        </div>
        <h2>
          {props.title}
        </h2>
        <div>
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
