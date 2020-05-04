import React from "react";
import Button from '@material-ui/core/Button';

function button(props)
{
    if(props.done)
    {
        return <Button className="submit" type="submit" size="small"  variant="contained" color="primary">Submit</Button>
    }
    else{
       return <Button className="submit" disabled  type="submit" size="small"  variant="contained" color="primary">Submit</Button>
    }
}



export default button;