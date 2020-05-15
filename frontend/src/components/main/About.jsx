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
          Version 0.5 B
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
          <Grid item
            lg={12}
            md={12}
            sm={12}
            style={{
              background: "#fff"
            }}
          >
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="center"
              spacing={3}
              style={{ textAlign: "center" }}
            >
              <Grid item xs={6} sm={6} md={4} lg={3}>
                <img src="https://scontent.fmaa1-2.fna.fbcdn.net/v/t1.0-9/33123337_10160340520850557_9009936063736578048_n.png?_nc_cat=1&_nc_sid=7aed08&_nc_ohc=t8-QVpNo2MMAX-xv8Z2&_nc_ht=scontent.fmaa1-2.fna&oh=55aee0657ce993c5861b03cb24d27785&oe=5EE1CC7C" style={{ width: '10rem', height: '10rem' }} alt="mongo" />
                <Typography component="h5" variant="h5">
                  Mongo DB
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={3}>
                <img src="https://expressjs.com/images/express-facebook-share.png" style={{ width: '10rem', height: '10rem' }} alt="express" />
                <Typography component="h5" variant="h5">
                  Express JS
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={3}>
                <img src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" style={{ width: '10rem', height: '10rem' }} alt="React" />
                <Typography component="h5" variant="h5">
                  React JS
                </Typography>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={3}>
                <img src="https://miro.medium.com/max/800/1*7xUxphx7WwttvlFu5gVvVw.png" style={{ width: '10rem', height: '10rem' }} alt="Node" />
                <Typography component="h5" variant="h5">
                  Node JS
                </Typography>
              </Grid>
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
        </Grid>
        <Copyright />
      </Container>
    </React.Fragment >
  );
}
