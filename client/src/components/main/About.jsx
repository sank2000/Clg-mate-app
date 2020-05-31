import React from "react";

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import FlexContainer from "../containers/FlexContainer";
import Copyright from './CopyrightNote';
import { shuffledDevs } from '../../constants/devs';
import Dev from '../cards/DeveloperCard';
import NavigationBar from '../navigation/AppBar';


const useStyles = makeStyles((theme) => ({
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  attribution: {
    padding: theme.spacing(2)
  }
}));

function renderDevs(dev) {
  return (
    <Grid item xs={12} sm={12} md={4} lg={4}
      style={{ textAlign: 'center' }}
      key={dev._id}
    >
      <Grid container justify="center">
        <Dev dev={dev} />
      </Grid>
    </Grid>
  );
}

function renderTechStack(tech) {
  return (
    <Grid item xs={6} sm={6} md={4} lg={3} key={tech.name}>
      <img src={tech.logoURL} style={{ width: '10rem', height: '10rem' }} alt={tech.name} />
      <Typography component="h5" variant="h5">
        {tech.name}
      </Typography>
    </Grid>
  );
}

const techStack = [
  {
    logoURL: 'https://www.vectorlogo.zone/logos/mongodb/mongodb-icon.svg',
    name: 'Mongo DB'
  },
  {
    logoURL: 'https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg',
    name: 'Express JS'
  },
  {
    logoURL: 'https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg',
    name: 'React JS'
  },
  {
    logoURL: 'https://www.vectorlogo.zone/logos/nodejs/nodejs-icon.svg',
    name: 'Node JS'
  }
]

const attribution = [
  {
    name: "Material UI",
    alt: "material ui",
    url: "https://material-ui.com/static/logo_raw.svg"
  },
  {
    name: "Flat Icons",
    alt: "flat icons",
    url: "https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_5a5ce9469cd708a59b4dda07a7f06399/flaticon.jpg"
  },
  {
    name: "Icons 8",
    alt: "icons 8",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Icons8_logo.svg/1200px-Icons8_logo.svg.png"
  },
  {
    name: "Stack Overflow",
    alt: "stack overflow",
    url: "https://cdn3.iconfinder.com/data/icons/inficons/512/stackoverflow.png"
  },
  {
    name: "React Bootstrap",
    alt: "react bootstrap",
    url: "https://banner2.cleanpng.com/20180531/sas/kisspng-bootstrap-react-software-framework-javascript-fron-5b0f9b1ab26fd7.9058729715277494027309.jpg"
  },
  {
    name: "Material UI",
    alt: "material ui",
    url: "https://material-ui.com/static/logo_raw.svg"
  }
]

export default function About() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <NavigationBar title='About' />
      <CssBaseline />
      <FlexContainer withAppBar >
        <img
          src={"./images/logo.png"}
          alt="Logo"
        />
        <Typography align="center" component="h3" variant="h3">
          Collegemate
        </Typography>
        <Typography align="center" component="h5" variant="subtitle1">
          Version 0.7 B
        </Typography>
      </FlexContainer>
      <FlexContainer height='40vh'  >
        <Typography align="center" component="div" variant="h6" style={{ padding: '40px' }}>
          Collegemate is a web application built specially for a flawless
          sharing of materials and remainders between students and staff
          members without having to share personal contact credentials. This
          helps students to greatly manage their schedule and the work they
          have. This is not yet another Google Classroom. Unlike any other
          online learning platforms, this is not designed for
          #StudyFromHome. The Collegemate app is designed to work during
          days of on field education only. The app is mainly focused on
          managing all the works, assignments, home works and digital
          materials with ease, without having to manually manage stuff.
        </Typography>
      </FlexContainer>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              align="center"
              component="h4"
              variant="h4">
              Technology Stack
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} >
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              spacing={3}
              style={{ textAlign: "center" }}
            >
              {techStack.map(renderTechStack)}
            </Grid>
          </Grid>
        </Grid>
        <Grid container
          justify="space-around"
          alignItems="center"
          direction='row'
          style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography style={{ paddingTop: "1rem", paddingBottom: "1rem" }}
              align="center"
              component="h4"
              variant="h4">
              Our Team
            </Typography>
          </Grid>
          <Grid container
            direction="row"
            justify="space-evenly"
            spacing={3}
            alignItems="center"
          >
            {shuffledDevs.map(renderDevs)}
          </Grid>
          <Grid container direction="row"
            justify="space-evenly"
            spacing={3}
            alignItems="center"
            style={{ paddingTop: '1rem' }}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography
                align="center"
                component="h5"
                variant="h5">
                Our Sincere attributions to:
            </Typography>
            </Grid>
            {attribution.map((data) => {

              return (
                <Grid item xs={12} sm={6} md={3} lg={3} style={{ textAlign: 'center' }} container justify="center">
                  <Grid item>
                    <Avatar className={classes.small} alt={data.alt} variant="square" src={data.url} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.attribution} variant="overline" component="span" align="center">{data.name}</Typography>
                  </Grid>
                </Grid>
              )
            })}
          </Grid>
        </Grid>
        <Copyright />
      </Container>
    </React.Fragment >
  );
}
