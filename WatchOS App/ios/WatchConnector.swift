//
//  WatchConnector.swift
//  myapp
//
//  Created by Yuval on 05/12/2023.
//

import Foundation
import WatchConnectivity

class WatchConnector: NSObject, WCSessionDelegate, ObservableObject {

  static let shared = WatchConnector()
  var session: WCSession
  
  init(session: WCSession = .default) {
    self.session = session
    super.init()
    session.delegate = self
    session.activate()
  }
  
  func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    
  }
  
  
  func sessionDidBecomeInactive(_ session: WCSession) {
    
  }
  
  func sessionDidDeactivate(_ session: WCSession) {
    
  }
  
  
  func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
    print(message)
    let pingValue = message["ping"]
    let finalScoreValue = message["finalScore"]
    let liveGameConnector = LiveGameConnector.shared

    if pingValue != nil {
      liveGameConnector.pingPoint = pingValue as! String
      print(pingValue as! String)

    }
    if finalScoreValue != nil{
      liveGameConnector.finalGameResult = finalScoreValue as! String
      print(finalScoreValue as! String)
    }
    
    //AutoFunc.sharedInstance.activateFunction()
    //Flag().sent()
    RNEventEmitter.emitter.sendEvent(withName: "onSent", body: ["Test payload":"Test payload"])
  }
  
  
  func sendDetailsToWatch(){
    print("222222222222222222222222222")//#########################################################

    let liveGameConnector = LiveGameConnector.shared
    if session.isReachable{
      print("3333333333333333333333333")//#########################################################

      let data:[String: Any] = [
        "username" : liveGameConnector.opponentUsername,
        "pic" : liveGameConnector.opponentPic
      ]
      session.sendMessage(data, replyHandler: nil)
    }else{
      print ("session is not reachable")
    }
  }
  func sendIncScoreToWatch(){
    print("5555555555555555555")//#########################################################

    if session.isReachable{
      print("666666666666666666")//#########################################################

      let data:[String: Any] = ["IncScore" : "IncScore"]
      session.sendMessage(data, replyHandler: nil)
    }else{
      print ("session is not reachable")
    }
  }
  func sendMoveToStartToWatch(){
    print("88888888888888888")//#########################################################

    if session.isReachable{
      print("999999999999999")//#########################################################

      let data:[String: Any] = ["MoveToStart" : "MoveToStart"]
      session.sendMessage(data, replyHandler: nil)
    }else{
      print ("session is not reachable")
    }
  }
}
