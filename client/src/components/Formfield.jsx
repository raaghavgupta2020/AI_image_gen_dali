import React from 'react'
import { Form } from 'react-router-dom'

const Formfield = ({labelName , type ,name, placeholder , value , handleChange , isSurpriseMe, handleSurpriseMe}) => {
  return (
    <div>
      <div>

        <label htmlFor={name} className='py-1'>{labelName}</label> 
        {/* in whichever field we have {name} as the id , it will be prompted when the labelname is clicked , basically it tells , to which filed this label is referring to */}
        
        {isSurpriseMe && (
          <button  
            type = "button"
            onClick ={handleSurpriseMe}
            className='font-semibold bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black ml-2 mb-1'
          >Surprise Me</button>
        )}

        <input
          type={type}
          id={name} //this is same as that given in the "htmlFor" in label tag
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
          className='mb-2 py-2 px-2 border w-full rounded-[12px]'
        />

      </div>
    </div>
  )
}

export default Formfield