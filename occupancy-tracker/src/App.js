import React from 'react';
import Collapsible from 'react-collapsible';
import ProgressBar from "react-customizable-progressbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './App.scss';

function updateProgressColor(occupants) {
  if (occupants <= 70) return '#aed136';
  else return 'red';
}

function createTriggerElement(name, occupants) {
  return (
    <div class="trigger">
      <p class="vertically-center">{name}</p>
      <ProgressBar 
        class="progress-bar" 
        progress={occupants} 
        radius={50}
        strokeColor={updateProgressColor(occupants)}
        strokeWidth={20}
        strokeLinecap="butt"
        trackStrokeLinecap="butt"
        trackStrokeWidth={10}
        // cut={180}
        // rotate={-180}
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
  const buildings = [{name: "Rec Center", id: 1}, {name: "Admin Building", id: 2}, {name: "Dining Hall", id: 3}]
  buildings.forEach(building => {building.occupants = Math.floor(Math.random() * 100);})
  return (
    <div id="list-body">
      <ul id="list-body-ul">
      {
        buildings.map((building) => (
          <li id="list-body-li" key={building.id}>
              <Collapsible trigger={createTriggerElement(building.name, building.occupants)}>  
                <p>This is a building. You can do these activities here. Enjoy your time at the builidng!</p>
                <ul class="building-info">
                  <li>Address:</li>
                  <li>Hours:</li>
                  <li>Amenities:</li>
                  <li>Capacity:</li>
                </ul>
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
