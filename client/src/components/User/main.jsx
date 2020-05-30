import React from "react";
import Grid from "@material-ui/core/Grid";
import ChangePassword from "./ChangePassword";
import BannerRenderer from "./BannerRenderer";
import DeleteAccount from "./DeleteAccount";
import NavigationBar from "../navigation/AppBar";
import { Container } from "@material-ui/core";

export default function Main() {

  return (
    <>
      <NavigationBar title="Profile" />
      <Container>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <BannerRenderer />
          </Grid>
          <Grid item xs={12} md={4} sm={6} >
            <ChangePassword />
          </Grid>
          <Grid item xs={12} md={4} sm={6}>
            <DeleteAccount />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
