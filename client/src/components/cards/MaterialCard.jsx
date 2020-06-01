import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Zoom from '@material-ui/core/Zoom';
import Typography from '@material-ui/core/Typography';

import QuickDownloadButton from './QuickDownloadButton';
import ShowDetails from "../dialogs/details/MaterialDetails";

function MaterialCard(props) {
  return (
    <Zoom
      in={true}
      style={{ transformOrigin: '0 50 0' }}
      {...(true ? { timeout: 500 } : {})}
    >
      <Card elevation={3} style={{
        borderRadius: "10px", padding: "3px"
      }}>
        <CardContent>
          <div style={{ paddingBottom: '3px' }}>
            <Typography gutterBottom variant="body2" component="span">
              {props.subName}
            </Typography>
            <Typography gutterBottom variant="body2" component="span" style={{ float: 'right' }}>
              {props.materialType}
            </Typography>
          </div>
          <Typography gutterBottom variant="h5" component="h3">
            {props.title}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: 'space-between' }} >
          <ShowDetails data={props} />
          <QuickDownloadButton fileArray={props.url} />
        </CardActions>
      </Card >
    </Zoom>
  );
}

export default MaterialCard;
