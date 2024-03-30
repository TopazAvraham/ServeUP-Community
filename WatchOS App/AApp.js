import React, { useState, useEffect, Component,useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Alert } from "react-native";
import { useFonts } from "expo-font";
 
import {
  StyleSheet,
  Text,
  View,
  Image,
  NativeModules,
  NativeEventEmitter,
} from "react-native";
import ReactNativeBlobUtil from "react-native-blob-util";
import socketModule from "./helpers/socketModule";

const FlagEvents = new NativeEventEmitter(NativeModules.RNEventEmitter);

export default function App() {
  const [fontsLoaded] = useFonts({
    'semiBold': require('./assets/fonts/SF-Pro-Rounded-Semibold.otf'),
  });
  const socketRef = useRef(null);
  const [circleColor, setCircleColor] = useState("#162529");
  const player1 = {
    username: "user1",
    profilePic: require("./novak.jpg"),
  };
  // const [player1, setPlayer1] = useState({
  //   username: "user1",
  //   profilePic: require("./novak.jpg"),
  // });
  const player2 = {
    username: "user2",
    profilePic: require("./federer.jpg"),
  };
  // const [player2, setPlayer2] = useState({
  //   username: "user2",
  //   profilePic: require("./federer.jpg"),
  // });
  const myPlayer = useRef(null);
  //const [myPlayer, setMyPlayer] = useState(null);
  const [token, setToken] = useState("");
  const [displayPlayer, setDisplayPlayer] = useState(null);
  const [profilePicBase64, setProfilePicBase64] = useState("nopic"); // Default value is 'nopic'
  
  const initSocket = (token) => {
    socketRef.current = socketModule.initializeSocket(token);

    socketRef.current.on("identify", (data) => {
      socketRef.current.emit("token", "bearer " + token);
      //console.log(myPlayer.current);
    });

    socketRef.current.on("requestGame", (data) => {
      Alert.alert(
        "Alert Title",
        "body",
        [
          {
            text: "OK",
            onPress: () => {
              //console.log("OK Pressed");
              //NativeModules.RNServeup.addEvent("new", "operation"); 

             //console.log(myPlayer);

              socketRef.current.emit(
                "acceptGame",
                JSON.stringify({
                  me: myPlayer.current.username,
                  opponent:
                    myPlayer.current.username === player1.username
                      ? player2.username
                      : player1.username,
                })
              );
            },
          },
        ],
        { cancelable: false }
      );
    });

    socketRef.current.on("gameCreated", (data) => {
      const dataObject = JSON.parse(data);
      //console.log("gameCreated",myPlayer.current);
      const opponent = dataObject.opponent; 

      NativeModules.RNServeup.addEvent("new", "operation");
      NativeModules.RNServeup.addEvent(opponent,profilePicBase64);
    });

    socketRef.current.on("pointReceived", (data) => {
      NativeModules.RNServeup.addEvent("inc", "score");
    });


    socketRef.current.on("playAnotherSetReceived", (data) => {
      NativeModules.RNServeup.addEvent("playAnotherSet", "Navigation");
    });
    socketRef.current.on("submitGameReceived", (data) => {
      NativeModules.RNServeup.addEvent("submitGame", "Navigation");
    });
    socketRef.current.on("viReceived", (data) => {
      NativeModules.RNServeup.addEvent("vi", "Navigation");
    });
    socketRef.current.on("pauseReceived", (data) => {
      NativeModules.RNServeup.addEvent("pause", "Navigation");
    });
    socketRef.current.on("continuePlayReceived", (data) => {
      NativeModules.RNServeup.addEvent("continuePlay", "Navigation");
    });
    
  };

  //the image need to be in size 500x500
  const convert = () => {
    ReactNativeBlobUtil.fetch(
      "GET",
      "https://images.augustman.com/wp-content/uploads/sites/2/2023/07/14132108/360080030_18375613075053164_2178571424194143586_n-1-500x500.jpeg"
    )
      .then((res) => {
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
      .catch((err) => {
        // error handling
        console.log(err);
      });
  };

  useEffect(() => {
    // Call the convert function when the component mounts
    convert();

  }, []);

  useEffect(() => {
    const onSentListener = (result) => {
      //("gotaaa meseggeee!!!!!!", result);
      try {
        NativeModules.RNServeup.findEvents((resp) => {
          if (resp === "playAnotherSet"){
            socketRef.current.emit("playAnotherSet",myPlayer.current.username);
            return;
          }
          if (resp === "submitGame"){
            socketRef.current.emit("submitGame",myPlayer.current.username);
            return;
          }
          if (resp === "vi"){
            socketRef.current.emit("vi",myPlayer.current.username);
            return;
          }
          if (resp === "pause"){
            socketRef.current.emit("pause",myPlayer.current.username);
            return;
          }
          if (resp === "continuePlay"){
            socketRef.current.emit("continuePlay",myPlayer.current.username)
            return;
          }

          if (resp==="1"){
              socketRef.current.emit("point",myPlayer.current.username);
          }else{
            socketRef.current.emit("endGame",JSON.stringify({username:myPlayer.current.username,result:resp}));
          }
        });
      } catch (error) {
        console.error("Error in handleMekabelMeXcode:", error);
      }
    };
  
    FlagEvents.addListener("onSent", onSentListener);
  
    return () => {
      FlagEvents.removeListener("onSent", onSentListener);
    };
  }, []);
 
  const handleloginuser1 = async () => {
    myPlayer.current = player1;
    try {
      const response = await fetch("http://localhost:3000/api/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "user1",
          password: "password1",
        }),
      });

      if (response.status === 404) {
        console.error("error");
      } else if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        setToken(token);
        //setMyPlayer(player1);
        initSocket(token);
        NativeModules.RNServeup.addEvent("new", "operation"); 
        //console.log("first New operation");
      } else {
        console.log("error2");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleloginuser2 = async () => {
    myPlayer.current = player2;
    try {
      const response = await fetch("http://localhost:3000/api/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "user2",
          password: "password2",
        }),
      });

      if (response.status === 404) {
        console.error("error");
      } else if (response.status === 200) {
        const data = await response.json();
        const token = data.token;
        setToken(token);
        //setMyPlayer(player2);
        initSocket(token);
        NativeModules.RNServeup.addEvent("new", "operation"); 
        //console.log("first New operation");
      } else {
        console.log("error2");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleStartNewOperation = () => {
    socketRef.current.emit(
      "startGame",
      JSON.stringify({
        me: myPlayer.current.username,
        opponent:
          myPlayer.current.username === player1.username
            ? player2.username
            : player1.username,
      })
    );

    //console.log("Start New Operation pressed");
  };

  const handleCirclePress = () => {
    console.log("Circle pressed");
    setCircleColor("green");
    setTimeout(() => {
      setCircleColor("#162529");
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
    <View style={[styles.container, { backgroundColor: '#162529' }]}>
      <Text style={styles.headerText}>Live Game Lobby Room</Text>
  
      <View style={styles.middleContainer}>
        <View style={styles.rectangle}>
          <Image source={require("./dina.jpeg")} style={styles.profilePic} />
          <Text style={styles.playText}>Play against Dina Primo</Text>
        </View>
      </View>
  
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsText}>
          Open the app on your Apple Watch{'\n'}and press the button to invite the opponent
        </Text>
      </View>

      <TouchableOpacity
        style={styles.startNewOperationButton}
        onPress={handleStartNewOperation}
      >
        <Text style={styles.startNewOperationText}>Invite Opponent To Match</Text>
      </TouchableOpacity>
  
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: circleColor }]}
          onPress={handleCirclePress}
        />
  
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleloginuser1}>
            <Text>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleloginuser2}>
            <Text>2</Text>
          </TouchableOpacity>
        </View>
      </View>
  
     
  
      <StatusBar style="auto" />
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 32,
    color: '#D5FF45',
    fontFamily: 'semiBold',
  },
  middleContainer: {
    marginTop: 30,
  },
  rectangle: {
    marginTop: 30,
    width: 346,
    height: 208,
    backgroundColor: '#343434',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#8F8F93',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  profilePic: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
  },
  playText: {
    color: 'white',
    fontFamily: 'semiBold',
    marginTop: 25,
    fontSize: 25,

  },
  startNewOperationButton: {
    marginTop: 15,
    padding: 10,
    borderRadius: 16,
    width: 327,
    height: 55,
    backgroundColor: '#D5FF45',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startNewOperationText: {
    fontFamily: 'semiBold',
    fontSize: 15,
  },
  button: {
    width: 30,
    height: 30,
    marginTop: 10,
    padding: 10,
    backgroundColor: "#162529",
    borderRadius: 5,
    fontFamily: 'semiBold',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: "#162529",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "black",
  },
  instructionsContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  instructionsText: {
    marginTop: 30,
    color: '#8F8F93',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'semiBold',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});