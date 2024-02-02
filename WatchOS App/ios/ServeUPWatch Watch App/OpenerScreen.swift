import SwiftUI
class AppViewModel: ObservableObject {
    @Published var shouldNavigate = false
}

struct OpenerScreen: View {
  @StateObject var watchConnector = WatchToiOSConnector()
  @StateObject var appViewModel = AppViewModel()
  var body: some View {
      NavigationView {
          VStack(spacing: 0) {
              RoundedRectangle(cornerRadius: 250)
                  .frame(width: 90, height: 90)
                  .shadow(color: Color(red: 0.84, green: 1, blue: 0.27, opacity: 0.20), radius: 30, x: 0, y: 0)
                  .overlay(
                      Image("logo")
                          .resizable()
                          .aspectRatio(contentMode: .fill)
                          .frame(width: 90, height: 90)
                          .clipShape(RoundedRectangle(cornerRadius: 250))
                          .shadow(color: Color(red: 0.84, green: 1, blue: 0.27, opacity: 0.3), radius: 10, x: 0, y: 0)
                  )
                  .offset(y: 20)

              Text("ServeUP Community")
                  .font(.system(size: 18, design: .rounded))
                  .fontWeight(.semibold)
                  .multilineTextAlignment(.center)
                  .foregroundColor(Color(red: 0.84, green: 1, blue: 0.27))
                  .padding(.horizontal, 20)
                  .frame(minWidth: 269.00, minHeight: 58.00, alignment: .top)
                  .fixedSize(horizontal: false, vertical: true)
                  .minimumScaleFactor(0.9)
                  .offset(y: 23)
              
              Text("Waiting")
                  .font(.system(size: 25, design: .rounded))
                  .fontWeight(.semibold)
                  .multilineTextAlignment(.center)
                  .foregroundColor(Color.white)
                  .padding(.horizontal, 20)
                  .frame(width: 200, height: 30)
                  .fixedSize(horizontal: false, vertical: true)
                  .minimumScaleFactor(0.9)
                  .lineLimit(2)
              
              Text("    Connection...")
                  .font(.system(size: 25, design: .rounded))
                  .fontWeight(.semibold)
                  .multilineTextAlignment(.center)
                  .foregroundColor(Color.white)
                  .padding(.horizontal, 20)
                  .frame(width: 200, height: 30)                    .fixedSize(horizontal: false, vertical: true)
                  .minimumScaleFactor(0.9)
                  .lineLimit(2)
          }
          .padding(.horizontal, 10)
          .background(Color(red: 22/255, green: 37/255, blue: 41/255))
      }
  }
}

#Preview {
  OpenerScreen()
}
