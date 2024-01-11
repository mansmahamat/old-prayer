import { StyleSheet } from "react-native"

import { COLORS, SHADOWS, SIZES } from "../../constants"

const styles = StyleSheet.create({
  container: (selectedJob, item) => ({
    padding: SIZES.small,
    backgroundColor: "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    height: "80%",
    position: "relative",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  image: () => ({
    width: "100%",
    height: "50%",
    borderRadius: 20,
  }),

  companyName: {
    fontSize: SIZES.medium,
    color: "#B3AEC6",
  },
  infoContainer: {
    position: "absolute",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    top: 40,
    left: 40,
  },

  prayerName: () => ({
    fontSize: SIZES.large,
    color: COLORS.white,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    ...SHADOWS.medium,
  }),
  hijriDate: () => ({
    fontSize: SIZES.medium,
    marginTop: SIZES.medium,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    color: COLORS.white,
    ...SHADOWS.medium,
  }),
  gregorianDate: () => ({
    fontSize: SIZES.medium,
    marginTop: SIZES.small,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    color: COLORS.white,
    ...SHADOWS.medium,
  }),
  city: () => ({
    fontSize: SIZES.medium,
    textAlign: "right",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    color: COLORS.white,
    ...SHADOWS.medium,
  }),

  publisher: (selectedJob, item) => ({
    fontSize: SIZES.medium - 2,
    color: COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    color: "#B3AEC6",
  },
  cityContainer: {
    marginTop: SIZES.small,
    display: "flex",
    alignItems: "center",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
})

export default styles
