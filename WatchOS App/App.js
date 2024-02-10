import React, { useState, useEffect,Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, Image, NativeModules, NativeEventEmitter} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

const FlagEvents= new NativeEventEmitter(NativeModules.RNEventEmitter);


export default function App() {
  const [circleColor, setCircleColor] = useState('white');
  const [player1, setPlayer1] = useState({ name: 'Novak Djokovic', profilePic: require('./novak.jpg') });
  const [player2, setPlayer2] = useState({ name: 'Roger Federer', profilePic: require('./federer.jpg') });
  const [displayPlayer, setDisplayPlayer] = useState(null);
  const [profilePicBase64, setProfilePicBase64] = useState('nopic'); // Default value is 'nopic'

//the image need to be in size 500x500
  const convert = () => {
    ReactNativeBlobUtil.fetch(
      'GET',
      'https://images.augustman.com/wp-content/uploads/sites/2/2023/07/14132108/360080030_18375613075053164_2178571424194143586_n-1-500x500.jpeg',
    )
      .then(res => {
        let status = res.info().status;

        if (status === 200) {
          let base64Str = res.base64();
          setProfilePicBase64(base64Str); // Set the base64 string to the state
          //console.log(base64Str);
        } else {
          // handle other status codes
        }
      })
      // Something went wrong:
      .catch(err => {
        // error handling
        console.log(err);
      });
  };

  useEffect(() => {
    // Call the convert function when the component mounts
    convert();
  }, []);

useEffect(()=>{
  FlagEvents.addListener('onSent', result =>{
  console.log('gotaaa meseggeee!!!!!!', result);
  try {
    NativeModules.RNServeup.findEvents(resp => {
      alert(resp);
    });
    console.log("MekabelMeXcode");
  } catch (error) {
    console.error('Error in handleMekabelMeXcode:', error);
  }

});
  return()=>{
    FlagEvents.removeAllListeners();
  };
},[]);


  const handleOpponentScore = () => {
    NativeModules.RNServeup.addEvent('inc','score');
    console.log("inc opponent score");
  };

  const handleMekabelMeXcode = () => {
    try {
      NativeModules.RNServeup.findEvents(resp => {
        alert(resp);
      });
      console.log("MekabelMeXcode");
      setDisplayPlayer(null);
    } catch (error) {
      console.error('Error in handleMekabelMeXcode:', error);
    }
  };
  

  const handleOpponentDetails = () => {
    NativeModules.RNServeup.addEvent(player1.name,profilePicBase64);
    console.log("inserted opponent details");
    setDisplayPlayer(player1);
    setTimeout(() => {
      setDisplayPlayer(null);
    }, 1000);
  };

  const handleStartNewOperation = () => {
    NativeModules.RNServeup.addEvent('new','operation');
    console.log("Start New Operation pressed");
  };

  const handleCirclePress = () => {
    console.log("Circle pressed");
    setCircleColor('green');
    setTimeout(() => {
      setCircleColor('white');
    }, 1000);
  };

  useEffect(() => {
    if (displayPlayer) {
      setTimeout(() => {
        setDisplayPlayer(null);
      }, 1000);
    }
  }, [displayPlayer]);

  return (
    <View style={styles.container}>
      <Text>Open up App.js on your app!</Text>

      <TouchableOpacity style={styles.startNewOperationButton} onPress={handleStartNewOperation}>
      <Text>Start New Operation</Text>
    </TouchableOpacity>

      <TouchableOpacity style={[styles.circle, { backgroundColor: circleColor }]} onPress={handleCirclePress} />

      <TouchableOpacity style={styles.button} onPress={handleMekabelMeXcode}>
        <Text>MekabelMeXcode</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleOpponentScore}>
        <Text>inc opponent score</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleOpponentDetails}>
        <Text>insert opponent details</Text>
      </TouchableOpacity>


      {displayPlayer && (
        <View style={styles.playerDetails}>
          <Image source={displayPlayer.profilePic} style={styles.profilePic} />
          <Text>{displayPlayer.name}</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'black',
  },
  playerDetails: {
    alignItems: 'center',
    marginTop: 20,
  },
  startNewOperationButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
});