import React, { useState, useEffect, Component,useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, Alert } from "react-native";
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
  const socketRef = useRef(null);
  const [circleColor, setCircleColor] = useState("white");
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
      console.log(myPlayer.current);
    });

    socketRef.current.on("requestGame", (data) => {
      Alert.alert(
        "Alert Title",
        "body",
        [
          {
            text: "OK",
            onPress: () => {
              console.log("OK Pressed");
              //NativeModules.RNServeup.addEvent("new", "operation"); 

              console.log(myPlayer);

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
      console.log("gameCreated",myPlayer.current);
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
      console.log("gotaaa meseggeee!!!!!!", result);
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
        console.log("MekabelMeXcode");
      } catch (error) {
        console.error("Error in handleMekabelMeXcode:", error);
      }
    };
  
    FlagEvents.addListener("onSent", onSentListener);
  
    return () => {
      FlagEvents.removeListener("onSent", onSentListener);
    };
  }, []);
  // useEffect(() => {
  //   FlagEvents.addListener("onSent", (result) => {
  //     console.log("gotaaa meseggeee!!!!!!", result);
  //     try {
  //       NativeModules.RNServeup.findEvents((resp) => {
  //         alert(resp);
  //       });
  //       console.log("MekabelMeXcode");
  //     } catch (error) {
  //       console.error("Error in handleMekabelMeXcode:", error);
  //     }
  //   });
  //   return () => {
  //     FlagEvents.removeAllListeners();
  //   };
  // }, []);

  const handleOpponentScore = () => {
    NativeModules.RNServeup.addEvent("inc", "score");
    console.log("inc opponent score");
  };

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
        console.log("first New operation");
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
        console.log("first New operation");
      } else {
        console.log("error2");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleMekabelMeXcode = () => {
    try {
      NativeModules.RNServeup.findEvents((resp) => {
        alert(resp);
      });
      console.log("MekabelMeXcode");
      setDisplayPlayer(null);
    } catch (error) {
      console.error("Error in handleMekabelMeXcode:", error);
    }
  };

  const handleOpponentDetails = () => {
    NativeModules.RNServeup.addEvent(player1.username, profilePicBase64);
    console.log("inserted opponent details");
    setDisplayPlayer(player1);
    setTimeout(() => {
      setDisplayPlayer(null);
    }, 1000);
  };

  const handleStartNewOperation = () => {
    //NativeModules.RNServeup.addEvent("new", "operation");

    // if (!socket) {
    //   initSocket(token);
    // }
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

    console.log("Start New Operation pressed");
  };

  const handleCirclePress = () => {
    console.log("Circle pressed");
    setCircleColor("green");
    setTimeout(() => {
      setCircleColor("white");
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
      <Text>Open up App.js on your app!!!!!!!</Text>

      <TouchableOpacity
        style={styles.startNewOperationButton}
        onPress={handleStartNewOperation}
      >
        <Text>Start New Operation</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.circle, { backgroundColor: circleColor }]}
        onPress={handleCirclePress}
      />

      <TouchableOpacity style={styles.button} onPress={handleMekabelMeXcode}>
        <Text>MekabelMeXcode</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleOpponentScore}>
        <Text>inc opponent score</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleOpponentDetails}>
        <Text>insert opponent details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleloginuser1}>
        <Text>login user 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleloginuser2}>
        <Text>login user 2</Text>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    marginTop: 20,
    borderWidth: 2,
    borderColor: "black",
  },
  playerDetails: {
    alignItems: "center",
    marginTop: 20,
  },
  startNewOperationButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "gray",
    borderRadius: 5,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
});
