import { StyleSheet } from "react-native"
import { COLORS, SHADOWS, SIZES } from "../../constants"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mainCardView: {
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 15,

    elevation: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
    borderColor: "#009000",
    borderWidth: 1,
  },
  subCardView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: COLORS.primary,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default styles
