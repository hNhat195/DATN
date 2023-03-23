import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const CreateButton = () => {
    const history = useHistory();

    const handleClick = () => {
        history.push("/order/create");
    }
    return (
        <div>
            <Button variant="contained" color="success" onClick={handleClick}>
                Create Order
            </Button>
        </div>
    );
}

export default CreateButton;