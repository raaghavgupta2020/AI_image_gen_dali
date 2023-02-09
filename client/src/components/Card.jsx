import React from 'react'
//there is a download button on each card and to implement the download functionality we have to use file-saver 
import { download } from '../assets'

//we have created a function downloadImage in utils 
import { downloadImage } from '../utils' //to implement the download functionality



const Card = ({ _id , name , prompt , photo }) => {
  return (
    <div className='group card rounded-xl relative shadow hover:shadow-lg'>
      <img 
        className='w-full h-auto rounded-xl'
        src={photo} 
        alt={prompt} 
      />
      <div className='group-hover:flex flex-col hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md '>
        <p className='text-sm text-white overflow-y-auto'>{prompt}</p>
        <div className='flex justify-between items-center'>
          {/* this div is for the remaining things -> download button etc */}
          <div className='mt-3 flex items-center gap-2'>
            <div className='flex w-7 h-7 object-cover bg-green-700 justify-center items-center rounded-full'>
              {name[0]}
            </div>
            <p className='flex text-white text-sm'>
              {name}
            </p>
            </div>
            <button type="button" onClick={()=>{
              downloadImage(_id,photo)
            }}>
              <img 
                src={download} 
                alt="download" 
                className='mt-3 flex w-7 h-7 outline-none border-none bg-white rounded-full'
              />
            </button>
        </div>
      </div>

    </div>
  )
}

export default Card