'use client'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

interface Props {
    lat: number
    lng: number
    zoom?: number
}

export default function MyMap({ lat, lng, zoom }: Props) {
    return (
        <MapContainer
            center={[lat, lng]}
            className='z-0 aspect-square size-full rounded-lg'
            scrollWheelZoom
            zoom={zoom ?? 20}
        >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <Marker position={[lat, lng]}>
                <Popup className='font-sans'>
                    {lat}, {lng}
                </Popup>
            </Marker>
        </MapContainer>
    )
}
