import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      secondsRemaining: 10,
      showPokemon: false,
      intervalId: '',
    }
  }

  timer = () => {
    var intervalId = setInterval(
      () => this.tick(),
      1000
    );
    this.setState({ intervalId: intervalId })
  };

  tick = () => {
    console.log(this.state.secondsRemaining)
    if (this.state.secondsRemaining > 0) {
      this.setState({ secondsRemaining: (this.state.secondsRemaining - 1)})
    } else {
      clearInterval(this.state.intervalId)
      this.setState( {showPokemon: true} )
    }
  };

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          secondsRemaining: 10,
          showPokemon: false
        })
      })
      .catch((err) => console.log(err))
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.pokeName !== prevState.pokeName ) {
      this.timer();
    }
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'}>{this.state.secondsRemaining}</h1>
        <div className={'pokeWrap'}>
          <img className={'pokeImg'} style={this.state.showPokemon ? {filter: "brightness(100%)"} : {filter: "brightness(0%)"}} src={this.state.pokeSprite} alt="" />
          <h1 className={'pokeName'} style={this.state.showPokemon ? {display: ""} : {display: "none"}}>{this.state.pokeName}</h1>
        </div>
      </div>
    )
  }
}

export default PokeFetch;