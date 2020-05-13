import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import ShowDetails from "../dialogs/details/MaterialDetails";

function MaterialCard(props) {
  return (
    <Card elevation={3} style={{ margin: "15px", borderRadius: "10px", padding: "3px" }}>
      <CardContent>
        <div className="top">
          <span className="due-date">
            {props.subName}
          </span>
          <span className="post-type">
            {props.materialType}
          </span>
        </div>
        <h2 className="post-title">
          {props.title}
        </h2>
      </CardContent>
      <CardActions>
        <ShowDetails data={props} />
        <Button color="primary" onClick={() => {
          window.open(props.url, "_blank");
        }}>
          Download
        </Button>
      </CardActions>
    </Card >
  );
}

export default MaterialCard;
