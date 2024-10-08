import React from 'react'

const Footer = () => {
  const date = new Date()
  return (
    <>
      <div className="mt-24">
        <p className="dark:text-gray-200 text-gray-700 text-center m-20">
          © {date.getFullYear()} All rights reserved by <span className='text-[#32AA5C] font-bold'>Islamic Cognizance</span>
        </p>
      </div>
    </>
  )
}

export default Footer
