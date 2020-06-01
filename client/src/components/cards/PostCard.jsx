import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Zoom from '@material-ui/core/Zoom';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Typography from '@material-ui/core/Typography';

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
    <Zoom
      in={true}
      style={{ transformOrigin: '0 50 0' }}
      {...(true ? { timeout: 500 } : {})}
    >
      <Card elevation={3} style={{ borderRadius: "10px", padding: "3px", ...cardclr }} >
        <CardContent>
          <div style={{ paddingBottom: '3px' }}>
            <Typography gutterBottom variant="body2" component="span" style={dueColor}>
              <ScheduleIcon fontSize="small" className="due-icon" /> {props.dueDate}
            </Typography>
            <Typography gutterBottom variant="body2" component="span" style={{ float: 'right' }}>
              {props.postType}
            </Typography>
          </div>
          <Typography gutterBottom variant="h5" component="h3">
            {props.title}
          </Typography>
          <Typography variant="body1" component="div">
            {props.subject}
          </Typography>
        </CardContent>
        <CardActions>
          <ViewMore data={props} />
        </CardActions>
      </Card>
    </Zoom>
  );
}

export default PostCard;
