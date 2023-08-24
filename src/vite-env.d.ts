/// <reference types="vite/client" />

type GeoResult = {
    ip: string,
    location: {
        country: string,
        region: string,
        city: string,
        lat: number,
        lng: number,
        postalCode: string,
        timezone: number,
        geonameId: nunber
    },
    domains: string[],
    as: {
        asn: number,
        name: string,
        route: string,
        domain: string,
        type: string
    },
    isp: string,
    proxy: {
        proxy: boolean,
        vpn: boolean,
        tor: boolean
    },
}

interface ILocation {
    latitude: number,
    longitude: number,
    country: string | null,
    city: string | null
}
