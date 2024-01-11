import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback } from "react-native";
import {
    Avatar,
    AvatarImage,
    Box,
    FlatList,
    HStack,
    Heading,
    LinearGradient,
    VStack,
} from "@gluestack-ui/themed"
import styles from "./nexprayercard.style";
import stylesList from "./nextlist.style";
import moment from "moment";
import {
    Button,
    Card,
    CardProps,
    H2,
    Image as TamaguiImage,
    Paragraph,
    XStack,
    H3,
    ScrollView,
    Input,
} from "tamagui"
import { useCityStore } from "../../store/cityStore";
import { Locate, LocateFixed } from "@tamagui/lucide-icons";

const NextPrayerCard = (props) => {
    const prayerImages = {
        fajr: "https://res.cloudinary.com/mansdesmez/image/upload/v1704230718/asr_bfju85.png",
        sunrise: "https://res.cloudinary.com/mansdesmez/image/upload/v1704230718/asr_bfju85.png",
        dhuhr: "https://res.cloudinary.com/mansdesmez/image/upload/v1704230714/dhur_jl8wux.png",
        asr: "https://res.cloudinary.com/mansdesmez/image/upload/v1704230717/fajr_ehp8ew.png",
        maghrib: "https://res.cloudinary.com/mansdesmez/image/upload/v1704230715/maghrib_mhd459.png",
        isha: "https://res.cloudinary.com/mansdesmez/image/upload/v1704230716/isha_qeesqw.png",
    }


    return (

        <Card backgroundColor="#30a46c" borderColor="#30a46c" elevate size="$4" bordered {...props}>
            <Card.Header style={styles.prayerName()} padded>
                <Text style={styles.prayerName()} numberOfLines={1}>
                    {props.currentPrayer.toUpperCase()}
                </Text>


                <Text style={styles.prayerName()} numberOfLines={1}>
                    {props.nextPrayerTimeHours}h{props.nextPrayerTimeMinutes} to {props.nextPrayerName}
                </Text>
                {/* <Text style={styles.hijriDate()} numberOfLines={1}>
                    {month} {day}, {year} {designation}
                </Text>
                <Text style={styles.gregorianDate()} numberOfLines={1}>
                    {moment().format("dddd DD MMMM")}
                </Text> */}
            </Card.Header>
            <Card.Footer padded>
                <XStack flex={1} />

                <Button display="flex" backgroundColor="#30a46c" alignItems="center" borderRadius="$10">
                    <LocateFixed size={20} color="white" />
                    {props.city} </Button>

            </Card.Footer>
            <Card.Background shadowColor="#000"
                backgroundColor="#30a46c"
                borderRadius="$4"

                shadowOffset={
                    {
                        width: 0,
                        height: 2
                    }
                }
                shadowOpacity={0.3}
                shadowRadius={8}
                elevation={5} >
                <Image
                    resizeMode="cover"
                    alignSelf="center"
                    borderRadius="$4"
                    width="100%"
                    height="100%"
                    source={{
                        width: "100%",
                        height: "100%",
                        uri: prayerImages[props.nextPrayerName.toLowerCase()]

                    }}
                />

            </Card.Background>
        </Card >

    );
};


export default NextPrayerCard;