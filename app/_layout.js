import { Slot, SplashScreen, Stack } from "expo-router"
// import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar"
// SplashScreen.preventAutoHideAsync();
import { TamaguiProvider } from "tamagui"
import config from "../tamagui.config"
import { useEffect, useState } from "react"
import { Inter_400Regular, Inter_700Bold } from "@expo-google-fonts/inter"
import * as Fonts from "expo-font"
import { Info } from "@tamagui/lucide-icons"

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
}

SplashScreen.preventAutoHideAsync()

const Layout = () => {
  const [{ loaded: fontsLoaded, error: fontError }, setFontState] = useState({
    loaded: false,
    error: false,
  })

  useEffect(() => {
    Fonts.loadAsync({
      Inter: Inter_400Regular,
      InterBold: Inter_700Bold,
    })
      .then(() => {
        setFontState({ loaded: true, error: false })
        console.log("ZIKOOO", fontError)
      })
      .catch((err) => {
        console.error(err)

        setFontState({ loaded: false, error: true })
      })
  }, [])

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, fontError])

  // if (!fontsLoaded) {
  //   return <Slot />
  // }

  if (fontError) {
    return null
  }

  return (
    <TamaguiProvider config={config}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#30a46c" },
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerRight: () => <Info size={24} color="white" />,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: true, title: "" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </TamaguiProvider>
  )
}

export default Layout
