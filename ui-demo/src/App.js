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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      userData: {},
      heartBeatActive: '',
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
        //this.triggerHeartBeat();
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
      service(`${clientHost}/user?uuid=${this.state.heartBeatActive}`, undefined, 'GET').then(data => {
        
        console.log(data)
      })
    } else {
      this.setState({
        heartBeatActive: ''
      })
    }
  }
  triggerHeartBeat = () => {
    setInterval(this.heartBeat, 1000)
  }
  renderUserData = () => {
    const userElements = []
    for (const [uuid, user] of Object.entries(this.state.userData)) {
      const { name, ssn, numTickets, violations, numFelonies } = user;
      userElements.push(
      <tr key={uuid} >
        <td>{name}</td>
        <td>{ssn}</td>
        <td>{numTickets}</td>
        <td>{violations}</td>
        <td>{numFelonies}</td>
      </tr>)
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
            {this.renderUserData()}
          </table>
        </div>
      </div>
    );
  }
}

export default App;
