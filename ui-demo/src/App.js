import React, { Component } from 'react';
import './App.css';

//rush because its late and just for poc
function postData(url = ``, data = {}) {
    return fetch(url, {
        method: "POST",
        mode: "cors", 
        cache: "no-cache", 
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}

const clientHost = 'http://localhost:3001';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      userData: {},
      heartBeatActive: false,
    }
  }
  initiateGetData = () => {
    postData(`${clientHost}/user`, { name: this.state.inputValue })
    .then(function(data) {
      console.log(data);
    });
  }
  onInputChange = (e) => {
    this.setState({
      inputValue: e.target.value
    })
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
  heartBeat = () => {
    if (this.state.heartBeatActive) {
      fetch(`${clientHost}/user`).then(res => {
        const data = res.json()
        console.log(data)
      })
    }
  }
  triggerHeartBeat = () => {
    
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
