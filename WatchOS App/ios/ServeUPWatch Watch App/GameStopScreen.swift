import SwiftUI

struct GameStopScreen: View {
    @EnvironmentObject var sharedData: SharedData
  @StateObject var watchConnector = WatchToiOSConnector()
  @StateObject var opponentDetails = OpponentDetails.shared

    func curSetResultsMe() -> String {
        return sharedData.player1CurSetScore
    }
    
    func curSetResultsOpponent() -> String {
        return sharedData.player2CurSetScore
    }
    
    var body: some View {
        NavigationView {
            VStack {
                Text(opponentDetails.opponentUsername)
                    .font(.system(size: 22, design: .rounded))
                    .fontWeight(.semibold)
                    .foregroundColor(Color.white)
                    .frame(width: 200, height: 40)
                
                Text(curSetResultsOpponent())
                    .font(.system(size: 32, design: .rounded))
                    .fontWeight(.semibold)
                    .foregroundColor(Color.white)
                    .frame(width: 200, height: 26)

                NavigationLink(destination: LiveGameScreen()
                    .navigationBarTitle("")
                     .navigationBarHidden(true)
                     .navigationBarBackButtonHidden(true)
                     .transition(.slide)
                ) {
                    Text("Continue")
                        .font(.system(size: 20, design: .rounded))
                        .fontWeight(.semibold)
                        .multilineTextAlignment(.center)
                        .foregroundColor(Color(red: 0.84, green: 1, blue: 0.27))
                        .cornerRadius(5)
                        .frame(width: 110, height: 10)
                }
                
                
                Text(curSetResultsMe())
                    .font(.system(size: 32, design: .rounded))
                    .fontWeight(.semibold)
                    .foregroundColor(Color.white)
                    .frame(width: 200, height: 26)
                
                Text("Me")
                    .font(.system(size: 22, design: .rounded))
                    .fontWeight(.semibold)
                    .foregroundColor(Color.white)
                    .frame(width: 200, height: 28)
            }
            .padding(.horizontal, 20)
            .background(Color(red: 22/255, green: 37/255, blue: 41/255))
        }
    }
}

struct GameStopScreen_Previews: PreviewProvider {
    static var previews: some View {
        
        let sharedData = SharedData()
        sharedData.player1CurSetScore = "0"
        sharedData.player2CurSetScore = "0"
        
        return GameStopScreen()
            .environmentObject(sharedData)
    }
}


