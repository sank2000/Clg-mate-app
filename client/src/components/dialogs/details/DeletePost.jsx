import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';


export default (props) =>
{ 
    function handleClick()
    {
         console.log(props);
    }

    return  (<IconButton color="secondary" onClick={handleClick}>
              <DeleteIcon />
            </IconButton>);
}