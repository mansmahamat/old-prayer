import { useState, useEffect } from "react"
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan"
import * as Location from "expo-location"
import moment from "moment"
import { create, useStore } from "zustand"

const useGetCity = () => {
  const [city, setCity] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        return
      }

      let location = await Location.getCurrentPositionAsync({})
      // setLocation(location)
      // setLocation(location)
      // console.log("LOCATION", location)
      // setLat(location.coords.latitude)
      // setLong(location.coords.longitude)

      setIsLoading(true)

      try {
        const response = await fetch(
          `https://geocode.maps.co/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}`
        )
        const data = await response.json()
        setCity(data.address.city ?? data.address.town)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
        setIsLoading(false)
      }

      // Get address from latitude & longitude.
      // fromLatLng(location.coords.latitude, location.coords.longitude)
      //   .then(({ results }) => {
      //     const { lat, lng } = results[0].geometry.location
      //     console.log("MANSSSSS", results[0].address_components[3].long_name)
      //     setCity
      //   })
      //   .catch(console.error)
    })()
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetchData()
  }

  return {
    city,
  }
}

export default useGetCity
