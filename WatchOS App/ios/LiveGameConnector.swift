//
//  LiveGame.swift
//  myapp
//
//  Created by Yuval on 03/12/2023.
//

import Foundation
import Combine
import WatchConnectivity

//@objc(LiveGameConnector)
@objc
class LiveGameConnector :NSObject, ObservableObject {
  
    // Singleton instance
    @objc
    static let shared = LiveGameConnector()

    // Properties
  @Published var _opponentUsername: String
  @Published var _opponentPic: String
  @Published var _finalGameResult: String
  @Published var _pingPoint: String

    // Private constructor with default values
  @objc
  private override init() {

        _opponentUsername = "no opponent yet"
        _opponentPic = "no opponent pic yet"
        _finalGameResult = "0-0,0-0,0-0"
        _pingPoint = "0"
    }
  

    // Getter and Setter for opponentUsername
    @objc
    var opponentUsername: String {
        get {
            return _opponentUsername
        }
        set {
            _opponentUsername = newValue
        }
    }

    // Getter and Setter for opponentPic
    @objc
    var opponentPic: String {
        get {
            return _opponentPic
        }
        set {
            _opponentPic = newValue
        }
    }

    // Getter and Setter for finalGameResult
    @objc
    var finalGameResult: String {
        get {
            return _finalGameResult
        }
        set {
            _finalGameResult = newValue
        }
    }

    // Getter and Setter for pingPoint
    @objc
    var pingPoint: String {
        get {
            return _pingPoint
        }
        set {
            _pingPoint = newValue
        }
    }
}
