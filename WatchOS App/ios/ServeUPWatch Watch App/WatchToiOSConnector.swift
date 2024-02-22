
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
  
  
  
  func sendplayAnotherSetToIos(playAnotherSet :String){
    if session.isReachable{
      let data:[String: Any] = [
        "playAnotherSet" : playAnotherSet
      ]
      session.sendMessage(data, replyHandler: nil)
    }else{
      print ("session is not reachable")
    }
  }
  func sendsubmitGameToIos(submitGame :String){
    if session.isReachable{
      let data:[String: Any] = [
        "submitGame" : submitGame
      ]
      session.sendMessage(data, replyHandler: nil)
    }else{
      print ("session is not reachable")
    }
  }
  func sendviToIos(vi :String){
    if session.isReachable{
      let data:[String: Any] = [
        "vi" : vi
      ]
      session.sendMessage(data, replyHandler: nil)
    }else{
      print ("session is not reachable")
    }
  }
  func sendpauseToIos(pause :String){
    if session.isReachable{
      let data:[String: Any] = [
        "pause" : pause
      ]
      session.sendMessage(data, replyHandler: nil)
    }else{
      print ("session is not reachable")
    }
  }
  func sendcontinuePlayToIos(continuePlay :String){
    if session.isReachable{
      let data:[String: Any] = [
        "continuePlay" : continuePlay
      ]
      session.sendMessage(data, replyHandler: nil)
    }else{
      print ("session is not reachable")
    }
  }
  
  
  func session(_ session: WCSession, didReceiveMessage message: [String: Any]) {
      print(message)

      if let playAnotherSet = message["playAnotherSet"] as? String {
          DispatchQueue.main.async {
              NotificationCenter.default.post(name: NSNotification.Name("playAnotherSet"), object: nil)
              return
          }
      }

      if let submitGame = message["submitGame"] as? String {
          DispatchQueue.main.async {
              NotificationCenter.default.post(name: NSNotification.Name("submitGame"), object: nil)
              return
          }
      }

      if let vi = message["vi"] as? String {
          DispatchQueue.main.async {
              NotificationCenter.default.post(name: NSNotification.Name("vi"), object: nil)
              return
          }
      }

      if let pause = message["pause"] as? String {
          DispatchQueue.main.async {
              NotificationCenter.default.post(name: NSNotification.Name("pause"), object: nil)
              return
          }
      }

      if let continuePlay = message["continuePlay"] as? String {
          DispatchQueue.main.async {
              NotificationCenter.default.post(name: NSNotification.Name("continuePlay"), object: nil)
              return
          }
      }

      if let moveToStart = message["MoveToStart"] as? String {
          DispatchQueue.main.async {
              NotificationCenter.default.post(name: NSNotification.Name("MoveToStartScreen"), object: nil)
          }
      } else {
          if let incScore = message["IncScore"] as? String {
              print("inc on my watch the opponent's score!!!")
              DispatchQueue.main.async {
                  NotificationCenter.default.post(name: NSNotification.Name("IncrementPlayer2CurGameScore"), object: nil)
                  self.opponentDoneAPoint = true
              }
          } else {
              if let userName = message["username"] as? String,
                 let userPic = message["pic"] as? String {
                  let opponentDetails = OpponentDetails.shared
                  opponentDetails.opponentUsername = userName
                  opponentDetails.opponentPic = userPic
              }
          }
      }
  }

  
//  func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
//    print(message)
//    
//    if message["playAnotherSet"] is String {
//      DispatchQueue.main.async {
//        NotificationCenter.default.post(name: NSNotification.Name("playAnotherSet"), object: nil)
//        return
//      }
//    }
//    if message["submitGame"] is String {
//      DispatchQueue.main.async {
//        NotificationCenter.default.post(name: NSNotification.Name("submitGame"), object: nil)
//        return
//      }
//    }
//    if message["vi"] is String {
//      DispatchQueue.main.async {
//        NotificationCenter.default.post(name: NSNotification.Name("vi"), object: nil)
//        return
//      }
//    }
//    if message["pause"] is String {
//      DispatchQueue.main.async {
//        NotificationCenter.default.post(name: NSNotification.Name("pause"), object: nil)
//        return
//      }
//    }
//    if message["continuePlay"] is String {
//      DispatchQueue.main.async {
//        NotificationCenter.default.post(name: NSNotification.Name("continuePlay"), object: nil)
//        return
//      }
//    }
//    
//      
//    
//    if message["MoveToStart"] is String {
//      //move to start screen from the opener screen - intent
//      DispatchQueue.main.async {
//          // Call the method on the main thread
//          NotificationCenter.default.post(name: NSNotification.Name("MoveToStartScreen"), object: nil)
//      }
//      
//    }else{
//      if message["IncScore"] is String {
//        print("inc on my watch the opponent's score!!!")
//        
//        // Use DispatchQueue.main.async to switch to the main thread
//                   DispatchQueue.main.async {
//                       // Call the method on the main thread
//                       NotificationCenter.default.post(name: NSNotification.Name("IncrementPlayer2CurGameScore"), object: nil)
//                       self.opponentDoneAPoint = true
//                   }
//        
//        //self.opponentDoneAPoint = false
//      }else {
//        let userName = message["username"]
//        let userPic = message["pic"]
//        
//        let opponentDetails = OpponentDetails.shared
//        opponentDetails.opponentUsername = userName as! String
//        opponentDetails.opponentPic = userPic as! String
//      }
//      
//    }
//    
//    }
  
  
}
