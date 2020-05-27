import React from "react";
import Grid from "@material-ui/core/Grid";
import ChangePassword from "./ChangePassword";
import Card from "./card";
import DeleteAccount from "./DeleteAccount";
import NavigationBar from "../navigation/AppBar";
import { Container } from "@material-ui/core";

export default function Main() {

  return (
    <>
      <NavigationBar title="Profile" />
      <NavigationBar title="Profile" />
      <Grid
        container fluid
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item md={10} lg={8}>
          <Card />
        </Grid>
        <Grid item xs={12} md={4} sm={6} >
          <ChangePassword />
        </Grid>
        <Grid item xs={12} md={4} sm={6}>
          <DeleteAccount />
        </Grid>
      </Grid>
    </>
  );
}
