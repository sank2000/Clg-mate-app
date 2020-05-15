import React from "react";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import SignUpView from './SignUpView';
import CopyrightNote from '../main/CopyrightNote';
import FlexContainer from "../containers/FlexContainer";

function SignUp() {
  return (
    <FlexContainer>
      <Container component="main" spacing={2} maxWidth="xs">
        <LockOutlinedIcon
          style={{
            padding: "10px",
            background: "dodgerblue",
            borderRadius: "50%",
            color: "#fff",
            fontSize: "3rem"
          }}
        />
        <Typography style={{ margin: "10px" }} component="h1" variant="h4">
          Sign Up
            </Typography>
        <SignUpView />
      </Container>
      <Box mt={5}>
        <CopyrightNote />
      </Box>
    </FlexContainer>
  );
}

export default SignUp;
