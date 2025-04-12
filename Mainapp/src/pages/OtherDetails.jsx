import React from 'react'
import MapDisplay from '../components/common/MapDisplay'
import EnvironmentalStudies from '../components/LearningComponent/EnvironmentalStudies'
import NavbarComponent from '../components/common/Navbar'

const OtherDetails = () => {
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [isModelVisible, setIsModelVisible] = React.useState(false)
    const [modelContent, setModelContent] = React.useState(null)

    const InformationContainer = {
        "Solar System": <MapDisplay />,
        "Multidisciplinary" : <EnvironmentalStudies />
    }

    const openModel = (content) => {
        setModelContent(InformationContainer[content])
        setIsModelVisible(true)
    }
    const closeModel = () => {
        setIsModelVisible(false)
        setModelContent('')
    }

  return (
    <>  
    <NavbarComponent />

        <div className="flex flex-wrap justify-center gap-4 p-4 bg-white">
            <button onClick={() => openModel('Solar System')} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group  cursor-pointer">    
                <div className="relative text-white text-xl font-semibold">
                    Solar System
                </div>
            </button>
            <button onClick={() => openModel('Multidisciplinary')} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-400 to-teal-400 hover:from-green-500 hover:to-teal-500 text-white font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group cursor-pointer">
                <div className="relative text-white text-xl font-semibold">
                    Multidisciplinary
                </div>
            </button>
        </div>

        {
            isModelVisible && (
                <div className="modal w-full z-50 h-screen absolute top-0 left-0 flex items-center justify-center bg-black bg-opacity-50"> 
                    <div className="modal-content w-full h-full">
                        {modelContent}
                    </div>
                    <button className='absolute top-5 right-5 text-white shadow-md rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-2 flex items-center justify-center' onClick={() => setIsModelVisible(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 glass-effect" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )
        }
    
    </>
  )
}

export default OtherDetails