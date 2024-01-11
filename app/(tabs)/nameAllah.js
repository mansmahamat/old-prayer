import {
  H1,
  H2,
  ListItem,
  ScrollView,
  Separator,
  Text,
  YGroup,
  YStack,
} from "tamagui"
import nameAllahData from "../../assets/data/99_name.json"

const App = () => {
  return (
    <ScrollView>
      <YStack paddingVertical="$4" paddingHorizontal="$4">
        <H2 color="black" marginBottom="$8">
          99 Names Of Allah
        </H2>
        <YGroup
          alignSelf="center"
          width="100%"
          size="$5"
          marginBottom="$8"
          separator={<Separator />}
        >
          {nameAllahData.data.map((item, i) => (
            <ListItem
              hoverTheme
              key={i}
              pressTheme
              backgroundColor="#30a46c"
              borderColor="white"
              borderWidth="$1.5"
              title={`${item.number} - ${item.transliteration}`}
              subTitle={` ${item.en.meaning} - ${item.name} `}
            />
          ))}
        </YGroup>
      </YStack>
    </ScrollView>
  )
}

export default App
