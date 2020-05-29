import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import NavigationBar from '../navigation/AppBar';
import FlexContainer from "../containers/FlexContainer";
import Dev from '../cards/DeveloperCard';
import Copyright from './CopyrightNote';
import { shuffledDevs } from '../../constants/devs';

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

export default function About() {
  return (
    <React.Fragment>
      <NavigationBar title='About' />
      <CssBaseline />
      <FlexContainer height='90vh' >
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
          <Grid item lg={12} md={12} sm={12} style={{ background: "#fff" }}>
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
            <Grid item xs={12} sm={6} md={3} lg={3} style={{ textAlign: 'center' }}>
              <Typography variant="overline" component="span" align="center">Material UI</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} style={{ textAlign: 'center' }}>
              <Typography variant="overline" component="span" align="center">Flaticons</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} style={{ textAlign: 'center' }}>
              <Typography variant="overline" component="span" align="center">Icons 8</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} lg={3} style={{ textAlign: 'center' }}>
              <Typography variant="overline" component="span" align="center">Stack Overflow</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Copyright />
      </Container>
    </React.Fragment >
  );
}
