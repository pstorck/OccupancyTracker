import React, { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';
import ProgressBar from "react-customizable-progressbar";
import axios  from 'axios'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './App.scss';

function createNewBuilding(address, phonenumber, hours, maxoccupancy, curroccupancy, name) {
  const dataBody = {address: address, phonenumber: phonenumber, hours: hours, maxoccupancy: maxoccupancy, curroccupancy: curroccupancy, name: name}
  axios.post('http://localhost:3000/api/buildings' , dataBody);
}

function updateProgressColor(occupants) {
  if (occupants <= 70) return '#aed136';
  else return 'red';
}

function createTriggerElement(name, occupants) {
  return (
    <div class="trigger">
      <p class="vertically-center building-name">{name}</p>
      <ProgressBar 
        class="progress-bar" 
        progress={occupants} 
        radius={50}
        strokeColor={updateProgressColor(occupants)}
        strokeWidth={15}
        strokeLinecap="butt"
        trackStrokeLinecap="butt"
        trackStrokeWidth={10}
      >
        <div className="indicator">
          <div>{occupants}%</div>
        </div>
      </ProgressBar>
      <FontAwesomeIcon class="vertically-center chevron-down" icon={faChevronDown} />
    </div>
  )
}

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [buildings, setBuildings] = useState();

  useEffect(() => {
    axios.get('http://localhost:3000/api/buildings').then(response => {
      setBuildings(response.data);
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  //const buildings = getAllBuildings();// [{name: "Parker Storck's Rec Center for Swole Folks", id: 1}, {name: "Admin Building", id: 2}, {name: "Dining Hall", id: 3}]
  buildings.forEach(building => {building.percentOccupied = 100*building.curroccupancy/building.maxoccupancy;})

  return (
    <div id="list-body">
      <ul id="list-body-ul">
      {
        buildings.map((building) => (
          <li id="list-body-li" key={building.id}>
              <Collapsible trigger={createTriggerElement(building.name, building.percentOccupied)}>
              <div class="all-info-container">
                <div class="building-info">
                  <p>
                    This is a building. You can do these activities here. Enjoy your time at the building. Now I am adding 
                    extra sentences to see how a longer description looks in the app. I don't know any of that Latin filler
                    text so this will have to do.
                  </p>
                  <ul>
                    <li>Address: {building.address}</li>
                    <li>Hours: 
                      <ul>
                        {building.hours.split('\n').map(function(item, key) {
                                  return (
                                    <li key={key}>
                                      {item}
                                      <br/>
                                    </li>
                                  )
                            })}
                      </ul>
                    </li>
                    <li>Phone Number: {building.phonenumber}</li>
                    <li>Max Occupancy: {building.maxoccupancy}</li>
                    <li>Current Occupancy: {building.curroccupancy}</li>
                  </ul>
                </div>
                <div class="event-list-container">
                  <p>Upcoming Events</p>
                  <ul class="events-list">
                    <li></li>
                  </ul>
                </div>
              </div>
            </Collapsible>
            <div id="li-spacer"></div>
          </li>
        ))
      }
      </ul>
    </div>
  );
};

export default App;
