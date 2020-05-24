import React from "react";
import Grid from "@material-ui/core/Grid";
import ChangePassword from "./ChangePassword";
import Card from "./card";
import DeleteAccouut from "./DeleteAccount";
import NavigationBar from "../navigation/AppBar";

export default function Main() {
  
  return (
    <>
      <NavigationBar title="Profile" />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        <Grid item xs={12} sm={4}>
          <Card />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ChangePassword />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DeleteAccouut />
        </Grid>
      </Grid>
    </>
  );
}
