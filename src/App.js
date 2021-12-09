import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from './web3';
import lottery from "./lottery";

class App extends React.Component {

  state = {
    manager: '',
    players: [],
    balance: '',
    value: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  render() {

    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager} <br />
          Number of competing players: {this.state.players.length} <br />
          Lottery Balance: {web3.utils.fromWei(this.state.balance, 'ether')} ether
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>Wanna give it a shot?</h4>
          <div>
            <label>Amount of ether to enter: </label>
            <input
              value = {this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
      </div>
    );
  }
}
export default App;
