import React, { useState, useEffect, useCallback, useRef } from "react"
import { Platform, View } from "react-native"
import moment from "moment"
import useGetPrayer from "../../hooks/useGetPrayer"
import useGetCity from "../../hooks/useGetCity"
import NextPrayerContainer from "../../components/NextPrayerContainer/NextPrayerContainer"
import * as Device from "expo-device"
import * as Notifications from "expo-notifications"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})

export default function Page() {
  //NOTIFICATIONS
  const [expoPushToken, setExpoPushToken] = useState("")
  const [notification, setNotification] = useState(false)
  const notificationListener = useRef()
  const responseListener = useRef()
  const date = new Date()

  const {
    prayerTimesToday,
    nextFivePrayers,
    current,
    currentTime,
    nextPrayerTime,
    nextPrayerName,
    currentPrayer,
    transformedArray,
  } = useGetPrayer(date)

  const { city } = useGetCity()
  const [timeDifference, setTimeDifference] = useState(
    calculateTimeDifference(nextPrayerTime)
  )
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    refetch()
    setRefreshing(false)
  }, [])

  function calculateTimeDifference(targetTime) {
    const currentTime = moment()
    const difference = moment(targetTime).diff(currentTime, "seconds")
    return difference
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token))

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification)
      })

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response)
      })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      const difference = calculateTimeDifference(nextPrayerTime)
      setTimeDifference(difference)

      // If the difference reaches 0, clear the interval
      if (difference <= 0) {
        //   schedulePushNotification()
        clearInterval(intervalId)
      }
    }, 1000)
    return () => {
      clearInterval(intervalId) // Clean up the interval on unmount
    }
  }, [nextPrayerTime])
  const nextPrayerTimeHours = Math.floor(Math.abs(timeDifference) / 3600)
  const nextPrayerTimeMinutes = Math.floor(
    (Math.abs(timeDifference) % 3600) / 60
  )

  // const [loaded] = useFonts({
  //   Inter: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  //   InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  // })

  // const onLayoutRootView = useCallback(async () => {
  //   if (loaded) {
  //   }
  // }, [loaded])

  // if (!loaded) {
  //   return nullView
  // }

  return (
    <View style={{ height: "100%" }}>
      <NextPrayerContainer
        city={city}
        nextPrayerName={nextPrayerName}
        nextPrayerTime={nextPrayerTime}
        nextPrayerTimeHours={nextPrayerTimeHours}
        nextPrayerTimeMinutes={nextPrayerTimeMinutes}
        currentPrayer={currentPrayer}
        prayerTimesToday={transformedArray}
      />
    </View>
  )
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Fajr prayer 🕋",
      body: "It's time for Fajr",
      data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
  })
}

async function registerForPushNotificationsAsync() {
  let token

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    })
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "9cba4f70-b7d4-4a38-afa4-9c9294a7258b",
      })
    ).data
  } else {
    alert("Must use physical device for Push Notifications")
  }

  return token
}
