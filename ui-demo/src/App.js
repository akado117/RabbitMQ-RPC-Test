import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      userData: {}
    }
  }
  initiateGetData = () => {

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
  render() {
    return (
      <div>
        <div className="App">
          <label htmlFor='name'>User Name</label>
          <input id='name' onChange={this.onInputChange}></input>
          <button onClick={this.initiateGetData()}>Submit</button>
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
