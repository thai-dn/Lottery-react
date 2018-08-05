import React, { Component } from 'react';
import './App.css';

import web from './web3';
import lottery from './lottery';
import web3 from './web3'

class App extends Component {

state={
  manager:'',
  players:[],
  balance:'',
  value:'',
  message:''
}

async componentDidMount(){
  const manager   = await lottery.methods.manager().call();
  const players   = await lottery.methods.getPlayers().call();
  const balance   = await web3.eth.getBalance(lottery.options.address);

  this.setState({
    manager,
    players,
    balance
  });
}


onSubmit = async event =>{
  event. preventDefault();

  const accounts = await web3.eth.getAccounts();

  this.setState({
    message:"Please wait for the transaction go throughout..."
  });

  await lottery.methods.enter().send({
    from: accounts[0],
    value: web3.utils.toMei(this.state.value,'ether')
  });

  this.setState({
    message:"You have been entered!"
  }); 
}


render() {
    return (
<div>
    <h2>  lottery Contract</h2>
    <p>
    This Contract is managed by {this.state.manager}.
    There are currently {this.state.players.length} people.
    competing to win {web.utils.fromMei(this.state.balance)} ether!
    </p>

<hr/>

  <form onSubmit={this.onSubmit}>
    <h4>Want to try your lucky?</h4>
    <div>
      <label> Acount of ether to enter:</label>
      <input value ={ this.state.value } onchange={ event => this.setState({ value:event.target.value })} />
      <button> Enter </button>

    </div>

  </form>

  <hr/>
  
  <h2>{ this.state.message }</h2>
</div>
    );
  }
}

export default App;
