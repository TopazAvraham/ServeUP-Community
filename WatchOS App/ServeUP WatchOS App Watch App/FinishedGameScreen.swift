import SwiftUI

struct FinishedGameScreen: View {
    @EnvironmentObject var sharedData: SharedData
    
    func winningPlayerName() -> String {
        if(sharedData.isPlayer1Won){
           return sharedData.player1Name
        }
        return sharedData.player2Name
    }

    var body: some View {
        NavigationView {
            VStack {
                RoundedRectangle(cornerRadius: 250)
                    .frame(width: 50, height: 20)
                    .shadow(color: Color(red: 0.84, green: 1, blue: 0.27, opacity: 0.20), radius: 30, x: 0, y: 0)
                    .overlay(
                        Image("IMG_4276")//change to photo of winner
                            .resizable()
                            .aspectRatio(contentMode: .fill)
                            .clipShape(RoundedRectangle(cornerRadius: 250))
                            .shadow(color: Color(red: 0.84, green: 1, blue: 0.27, opacity: 0.3), radius: 10, x: 0, y: 0)
                    )
                    .offset(y: -10)

                Text(winningPlayerName())
                    .font(.system(size: 22, design: .rounded))
                    .fontWeight(.semibold)
                    .foregroundColor(Color.white)
                    .frame(width: 200, height: 30)

                Text("Win!")
                    .font(.system(size: 64, design: .rounded))
                    .fontWeight(.bold)
                    .multilineTextAlignment(.center)
                    .foregroundColor(Color(red: 0.84, green: 1, blue: 0.27))
                    .frame(width: 200, height: 60)

                NavigationLink(destination: StartGameScreen()
                    .navigationBarTitle("") //this must be empty
                     .navigationBarHidden(true)
                     .navigationBarBackButtonHidden(true)

                
                ) {
                    Text("Submit Results")
                        .font(.system(size: 15, design: .rounded))
                        .fontWeight(.semibold)
                        .multilineTextAlignment(.center)
                        .foregroundColor(Color(red: 0.84, green: 1, blue: 0.27))
                        .cornerRadius(10)
                        .frame(width: 200, height: 60)
                }
            }
            .padding(.horizontal, 20)
            .background(Color(red: 22/255, green: 37/255, blue: 41/255))
        }
    }
}

struct FinishedGameScreen_Previews: PreviewProvider {
    static var previews: some View {
        
        let sharedData = SharedData()
        sharedData.player1Name = "Topaz Avraham"
        sharedData.player2Name = "Robert Kyosaki"
        sharedData.isPlayer1Won = false

        return FinishedGameScreen()
            .environmentObject(sharedData)
    }
}
