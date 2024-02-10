//
//  Operation.swift
//  myapp
//
//  Created by Yuval on 05/12/2023.
//

import Foundation
import WatchConnectivity

@objc
class Operation : NSObject, ObservableObject{
    // Singleton instance
    @objc
    static let shared = Operation()

    // Property 1
    @objc
    let liveGameConnector: LiveGameConnector = LiveGameConnector.shared

    // Property 2
    @objc
   var watchConnector: WatchConnector
  

  
    // Private initializer to enforce singleton pattern
  @objc
  private override init() {
        watchConnector = WatchConnector()
    }
  
  @objc
  func sendDetailsToWatch(){
    let Operation = Operation.shared

    print("111111111111111111111111111111")//#########################################################
    Operation.watchConnector.sendDetailsToWatch()
  }
  
  @objc
  func sendIncScoreToWatch(){
    let Operation = Operation.shared

    print("444444444444444444444")//#########################################################
    Operation.watchConnector.sendIncScoreToWatch()
  }
  
  @objc
  func sendMoveToStartToWatch(){
    let Operation = Operation.shared

    print("77777777777777777")//#########################################################
    Operation.watchConnector.sendMoveToStartToWatch()
  }
}

