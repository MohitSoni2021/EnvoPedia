import React from 'react'

const ForestMap = () => {
  return (
    <>
    <iframe
      src="https://www.globalforestwatch.org/embed/map/?map=eyJjZW50ZXIiOnsibGF0IjoyLjAwMSwibG5nIjowfSwibG9jYWxlIjoiZW4ifQ%3D%3D"
      width="100%"
      className='h-[calc(100vh-18px)]'
      style={{ border: 'none' }}
      title="Forest Cover Map"
    ></iframe>
    </>
  )
}

export default ForestMap