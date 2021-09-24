import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import SaveIcon from '@material-ui/icons/Save';
// import DeleteIcon from '@material-ui/icons/Delete';

// import Checkbox from '@material-ui/core/Checkbox';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import TextField from '@material-ui/core/TextField'

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TextField
          variant="outlined"
          color="secondary"
          type="date"
        />
        <CheckboxExample />
        <ButtonGroup variant="contained" size="large">
          <Button 
          startIcon={<SaveIcon />} 
          size="large"
          
          color="primary">
            Save
          </Button>
          <Button 
          endIcon={<DeleteIcon />} 
          color="secondary">
            Discard
          </Button>
        </ButtonGroup>
        
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
