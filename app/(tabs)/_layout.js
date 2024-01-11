import { Stack, Tabs } from "expo-router"
import { CalendarDaysIcon, Icon, MoonIcon } from "@gluestack-ui/themed"

import { Compass, Home, List, Settings, Text } from "@tamagui/lucide-icons"

const Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#30a46c",

          tabBarIcon: ({ color, size }) => <Home size={24} color="black" />,
        }}
      />

      <Tabs.Screen
        name="qibla"
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#30a46c",

          tabBarIcon: ({ color, size }) => <Compass size={24} color="black" />,
        }}
      />

      <Tabs.Screen
        name="hadiths"
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#30a46c",

          tabBarIcon: ({ color, size }) => <Text size={24} color="black" />,
        }}
      />

      <Tabs.Screen
        name="nameAllah"
        options={{
          headerShown: false,
          title: "99 Names Allah",
          tabBarActiveTintColor: "#30a46c",
          tabBarIcon: ({ color, size }) => <List size={24} color="black" />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarActiveTintColor: "#30a46c",
          tabBarIcon: ({ color, size }) => <Settings size={24} color="black" />,
        }}
      />
    </Tabs>
  )
}

export default Layout
