import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LanguageIcon from '@material-ui/icons/Language';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "100%"
  }
});

function DeveloperCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea disabled={true}	>
        <CardMedia
          className={classes.media}
          image={props.dev.avatar}
        />
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.dev.name}
          </Typography>
          <Typography
            gutterBottom
            variant="overline"
            color="textSecondary"
            component="h5"
          >
            {props.dev.role}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.dev.note}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions >
        <Grid container justify='center'>
          <IconButton href={props.dev.social.github} aria-label="github">
            <GitHubIcon />
          </IconButton>
          {
            props.dev.choices.includes('twitter') ?
              <IconButton href={props.dev.social.twitter} aria-label="twitter">
                <TwitterIcon />
              </IconButton> :
              <IconButton href={props.dev.social.instagram} aria-label="instagram">
                <InstagramIcon />
              </IconButton>
          }
          <IconButton href={`mailto:${props.dev.email}`} aria-label="mail">
            <MailOutlineIcon />
          </IconButton>
          <IconButton href={props.dev.website} aria-label="mail">
            <LanguageIcon />
          </IconButton>
        </Grid>
      </CardActions>
    </Card>
  );
}

export default DeveloperCard;
