import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    message: '',
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance })
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Entering lottery...' })

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.11', 'ether')
    });

    this.setState({ message: 'Entered into lottery!' })
  }

  pickWinner = async (e) => {
    e.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Picking a winner...' })

    await lottery.methods.pickWinner().send({ from: accounts[0] });

    this.setState({ message: 'Winner is picked!' })
  }

  render() {
    return (
      <div>
        <h2>Lottery Contract - Rinkeby</h2>
        <p>This contract is deployed and managed by {this.state.manager}.</p>
        <p>There are currently {this.state.players.length} players entered.</p>
        <p>The prize pool is currently at {web3.utils.fromWei(this.state.balance, 'ether')} ether.</p>

        <hr/>

        <form onSubmit={this.onSubmit}>
          <h4>Buy a lottery ticket:</h4>
          <div>
            <label>0.1 ETH per entry:</label>
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <button onClick={this.pickWinner}>Pick a winner!</button>

        <hr />

        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
