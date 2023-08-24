import { useState } from "react"
import Header from "./components/Header"
import LeafLetMap from "./components/LeafLetMap"
import CustomAlertBox from "./components/CustomAlertBox"

function App() {

  const [location,setLocation] = useState<ILocation>({
    latitude: 0,
    longitude: 0,
    country: null,
    city: null
  })

  const handleSetLocation = (location:ILocation) => {
    setLocation(location)
  }

  return (
    <>
     <CustomAlertBox />
     <Header handleSetLocation={handleSetLocation} />
     <LeafLetMap resultingLocation={location} />
    </>
  )
}

export default App
