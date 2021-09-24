import React, { Fragment } from 'react';

import Avatar from 'react-avatar';

import Table from "../components/table";

// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
// import AddIcon from '@material-ui/icons/Add';
// import EditIcon from '@material-ui/icons/Edit';
// import NavigationIcon from '@material-ui/icons/Navigation';
// import FavoriteIcon from '@material-ui/icons/FavoriteTwoTone';

import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import TextField from '@material-ui/core/TextField'
// import { DataGrid } from '@material-ui/data-grid';
// import Fab from '@material-ui/core/Fab'

function CheckboxExample() {
    const [checked, setChecked] = React.useState(true)
    return (
      <div>
        <FormControlLabel 
          control={
            <Checkbox 
              checked={checked}
              icon={<DeleteIcon />}
              checkedIcon={<SaveIcon />}
              onChange={(e)=>{setChecked(e.target.checked)}}
              color="primary"
              inputProps={{
                'aria-label' : 'secondary checkbox'
              }}
            />
          }
          label="The box"
        />
      </div>
    )
  }

  function dummyCustomers()  {
    return [
      { id:1, col1: 'Scott', col2: 'Sloane'}
    ]
  }

const Customers = () => (
    <Fragment>
      <div className="App">
          <h1>Customer Management</h1>
          <Table 
            endpoint="customer"
            columns={[
              {title: "id", field: "id", hidden: true},
              {title: "Avatar", render: rowData => <Avatar maxInitials={1} size={40} round={true} name={rowData === undefined ? " " : rowData.firstName} />  },
              {title: "First name", field: "firstName"},
              {title: "Last name", field: "lastName"},
              {title: "email", field: "email"}
            ]}
          />
          
    </div>
    </Fragment>
);

export default Customers;