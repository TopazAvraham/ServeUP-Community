//
//  WatchToiOSConnector.swift
//  myapp
//
//  Created by Yuval on 05/12/2023.
//

import Foundation
import WatchConnectivity


class WatchToiOSConnector: NSObject, WCSessionDelegate, ObservableObject {

  var session: WCSession
  let sharedData = SharedData.shared
  @Published var opponentDoneAPoint: Bool = false


  init(session: WCSession = .default) {
    self.session = session
    super.init()
    session.delegate = self
    session.activate()
  }
  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    
  }
  

  func sendPingToIos(ping :String){  
    if session.isReachable{
      print (ping)//##############################################################################################
      print("222222222222222222222222222222")//#################################################################################
      let data:[String: Any] = [
        "ping" : ping
      ]
      print (data) //##############################################################################################
      session.sendMessage(data, replyHandler: nil)
    }else{
      print ("session is not reachable")
    }
  }
  
  func sendFinalScoreToIos(finalScore :String){
    if session.isReachable{
      let data:[String: Any] = [
        "finalScore" : finalScore
      ]
      session.sendMessage(data, replyHandler: nil)
    }else{
      print ("session is not reachable")
    }
    
    
  }
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
    print(message)
    if message["MoveToStart"] is String {
      //move to start screen from the opener screen - intent

      
    }else{
      if message["IncScore"] is String {
        print("inc on my watch the opponent's score!!!")
        
        // Use DispatchQueue.main.async to switch to the main thread
                   DispatchQueue.main.async {
                       // Call the method on the main thread
                       NotificationCenter.default.post(name: NSNotification.Name("IncrementPlayer2CurGameScore"), object: nil)
                       self.opponentDoneAPoint = true
                   }
        
        //self.opponentDoneAPoint = false
      }else {
        let userName = message["username"]
        let userPic = message["pic"]
        
        let opponentDetails = OpponentDetails.shared
        opponentDetails.opponentUsername = userName as! String
        opponentDetails.opponentPic = userPic as! String
      }
      
    }
    
    }
  
  
}

