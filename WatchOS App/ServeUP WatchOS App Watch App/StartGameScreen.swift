
import SwiftUI

class SharedData: ObservableObject {
    @Published var curSetPlayed: Int = 1
    @Published var setScores: [(player1: String, player2: String)] = [("0", "0"), ("0", "0"), ("0", "0")]
    @Published var player1CurSetScore: String = "0"
    @Published var player2CurSetScore: String = "0"
    
    @Published var player1Name: String = "Topaz Avraham"
    @Published var player2Name: String = "Robert Kyosaki"
    @Published var player2Pic: String = "IMG_4276"
    @Published var isPlayer1Won = false
    
    @Published var setWinners: [Int] = [-1, -1, -1]   // Indices can be 1 or 2
}
 

struct StartGameScreen: View {
    @StateObject private var sharedData = SharedData()

    var body: some View {
        NavigationView {
            VStack(spacing: 0) {
                RoundedRectangle(cornerRadius: 250)
                    .frame(width: 90, height: 90)
                    .shadow(color: Color(red: 0.84, green: 1, blue: 0.27, opacity: 0.20), radius: 30, x: 0, y: 0)
                    .overlay(
                        Image(sharedData.player2Pic)
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: 90, height: 90)
                            .clipShape(RoundedRectangle(cornerRadius: 250))
                            .shadow(color: Color(red: 0.84, green: 1, blue: 0.27, opacity: 0.3), radius: 10, x: 0, y: 0)
                    )
                    .offset(y: -13)

                Text(sharedData.player2Name)
                    .font(.system(size: 25, design: .rounded))
                    .fontWeight(.semibold)
                    .multilineTextAlignment(.center)
                    .foregroundColor(Color.white)
                    .padding(.horizontal, 20)
                    .frame(minWidth: 269.00, minHeight: 58.00, alignment: .top)
                    .fixedSize(horizontal: false, vertical: true)
                    .minimumScaleFactor(0.9)
                    .offset(y: -10)
                    .lineLimit(2)

                
                NavigationLink(destination: LiveGameScreen()
                    .navigationBarTitle("")
                    .navigationBarHidden(true)
                    .navigationBarBackButtonHidden(true)
                    
                ){
                    Text("Let’s Play")
                        .font(.system(size: 20, design: .rounded))
                        .fontWeight(.semibold)
                        .multilineTextAlignment(.center)
                        .foregroundColor(Color(red: 0.84, green: 1, blue: 0.27))
                        .padding(10)
                        .cornerRadius(10)
                }
                .padding(.top, -20)
            }
            .padding(.horizontal, 10)
            .background(Color(red: 22/255, green: 37/255, blue: 41/255))
        }
        .environmentObject(sharedData)
    }
}

#Preview {
    StartGameScreen()
}
