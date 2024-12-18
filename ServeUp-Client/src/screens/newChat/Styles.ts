import { StyleSheet, Platform } from "react-native";
const OS = Platform.OS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#162529",
    paddingLeft: 24,
    paddingRight: 24,
  },
  bodyContainer: {
    flex: 1,
    marginTop: 43,
  },
  infoContainer: {
    marginTop: 85,
    alignItems: "center",
  },
  nameText: {
    fontFamily: "displayMedium",
    fontSize: 24,
    color: "#FFF",
  },
  despContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  despText: {
    fontFamily: "displayMedium",
    fontSize: 20,
    color: "#FFF",
  },
  expLevel: {
    fontFamily: "displayMedium",
    fontSize: 20,
    color: "#D5FF45",
  },
  actionsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  historyBtn: {
    height: 40,
    backgroundColor: "#162529",
    borderColor: "#636363",
    borderWidth: 1,
    padding: 10.5,
    paddingLeft: 24,
    paddingRight: 24,
    borderRadius: 8,
  },
  historyBtnText: {
    fontFamily: "medium",
    fontSize: 16,
    color: "#FFF",
  },
  friendsBtn: {
    height: 40,
    backgroundColor: "#162529",
    borderColor: "#636363",
    borderWidth: 1,
    padding: 10.5,
    borderRadius: 8,
    marginLeft: 15,
    marginRight: 15,
    paddingLeft: 24,
    paddingRight: 24,
  },
  friendsBtnText: {
    fontFamily: "medium",
    fontSize: 16,
    color: "#FFF",
  },
  bioContainer: {
    alignItems: "center",
    marginTop: 32,
    paddingHorizontal: 32,
  },
  bioText: {
    fontFamily: "medium",
    fontSize: 16,
    color: "#FFF",
    textAlign: "center",
  },
  cardsContainer: {
    justifyContent: "center",
    marginTop: 70,
    flexDirection: "row",
  },
  card: {
    height: 120,
    width: 120,
    justifyContent: "flex-end",
  },
  cardText: {
    fontFamily: "medium",
    fontSize: 10,
    color: "#FFF",
    textShadowColor: "#000",
    marginBottom: 12,
    marginLeft: 16,
  },
  multiLineInputField: {
    height: 138,
    // backgroundColor: "red",
    borderRadius: 16,
    borderColor: "#636363",
    borderWidth: 1,
    marginBottom: 19,
    zIndex: -1000,
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  inputField: {
    // height: 44,
    width: "80%",
    // backgroundColor: "red",
    borderRadius: 16,
    borderColor: "#636363",
    borderWidth: 1,
    justifyContent: "center",
    marginBottom: 19,
    marginTop: 16,
    paddingVertical: 14,
    // alignItems: "center",
  },
  inputFieldText: {
    fontFamily: "medium",
    fontSize: 16,
    color: "#EEE",
    // marginLeft: 12,
  },
  input: {
    color: "#8F8F93",
    fontSize: 16,
    fontFamily: "medium",
    marginLeft: 12,
    marginTop: OS == "android" ? 10 : 0,
  },
  submitBtn: {
    height: 55,
    backgroundColor: "#D5FF45",
    borderRadius: 16,
    marginTop: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  submitBtnText: {
    fontFamily: "semiBold",
    color: "#000",
    fontSize: 18,
  },
  svgView: {
    height: OS == "android" ? "32%" : "25%",
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: "8%",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },

  contentContainerStyle: {
    // flex: 1,
  },
  mainView: {
    flex: 1,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    fontFamily: "medium",
    fontSize: 32,
    color: "#EEE",
  },
  searchBarContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  name: {
    fontFamily: "medium",
    fontSize: 24,
    color: "#FFF",
    marginLeft: 12,
    // marginTop: 12,
  },
  
});
export default styles;
