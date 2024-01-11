import { H1, H2, ScrollView, Separator, Text, YGroup, YStack } from "tamagui"
import useGetHadith from "../../hooks/useGetHadith"

const App = () => {
  const { hadith } = useGetHadith()
  return (
    <>
      <YStack paddingVertical="$4" paddingHorizontal="$4">
        <H2 color="black" marginBottom="$12">
          Hadith of the day
        </H2>
        <ScrollView>
          {hadith?.hadith?.map((hadith, index) => (
            <YGroup
              key={index}
              alignSelf="center"
              width="100%"
              size="$5"
              marginBottom="$10"
              separator={<Separator />}
            >
              <YGroup.Item>
                <Text marginBottom="$2.5" color="black">
                  {hadith.lang === "en" ? "🇬🇧" : "🇸🇦"}
                </Text>
                <Text marginBottom="$2.5" fontWeight="800" color="black">
                  {hadith.chapterNumber} - {hadith.chapterTitle}
                </Text>
                <Text color="black">
                  {hadith.body.replace(/<\/?[^>]+(>|$)/g, "")}
                </Text>
              </YGroup.Item>
            </YGroup>
          ))}
        </ScrollView>
      </YStack>
    </>
  )
}

export default App
