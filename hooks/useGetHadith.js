import { useState, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan"
import moment from "moment"

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

const useGetHadith = () => {
  const [hadith, setHadith] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const fetchData = async () => {
    setIsLoading(true)

    try {
      const currentDate = new Date().toDateString()
      const lastApiCallDate = await AsyncStorage.getItem("lastApiCallDate")

      // Check if API was called today
      if (lastApiCallDate === currentDate) {
        // API already called today, fetch the stored hadith
        const storedHadith = await AsyncStorage.getItem("todayHadith")
        setHadith(JSON.parse(storedHadith))
      } else {
        // API not called today, make a new API call
        const apiKey = "SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk"
        const requestOptions = {
          method: "GET",
          headers: {
            "X-API-Key": apiKey,
          },
          redirect: "follow",
        }
        const response = await fetch(
          "https://api.sunnah.com/v1/hadiths/random",
          requestOptions
        )

        if (!response.ok) {
          throw new Error("Failed to fetch data from the API")
        }

        const data = await response.text()
        const parsedData = JSON.parse(data)

        // Store the fetched hadith and last API call date
        await AsyncStorage.setItem("todayHadith", JSON.stringify(parsedData))
        await AsyncStorage.setItem("lastApiCallDate", currentDate)

        setHadith(parsedData)
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetchData()
  }

  return {
    hadith,
  }
}

export default useGetHadith
