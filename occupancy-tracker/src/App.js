import React, { useState, useEffect } from 'react';
import Collapsible from 'react-collapsible';
import ProgressBar from "react-customizable-progressbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';
import './App.scss';

function createNewBuilding(address, phonenumber, hours, maxoccupancy, curroccupancy, name) {
  const dataBody = {address: address, phonenumber: phonenumber, hours: hours, maxoccupancy: maxoccupancy, curroccupancy: curroccupancy, name: name}
  axios.post('http://localhost:3000/api/buildings' , dataBody);
}

function createNewEvent(time, date, building_id, name) {
  const dataBody = {time: time, date: date, building_id: building_id, name: name}
  axios.post('http://localhost:3000/api/events', dataBody); 
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

const App = () => (
  <Switch>
    <Route exact path='/' component={Dashboard}></Route>
    <Route exact path='/admin' component={Forms}></Route>
  </Switch>
);

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  const [buildings, setBuildings] = useState();
  const [events, setEvents] = useState();

  useEffect(() => {
    axios.get('http://localhost:3000/api/buildings').then(response => {
      setBuildings(response.data);
    });
    axios.get('http://localhost:3000/api/events').then(response => {
      setEvents(response.data);
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
                    {
                      events.filter(event => event.building_id == building.id).map((event) => (
                        <li>{event.name}</li>
                      ))
                    }
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

const Forms = () => (
  <div class="admin">
    <OccupancyForm/>
    <EventForm/>
  </div>
);

class OccupancyForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      amount: 0
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }


  handleIdChange(event) {
    this.setState({id: event.target.value});
  }

  handleAmountChange(event) {
    this.setState({amount: event.target.value})
  }

  handleSubmit(event) {
    let id = this.state.id;
    let amount = this.state.amount;
    console.log(id, amount);
    const dataBody = {amount: this.state.amount};
    axios.put("http://localhost:3000/api/buildings/" + this.state.id + '/' + this.state.amount, dataBody)
    event.preventDefault();
  }

  render() {
    return (
    <div class="admin">
      <form onSubmit={this.handleSubmit}>
        Building ID: <input type="text" value={this.state.id} onChange={this.handleIdChange}></input> 
        Occupancy: <input type="number" value={this.state.amount} onChange={this.handleAmountChange}></input> 
        <input type='submit' value='Submit'></input>
      </form>
    </div>
    )
  }
}

class EventForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      building_id: 0,
      time: 0, 
      date: 0, 
      name: 'event-name'
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBuildingIdChange = this.handleBuildingIdChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }


  handleBuildingIdChange(event) {
    this.setState({building_id: event.target.value});
  }

  handleTimeChange(event) {
    this.setState({time: event.target.value})
  }

  handleDateChange(event) {
    this.setState({date: event.target.value})
  }

  handleNameChange(event) {
    this.setState({name: event.target.value})
  }

  handleSubmit(event) {
    const dataBody = {building_id: this.state.building_id, time: this.state.time, date: this.state.date, name: this.state.name};
    axios.post("http://localhost:3000/api/events", dataBody)
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Building ID: <input type="text" value={this.state.building_id} onChange={this.handleBuildingIdChange}></input> 
          Time: <input type="text" value={this.state.time} onChange={this.handleTimeChange}></input> 
          Date: <input type="text" value={this.state.date} onChange={this.handleDateChange}></input> 
          Name: <input type="text" value={this.state.name} onChange={this.handleNameChange}></input> 
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    )
  }
}

export default App;