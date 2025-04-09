import { Loader, Placeholder } from 'rsuite';
import React from 'react'
import { Bars } from 'react-loader-spinner';

const ContentLoader = () => {
  return (
    <div className='h-full w-full flex items-center justify-center '>
        <div className="max-w-[1280px]  w-full mx-auto flex items-center justify-center h-full">
            <Bars
            height="80"
            width="80"
            color="000000"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            />
        </div>
    </div>
  )
}

export default ContentLoader;