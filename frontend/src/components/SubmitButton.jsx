import React from "react";
import Button from '@material-ui/core/Button';

function SubmitButton(props) {
    if (props.done) {
        return <Button style={{ marginLeft: "7px", width: "100%", height: "3rem", fontSize: "1rem" }} type="submit" size="small" variant="contained" color="primary">Submit</Button>
    }
    else {
        return <Button style={{ marginLeft: "7px", width: "100%", height: "3rem", fontSize: "1rem" }} disabled type="submit" size="small" variant="contained" color="primary">Submit</Button>
    }
}

export default SubmitButton;
