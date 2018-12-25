import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import codePush from "react-native-code-push";
let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      latitude: null,
      longitude: null,
      error: null
    }
  }

  componentDidMount() {
    navigator.geolocation.watchPosition((position) => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null
      })
    },
    (error) => this.setState({ error: error.message }),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
    )
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.introText}>My GPS Coordinates</Text>
          <Text style={styles.coordText}>Latitude: {this.state.latitude}</Text>
          <Text style={styles.coordText}>Longitude: {this.state.longitude}</Text>
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        </View>
      </View>
    );
  }
}

export default codePush(codePushOptions)(App)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  introText: {
    fontSize: 20,
    fontWeight: '700',
    padding: 10
  },
  coordText: {
    fontSize: 20,
    fontWeight: '300',
    padding: 5
  }
});
