import React from 'react'
import Loading from './loading'
//rfec

function Button({title,onclick , isLoading}) {
  return (
    
      <button className="bg-red-500 text-white text-xl  py-2 w-[100%] rounded-md " onClick={onclick}
      disabled={isLoading}>
      {isLoading ? <Loading/> :title} 
      </button>

  )
}

export default Button
