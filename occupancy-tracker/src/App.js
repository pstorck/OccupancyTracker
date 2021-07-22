import React from 'react';
import Collapsible from 'react-collapsible';
import ProgressBar from "@ramonak/react-progress-bar";
import './App.css';

function updateProgressColor(occupants) {
  if (occupants <= 50) return 'green';
  if (occupants <= 75) return '#CCCC00';
  else return 'red';
}

function createTriggerElement(name, occupants) {
  return (
    <div class="container">
      <p>{name}</p>
      <ProgressBar bgColor={updateProgressColor(occupants)} class="progress-bar" completed={occupants} />
    </div>
  )
}

const App = () => {
  const buildings = [{name: "Rec Center"}, {name: "Admin Buiding"}, {name: "Dining Hall"}]
  buildings.forEach(building => {building.occupants = Math.floor(Math.random() * 100);})
  return (
    <div id="list-body">
    <ul id="list-body-ul">
      {
      buildings.map(building => (
        <li id="list-body-li">
            <Collapsible trigger={createTriggerElement(building.name, building.occupants)}>  
            <p>This is a building. You can do these activities here. Enjoy your time at the builidng!</p>
            <ul class="building-info">
              <li>Address:</li>
              <li>Hours:</li>
              <li>Amenities:</li>
              <li>Capacity:</li>
            </ul>
          </Collapsible>
        </li>
      ))
      }
    </ul>
    </div>
  );
};

export default App;
