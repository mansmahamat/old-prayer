import { Redirect } from "expo-router"
import { useCallback } from "react"
import { SafeAreaView } from "react-native"
import { Text } from "tamagui"
import { useRouter, useFocusEffect } from "expo-router"
const router = useRouter()

export default function Index() {
  // useFocusEffect(() => {
  //   // Call the replace method to redirect to a new route without adding to the history.
  //   // We do this in a useFocusEffect to ensure the redirect happens every time the screen
  //   // is focused.
  //   router.replace("/home")

  return <Redirect href="/home" />
}
