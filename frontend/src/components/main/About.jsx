import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import NavigationBar from '../navigation/AppBar';
import FlexContainer from "../containers/FlexContainer";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <NavigationBar title='About' />
      <CssBaseline />
      <FlexContainer>
        <img
          src={"./images/logo.png"}
          alt="Logo"
        />
        <Typography align="center" component="h3" variant="h3">
          Collegemate
        </Typography>
        <Typography align="center" component="h5" variant="subtitle1">
          Verision 0.5 B
        </Typography>
      </FlexContainer>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Typography
              style={{ padding: "1rem" }}
              align="center"
              component="h4"
              variant="h4"
            >
              About Collegemate
            </Typography>
            <Typography align="center" component="div" variant="body1">
              Collegemate is a web application built specially for a flawless
              sharing of materials and remainders between students and staff
              members without having to share personal contact credentials. This
              helps students to greatly manage their schecudle and the work they
              have. This is not yet another Google Classroom. Unlike any other
              online learning playforms, this is not designed for
              #StudyFromHome. The Collegemate app is designed to work during
              days of on field education only. The app is mainly focused on
              managing all the works, assignments, home works and digital
              materials with ease, without having to manually manage stuff.
            </Typography>
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            sm={12}
            style={{
              background: "#fff"
            }}
          >
            <Typography
              style={{ padding: "1rem" }}
              align="center"
              component="h4"
              variant="h4"
            >
              Technology Stack
            </Typography>
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
          <Grid container>
            <Typography style={{ padding: "1rem" }}
              align="center"
              component="h4"
              variant="h4">
              Our Team
            </Typography>
            <Grid item sm={12} md={6}>

            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
