import React from "react";
import Button from '@material-ui/core/Button';

function SubmitButton(props) {
    if (props.done) {
        return <Button style={{ width: "100%" }} type="submit" size="small" variant="contained" color="primary">Submit</Button>
    }
    else {
        return <Button style={{ width: "100%" }} disabled type="submit" size="small" variant="contained" color="primary">Submit</Button>
    }
}

export default SubmitButton;
