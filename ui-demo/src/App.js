import React, { Component } from 'react';
import './App.css';

//rush because its late and just for poc
function service(url = ``, data, type) {
    const fetchOptions = {
      method: type,
      mode: "cors", 
      cache: "no-cache", 
      credentials: "same-origin",
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      redirect: "follow",
      referrer: "no-referrer",
    }
    if (data) fetchOptions.body = JSON.stringify(data);
    return fetch(url, fetchOptions)
    .then(response => response.json());
}

const clientHost = 'http://localhost:3001';

const tableheadNames = { 
  name: 'Name', 
  ssn: 'SSN', 
  numTickets: 'Number of Tickets', 
  violations: 'Violations', 
  numFelonies: 'Number Of Felonies' }

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      userData: {},
      heartBeatActive: '',//uuid is stored here to know if we should be pinging
      heartBeatStart: 0,
    }
  }
  initiateGetData = () => {
    service(`${clientHost}/user`, { name: this.state.inputValue }, 'POST')
    .then((data) => {
      if (data.data) {
        //heartbeat for this user
        this.setState({
          heartBeatActive: data.data.uuid,
          heartBeatStart: parseInt(Date.now()/1000)
        })
        this.triggerHeartBeat();
      }
    });
  }
  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }
  heartBeat = () => {
    if (this.state.heartBeatActive && (parseInt(Date.now()/1000) - this.state.heartBeatStart < 30 )) {
      const uuid = this.state.heartBeatActive
      service(`${clientHost}/user?uuid=${uuid}`, undefined, 'GET').then(data => {
        const updatedData = data.data[uuid];
        const userDataClone = { ...this.state.userData }
        userDataClone[uuid] = updatedData//because service object will always be most up to date we can just blindly assign
        
        const stateToUpdate = { userData: userDataClone }
        if (data.isFinished) stateToUpdate.heartBeatActive = ''

        this.setState(stateToUpdate);
      })
    } else {
      this.setState({
        heartBeatActive: ''
      })
    }
  }
  triggerHeartBeat = () => {
    setInterval(this.heartBeat, 2000)
  }
  renderRow(user, key) {
    const { name, ssn, numTickets, violations, numFelonies } = user;
    return (
      <tr key={key} >
        <td>{name}</td>
        <td>{ssn}</td>
        <td>{numTickets}</td>
        <td>{violations}</td>
        <td>{numFelonies}</td>
      </tr>
      )
  }
  renderUserData = () => {
    const userElements = []
    for (const [uuid, user] of Object.entries(this.state.userData)) {
      
      userElements.push(
        this.renderRow(user, uuid)
      )
    }

    return userElements;
  }
  render() {
    return (
      <div>
        <div className="App">
          <label htmlFor='name'>User Name</label>
          <input id='name' onChange={this.onInputChange}></input>
          <button onClick={this.initiateGetData}>Submit</button>
        </div>
        <div>
          <table>
            <thead>
              {this.renderRow(tableheadNames)}
            </thead>
            <tbody>
              {this.renderUserData()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
