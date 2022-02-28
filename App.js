import { StyleSheet, View, Button, TextInput, Alert } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { useState } from 'react';

export default function App() {

  const [address, setAddress] = useState('')
  const [cordinates, setCordinates] = useState({lat: 60.201373, lng: 24.934041})
  // key: GBaecdACCbG95K2GDMfzOYkfrB3uyGbz


  const search = () => {
    let input = address.replace(' ', ','); // Ratapihantie 13 Helsinki toimii, mutta jos jättää Helsingin pois, niin näyttää Canadaan
    fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=GBaecdACCbG95K2GDMfzOYkfrB3uyGbz&location=` + input)
    .then(response => response.json())
    .then(data => {
      console.log (data.results[0].locations[0].displayLatLng)
      setCordinates({lat: data.results[0].locations[0].displayLatLng.lat, lng: data.results[0].locations[0].displayLatLng.lng})
    })
    .catch((error) => {
      Alert.alert('Error');
    });
  }

  return (
    <View style={styles.container}>
      <MapView 
        style={{flex: 1}}
        region={{
          latitude: cordinates.lat,
          longitude: cordinates.lng,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
      <Marker 
        coordinate={{
        latitude:cordinates.lat, 
        longitude:cordinates.lng}}
       // title='Haaga-Helia' 
      />
      </MapView>
      <TextInput onChangeText = {(address)=>setAddress(address)} value = {address} >
      </TextInput>
      <Button title='Etsi' onPress={search}>      
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});