import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'

export default function LeafLetMap({resultingLocation}:{ resultingLocation:ILocation }){

    const { latitude, longitude, country, city } = resultingLocation;
    const customIcon = new L.Icon({
        iconUrl: '/images/icon-location.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 32], 
    })

    return(
        latitude && longitude ?
        <MapContainer style={{width:"100%",height:"45em"}} center={[latitude,longitude]} zoom={13} zoomControl={false} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude,longitude]} icon={customIcon}>
                <Popup>
                   {city},{country}
                </Popup>
            </Marker>
            <ZoomControl position='bottomright' />
        </MapContainer>
        :
        null
    )
}