import React from 'react';
import Collapsible from 'react-collapsible';
import ProgressBar from "react-customizable-progressbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Switch, Route } from 'react-router-dom';
import './App.scss';

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

const App = () => (
  <div className="app">
    <Main/>
  </div>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Dashboard}></Route>
    <Route exact path='/admin' component={Admin}></Route>
  </Switch>
);

const Dashboard = () => {
  const buildings = [{name: "Parker Storck's Rec Center for Swole Folks", id: 1}, {name: "Admin Building", id: 2}, {name: "Dining Hall", id: 3}]
  buildings.forEach(building => {building.occupants = Math.floor(Math.random() * 100);})
  return (
    <div id="list-body">
      <ul id="list-body-ul">
      {
        buildings.map((building) => (
          <li id="list-body-li" key={building.id}>
              <Collapsible trigger={createTriggerElement(building.name, building.occupants)}>
              <div class="all-info-container">
                <div class="building-info">
                  <p>
                    This is a building. You can do these activities here. Enjoy your time at the building. Now I am adding 
                    extra sentences to see how a longer description looks in the app. I don't know any of that Latin filler
                    text so this will have to do.
                  </p>
                  <ul>
                    <li>Address:</li>
                    <li>Hours:</li>
                    <li>Amenities:</li>
                    <li>Capacity:</li>
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

const Admin = () => {
  console.log("Admin hit");
  return (
    <div class="admin">
      <p>Hello</p>
    </div>
  );
}


export default App;
