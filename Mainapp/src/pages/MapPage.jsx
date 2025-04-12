import React from 'react'
import MapDisplay from '../components/common/MapDisplay'
import ForestMap from '../components/common/ForestMap'
import NavbarComponent from '../components/common/Navbar'

const MapPage = () => {
  return (
    <>
        <NavbarComponent />
        <ForestMap />
    </>
  )
}

export default MapPage