import React from 'react'

const NewsCardComponent = ({ title, desc, image, source, time }) => {
    return (
        <>
            <div className="card-container relative w-full min-w-[380px] max-[750px]:max-w-full border-2 border-black rounded-lg shadow-lg bg-white max-w-[550px] custom-shadow overflow-hidden">
                <div className="image-container">
                    <img src={image} loading='lazy' className=' w-full aspect-video object-cover' />
                </div>
                <div className="details-container py-4 gap-4 flex flex-col">
                    <h2 className="text-lg font-bold px-4 line-clamp-1">
                        {title}
                    </h2>
                    <p className="text-sm px-4 line-clamp-2">
                        {desc}
                    </p>
                    <div className="source-container flex items-center justify-between px-4">
                        <span className="text-xs text-gray-500">Source: {source}</span>
                        <span className="text-xs text-gray-500">Date: {time}</span>
                    </div>
                </div>

            </div>
        </>
    )
}

export default NewsCardComponent