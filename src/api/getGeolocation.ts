import ipRegex from "ip-regex";


export default async function getGeolocation(inputValue:string){

    let IpAddress;
    let domain;
    if(ipRegex({ exact: true }).test(inputValue)){
        IpAddress = inputValue;
    }
    else{
        domain = inputValue;
    }

    const URL = `https://geo.ipify.org/api/v2/country,city?apiKey=${import.meta.env.VITE_GEO_LOCATION_API_KEY}&ipAddress=${IpAddress || ""}&domain=${domain || ""}`;

    try{
        const resData  = await fetch(URL)
        const geoResult = await resData.json()
        if(geoResult.messages){
            throw new Error(geoResult.messages)
        }
        return geoResult;
    }
    catch(err:any|unknown){
        throw new Error(err.message || "Error Occured Getting Geolocation")
    }
}