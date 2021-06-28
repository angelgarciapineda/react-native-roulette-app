import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Roulette from 'react-native-casino-roulette';
import marker from './images/marker.png';

//Roulette numbers
const numbers = []
const slots = 16
numbers.length = slots;

var min = 1;
var max = 100;

for (var i = 0; i < numbers.length; i++) {
  numbers[i] = (Math.random() * (max - min) + min).toFixed(2)
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const options = numbers.map((o) => ({ index: o }))
const customOptions = numbers.map((o) => (
  <Text index={o}>{o}</Text>
));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.onRotate = this.onRotate.bind(this);
    this.onRotateChange = this.onRotateChange.bind(this);
    this.onRotateCustom = this.onRotateCustom.bind(this);
    this.onRotateCustomChange = this.onRotateCustomChange.bind(this);
    this.state = {
      option: "Option selected:",
      optionCustom: "Option selected:",
      rouletteState: 'stop',
      rouletteCustomState: 'stop'
    }
  }
  render() {
    const { option, rouletteState, optionCustom, rouletteCustomState } = this.state
    return (
      <View style={{ alignItems: "center", marginTop: 250 }}>

        <Roulette
          enableUserRotate={rouletteCustomState == 'stop'}
          background={null}
          onRotate={this.onRotateCustom}
          onRotateChange={this.onRotateCustomChange}
          marker={marker}
          options={customOptions}
          rotateEachElement={(index) => ((index * 360 / options.length * -1) - 90)}
          markerWidth={40}
          markerTop={-10}>

        </Roulette>

        <Text>
          {`Option selected: ${optionCustom}`}
        </Text>

        <Text>
          {`Roulette state: ${rouletteCustomState}`}
        </Text>

      </View>
    );
  }

  onRotateChange(state) {
    this.setState({
      rouletteState: state
    })
  }

  onRotate(option) {

    this.setState({
      option: option.index
    })
  }

  onRotateCustomChange(state) {
    this.setState({
      rouletteCustomState: state
    })
  }

  onRotateCustom(option) {

    this.setState({
      optionCustom: option.props.index
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});