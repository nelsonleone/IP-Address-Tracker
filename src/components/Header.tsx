import { useState, useContext } from 'react'
import { FaAngleRight } from 'react-icons/fa'
import getGeolocation from '../api/getGeolocation'
import { alertContext } from '../context'

export default function Header({handleSetLocation}: { handleSetLocation:(location:ILocation) => void }){
    
    const [inputValue,setInputValue] = useState("")
    const [searchResult,setSearchResult] = useState<GeoResult|null>(null)
    const context = useContext(alertContext)
    const [loading,setLoading] = useState(false)
    const submitTrackingDetails = async() => {
        setLoading(true)

        try{
            const geoResult = await getGeolocation(inputValue)

            if(geoResult && geoResult.location){
                const  {
                    lat,
                    lng,
                    country,
                    city
                } = geoResult?.location;
    
                setSearchResult(geoResult)
    
                handleSetLocation({
                    latitude: lat,
                    longitude: lng,
                    country,
                    city
                })
            }
            else {
                throw new Error("Tracking Failed")
            }
        }

        catch(err:any|unknown){
            if(context.handleSetAlert){
                context.handleSetAlert({
                    alertMessage: err.message || "Error Occured Tracking IP",
                    severity: 'Error'
                })
            }
        }

        finally{
            setLoading(false)
        }
    }

    return(
        <header>
            <h1>IP Address Tracker</h1>
            <div>
                <label htmlFor="address-input" className="AT_only">Search For Any IP Address Or Domain</label>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} id="address-input" placeholder="Search for any IP address or domain" />
                <button disabled={loading} aria-label="Search" onClick={submitTrackingDetails}>
                  {
                    !loading ?
                    <FaAngleRight aria-hidden="true" />
                    :
                    <img width={40} src="/images/loading.svg" aria-label="loading" />
                  }
                </button>
            </div>

            <div className="floating_result">
                <div>
                    <p>IP Address</p>
                    <strong>{searchResult?.ip || ""}</strong>
                </div>
                <div>
                    <p>Location</p>
                    <strong>{searchResult?.location?.city}{searchResult?.location?.country  && `,${searchResult?.location?.country}`}
                    </strong>
                    <strong>
                      {searchResult?.location.postalCode}
                    </strong>
                </div>
                <div>
                    <p>Timezone</p>
                    <strong>{searchResult?.location?.timezone || ""}</strong>
                </div>
                <div>
                    <p>ISP</p>
                    <strong>{searchResult?.isp || ""}</strong>
                </div>
            </div>
        </header>
    )
}