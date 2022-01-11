import './App.css';
import React, { useState } from 'react';
// import { GoogleMap, LoadScript } from "@react-google-maps/api"
import axios from 'axios';

function App() {

  const [position, setPosition] = useState({
    terminalId: "",
    longitude: "",
    latitude: "",
    idToGet: "",
    idToDelete: "",
    positionGotById: "",
    allPositions: ""
  });

  function updatePosition(event) {
    const newPosition = { ...position };
    newPosition[event.target.id] = event.target.value;
    setPosition(newPosition);
    console.log(newPosition);
  }

  function addPosition(event) {
    event.preventDefault();
    axios.post("http://localhost:8082/positions/position", {
      terminalId: position.terminalId,
      latitude: position.latitude,
      longitude: position.longitude
    }).then(data => {
      console.log(data.data);
    })
  }

  function onGetById(event) {
    event.preventDefault();
    axios.get(`http://localhost:8082/positions/position/${position.idToGet}`)
      .then(data => {
        console.log(data.data);
        const newPosition = { ...position };
        newPosition["positionGotById"] = data.data;
        setPosition(newPosition);
      })
  }

  function onGetAll(event) {
    event.preventDefault();
    axios.get(`http://localhost:8082/positions/positions`)
      .then(data => {
        console.log(data.data);
        const newPosition = { ...position };
        newPosition["allPositions"] = data.data;
        setPosition(newPosition);
      })
  }

  function deleteById(event) {
    axios.delete(`http://localhost:8082/positions/position/${position.idToDelete}`)
      .then(data => {
        console.log(data.data);
      })
  }

  return (
    <div className="App">
      {/* <LoadScript
        googleMapsApiKey="AIzaSyD38fO5oki-XXMSJ3Feyp7SbmHj2RiRGcI"
      >
        <GoogleMap
          defaultZoom={8}
          defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
        </GoogleMap>
      </LoadScript> */}
      <div className="container">
        <form className="post-form" onSubmit={(event) => addPosition(event)}>
          <label>
            TerminalId:
            <input id="terminalId" name="terminalId" onChange={(x) => updatePosition(x)} type="text"></input>
          </label>

          <label>
            Latitude:
            <input id="latitude" name="latitude" onChange={(x) => updatePosition(x)} type="text"></input>
          </label>

          <label>
            Longitude:
            <input id="longitude" name="longitude" onChange={(x) => updatePosition(x)} type="text"></input>
          </label>

          <input type="submit"></input>
        </form>

        <form onSubmit={(event) => onGetById(event)}>
          <label>
            Get position by id:
            <input id="idToGet" name="idToGet" onChange={(x) => updatePosition(x)} type="text"></input>
          </label>

          <label name="positionGetById">
            {JSON.stringify(position.positionGotById, null, 2)}
          </label>

          <input type="submit"></input>
        </form>

        <form onSubmit={(event) => onGetAll(event)}>
          <label>
            Get all positions:
            <input type="submit"></input>
          </label>

          <label>
            {JSON.stringify(position.allPositions, null, 2)}
          </label>
        </form>

        <form onSubmit={(event) => deleteById(event)}>
          <label>
            Delete position with id:
            <input id="idToDelete" name="idToDelete" onChange={(x) => updatePosition(x)} type="text"></input>
          </label>
          <input type="submit"></input>

        </form>
      </div>
    </div>
  );
}

export default App;
