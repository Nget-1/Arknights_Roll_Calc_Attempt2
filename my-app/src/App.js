import logo from './logo.svg';
import React, { useState } from 'react';
import styles from './App.css';

function tenToOne(tickets) {
  return (tickets * 10);
}

function originiumToOne(originium) {
  return (originium * 180) / 600;
}

function orundumToOne(orundum) {
  return (orundum / 600);
}

function tryConvert(input, convert) {
  const inputs = parseInt(input);
  if(Number.isNaN(inputs)) {
    return '';
  }
  const output = convert(inputs);
  const rounded = Math.round(output * 1) / 1;
  return rounded.toString();
}

function addUp(originium, orundum, tens) {
  const ten = tenToOne(tens);
  const orundums = orundumToOne(orundum);
  const originiums = originiumToOne(originium);

  return ten + orundums + originiums;
}

function HookCurrencyInput() {
  const [input, setInput] = useState(() => {
    const saved = localStorage.getItem({orundum})
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });
  

}


class OrundumInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onInputChange(e.target.value);
  }

  render() {
    const orundum = this.props.orundum;

    return(

      <fieldset>
        <legend>Enter amount of held orundum</legend>
        <input value={orundum}
               onChange={this.handleChange}></input>
      </fieldset>

    );
  }
}

class OriginiumInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onInputChange(e.target.value);
  }

  render() {
    const originium = this.props.originium;

    return(
      <><fieldset>
        <legend>Enter amount of held originium</legend>
        <input value={originium}
          onChange={this.handleChange}></input>
      </fieldset>
      </>
    );
  }
}


class TensInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.onInputChange(e.target.value);
  }

  render() {
    const tens = this.props.tens;

    return(

      <fieldset>
        <legend>Enter amount of held ten-pull tickets.</legend>
        <input value={tens}
               onChange={this.handleChange}></input>
      </fieldset>

    );
  }
}

class CurrencyInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onInputChange(e.target.value);
  }

  render() {
    const input = this.props.input;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter amount of held {scale}:</legend>
        <input value={input}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}


class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.handleOriginiumChange = this.handleOriginiumChange.bind(this);
    this.handleOrundumChange = this.handleOrundumChange.bind(this);
    this.handleTensChange = this.handleTensChange.bind(this);
    this.state = {tens: '', originium: '', orundum: ''};
  }

  handleOriginiumChange(originium){
    this.setState({originium: originium});
  }

  handleOrundumChange(orundum){
    this.setState({orundum: orundum});
  }

  handleTensChange(tens){
    this.setState({tens: tens});
  }


  render(){
    const originium = this.state.originium;
    const orundum = this.state.orundum;
    const tens = this.state.tens;
    const rolls = Math.round(addUp(originium, orundum, tens) * 10)/10;
    const percentage = Math.round(rolls/3);

    return(
      <><div className="Overall-div"><div className="Left-div">


        <OrundumInput
          input={orundum}
          onInputChange={this.handleOrundumChange} />
      </div><div className="Center-div">

          <OriginiumInput
            input={originium}
            onInputChange={this.handleOriginiumChange} />
      </div><div className="Right-div">

          <TensInput
            input={tens}
            onInputChange={this.handleTensChange} />
      </div><div className="Left-div">

          <fieldset>
            <legend>Rolls</legend>
            <input value={rolls} />
          </fieldset>
      </div><div className="Center-div">

          <fieldset>
            <legend>Spark Percentage</legend>
            <input value={percentage + '%'} />
          </fieldset>
        </div></div></>
    )
  }
}


function App() {
  return (
    <div className="App">
      <h1>Hello From React</h1>
      <h2>Another Line</h2>
    </div>
  );
}

export default Calculator;
