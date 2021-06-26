import React, { useEffect,useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import FlightLandIcon from "@material-ui/icons/FlightLand";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import instance from './axios'


function App() {
  const [departureDate, setDepartureDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [sourceCity, setSourceCity] = useState("");
  const [DestinationCity, setDestinationCity] = useState("");
  const [Stops, setStops] = useState("");

  const [airline, setAirline] = useState("");
  const [allDetails, setAllDetails] = useState(null);
  
  useEffect(() => {
    
    async function fetchData() {
      const requests = await instance.get('getAllDetails');
      console.log(requests)
      setAllDetails(
        requests.data)
      return requests;
    }
    fetchData();
  }, []);
  const submit = ()=>{
    console.log()
    async function fetchData() {
      const requests = await instance.post('predictPrice',{'DepartureDate':departureDate,'ArrivalDate':arrivalDate,'Airline':airline,'SourceCity':sourceCity,'DestinationCity':DestinationCity,'Stops':Stops});
      console.log(requests)
      setAllDetails(
        requests.data)
      return requests;
    }
    fetchData();
    

  }
  const handleChange = (item,event) => {
    if (item=='stops')
    setStops(event.target.value);
    
    if (item=='destination')
    setDestinationCity(event.target.value);
    if (item=='source')
    setSourceCity(event.target.value);
    if (item=='airline')
    setAirline(event.target.value);
    
    if (item=='arrivalDate')
    setArrivalDate(event.target.value);
    if (item=='departureDate')
    setDepartureDate(event.target.value)
    
  };
  return (
    <div className="App">
      <div className="flight-header">
        <FlightLandIcon className="flight-icon" />{" "}
        <div>Flight Price Predictor</div>
      </div>
      <form  className="form-container">
        <div className="fields-container">
          <TextField
            className="input-field"
            required
            style={{
              width: window.innerWidth < 376 ? window.innerWidth - 30 : 250,
            }}
            id="datetime-local"
            label="Departure Date"
            type="datetime-local"
            fullWidth={window.innerWidth < 376}
            
            value={departureDate}
            onChange={(event) => handleChange('departureDate',event)}
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            className="input-field"
            required
            style={{
              width: window.innerWidth < 376 ? window.innerWidth - 30 : 250,
            }}
            id="datetime-local"
            label="Arrival Date"
            type="datetime-local"
            fullWidth={window.innerWidth < 376}
            
            value={arrivalDate}
            onChange={(event) => handleChange('arrivalDate',event)}
            // className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormControl required className="input-field">
            <InputLabel id="demo-simple-select-label">Airline</InputLabel>
            <Select
              style={{
                width: window.innerWidth < 376 ? window.innerWidth - 30 : 250,
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={airline}
              onChange={(event) => handleChange('airline',event)}
            >
              {allDetails && allDetails.Airline.map((item)=>(
                <MenuItem value={item.airline}>{item.airline}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="fields-container">
          <FormControl required className="input-field">
            <InputLabel id="demo-simple-select-label">Source City</InputLabel>
            <Select
              style={{
                width: window.innerWidth < 376 ? window.innerWidth - 30 : 250,
              }}
              labelId="demo-simple-select-label"
              fullWidth={window.innerWidth < 376}
              id="demo-simple-select"
              value={sourceCity}
              onChange={(event) => handleChange('source',event)}
            >
              {allDetails && allDetails.SourceCity.map((item)=>(
              <MenuItem value={item.source}>{item.source}</MenuItem>
            ))}

            </Select>
          </FormControl>
          <FormControl required className="input-field">
            <InputLabel id="demo-simple-select-label">
              Destination City
            </InputLabel>
            <Select
              style={{
                width: window.innerWidth < 376 ? window.innerWidth - 30 : 250,
              }}
              labelId="demo-simple-select-label"
              fullWidth={window.innerWidth < 376}
              id="demo-simple-select"
              value={DestinationCity}
              onChange={(event) => handleChange('destination',event)}
            >{allDetails && allDetails.DestinationCity.map((item)=>(
              <MenuItem value={item.destination}>{item.destination}</MenuItem>
            ))}
            </Select>
          </FormControl>
          <FormControl required className="input-field">
            <InputLabel id="demo-simple-select-label">Stops</InputLabel>
            <Select
              style={{
                width: window.innerWidth < 376 ? window.innerWidth - 30 : 250,
              }}
              labelId="demo-simple-select-label"
              fullWidth={window.innerWidth < 376}
              id="demo-simple-select"
              value={Stops}
              onChange={(event) => handleChange('stops',event)}
            >{allDetails && allDetails.Stops.map((item)=>(
              <MenuItem value={item.stop}>{item.stop}</MenuItem>
            ))}

            </Select>
          </FormControl>
        </div>
        <div className="submit-button">
          <Button  variant="contained" color="primary"  onClick={submit} >
            submit
          </Button>
        </div>
      </form>

      <div className="footer">Designed by Sai Ajay</div>
    </div>
  );
}

export default App;
