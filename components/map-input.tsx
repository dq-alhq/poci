'use client'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

export default function MapInput({
    onChange,
    value
}: {
    onChange: (pos: [number, number]) => void
    value: [number, number] | null
}) {
    function LocationMarker() {
        useMapEvents({
            click(e) {
                const newPos: [number, number] = [e.latlng.lat, e.latlng.lng]
                onChange(newPos)
            }
        })

        return value === null ? null : <Marker position={value} />
    }

    return (
        <MapContainer
            center={value || [-7.036017, 112.531615]}
            className='aspect-square size-full rounded-lg'
            scrollWheelZoom={false}
            zoom={13}
        >
            <TileLayer
                attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <LocationMarker />
        </MapContainer>
    )
}
