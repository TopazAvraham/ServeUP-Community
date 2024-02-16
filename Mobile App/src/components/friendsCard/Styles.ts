import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    height: 120,
    width: 120,
    justifyContent: "flex-end",
  },
  cardText: {
    fontFamily: "medium",
    fontSize: 16,
    color: "#FFF",
  },
  cardExpText: {
    fontFamily: "medium",
    fontSize: 16,
    color: "#D5FF45",
  },
  inputFieldText: {
    fontFamily: "medium",
    fontSize: 16,
    color: "#EEE",
    marginLeft: 12,
  },
  input: {
    color: "#8F8F93",
    fontSize: 24,
    fontFamily: "medium",
    marginLeft: 18,
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
    height: "27%",
  },
  avatarContainer: {},
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 117,
  },

  contentContainerStyle: {
    flex: 1,
  },
  ImageBackground: {
    height: 55,
    width: 55,
    borderRadius: 55,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  ball: {
    position: "absolute",
    left: "40%",
    bottom: -10,
  },
  name: {
    fontFamily: "medium",
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  detailsText: {
    fontFamily: "medium",
    color: "#D5FF45",
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontFamily: "medium",
    color: "#FFF",
    fontSize: 28,
    marginTop: 16,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    height: 63,
    width: 63,
    borderRadius: 117,
  },
  cardTextContainer: {
    marginLeft: 21,
  },
  playBtnText: {
    fontFamily: "medium",
    color: "#000",
    fontSize: 14,
  },
});
export default styles;
