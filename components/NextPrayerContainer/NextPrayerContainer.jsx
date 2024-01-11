import {
  View,
  Text,
  TouchableWithoutFeedback,
} from "react-native"
import {
  FlatList,
} from "@gluestack-ui/themed"
import styles from "./nexprayercard.style"
import moment from "moment"
import { Entypo } from "@expo/vector-icons"
import {
  Paragraph,
  XStack,
  ScrollView,
  YGroup,
  ListItem,
  Button,
} from "tamagui"
import NextPrayerCard from "../NextPrayerCard/NextPrayerCard"
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useRef, useState } from "react"
import useGetPrayer from "../../hooks/useGetPrayer"
import useGetDateHijri from "../../hooks/useGetDateHijri"
import { Sunset } from '@tamagui/lucide-icons'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


const NextPrayerContainer = ({
  nextPrayerName,
  nextPrayerTimeHours,
  nextPrayerTimeMinutes,
  currentPrayer,
  city,
}) => {

  const today = new Date()
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  //NOTIFICATIONS
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const { transformedArray: prayerTimesToday } = useGetPrayer(date)


  const { data, month, day, year, designation, isLoading, error, refetch } =
    useGetDateHijri(date)

  const prayerImages = {
    fajr: require("../../assets/fajr.png"),
    sunrise: require("../../assets/fajr.png"),
    dhuhr: require("../../assets/dhur.png"),
    asr: require("../../assets/asr.png"),
    maghrib: require("../../assets/maghrib.png"),
    isha: require("../../assets/isha.png"),
  }

  const prayersIcon = {
    fajr: require("../../assets/prayers/fajr.png"),
    dhuhr: require("../../assets/prayers/dhuhr.png"),
    asr: require("../../assets/prayers/asr.png"),
    maghrib: require("../../assets/prayers/maghrib.png"),
    isha: require("../../assets/prayers/isha.png"),
  }
  const prayerImageSource = prayerImages[currentPrayer.toLowerCase()]
  const prayerIconSource = prayersIcon[currentPrayer.toLowerCase()]
  const filteredPrayerTimes = prayerTimesToday.filter(
    (prayer) => prayer.name !== "sunrise" && prayer.name !== "sunset"
  )

  function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const reset = () => {
    setDate(today);
  };

  const showTimepicker = () => {
    showMode('time');
  };




  return (
    <ScrollView>
      <XStack
        flexDirection="column"
        backgroundColor="white"
        paddingVertical="$4"
        paddingHorizontal="$4"
        space
        height="100%"
      >
        {/* <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text>Your expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {notification && notification.request.content.title} </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button onPress={async () => {
          await schedulePushNotification();
        }} size="$3" theme="active">
          Active
        </Button>
        
      </View> */}


        <NextPrayerCard
          size="$5"
          width="100%"
          height={230}
          currentPrayer={currentPrayer}
          city={city}
          nextPrayerTimeHours={nextPrayerTimeHours}
          nextPrayerTimeMinutes={nextPrayerTimeMinutes}
          nextPrayerName={nextPrayerName}
        />

        <XStack
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderColor="$color"
          borderRadius="$4"
        >
          {/* <Button backgroundColor="orange" onPress={async () => {
            await schedulePushNotification();
          }}>
            Notifications test
          </Button> */}
          <DateTimePicker
            testID="dateTimePicker"

            themeVariant="light"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
          />
          {date.toDateString() !== today.toDateString() && <Entypo onPress={reset} name="cross" style={{ marginLeft: 6 }} size={24} color="red" />}

        </XStack>
        <Paragraph size="$5" textAlign="center" color="black" fontWeight="800">
          {month} {day}, {year} {designation}
        </Paragraph>
        <View style={styles.container()}>
          <FlatList
            LisHeaderComponent={
              <View style={{ flex: 1 }}>
                <Text>Header content</Text>
              </View>
            }
            data={filteredPrayerTimes}
            renderItem={({ item, key }) => (
              <TouchableWithoutFeedback key={key}>
                <YGroup alignSelf="center" marginBottom={4} bordered width="100%" size="$4">
                  <YGroup.Item >
                    <ListItem backgroundColor="#30a46c" hoverTheme size="$4" iconAfter={<Sunset size="$21" />} title={moment(item.time).format("HH:mm")} spaceFlex subTitle={capitalizeFirstLetter(item.name)}>

                    </ListItem>
                  </YGroup.Item>

                </YGroup>
              </TouchableWithoutFeedback>
            )}
            ListFooterComponent={
              <View style={{ flex: 1 }}>

              </View>
            }
            keyExtractor={(item) => item.id}
          />

        </View>
      </XStack>
    </ScrollView>
  )
}



export default NextPrayerContainer


async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Fajr prayer 🕋",
      body: "It's time for Fajr",
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({ projectId: '9cba4f70-b7d4-4a38-afa4-9c9294a7258b' })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}