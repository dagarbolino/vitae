import React from 'react'

const Section = ({ children, className }) => {
  return (
    <div className={`p-4 md:p-8 lg:p-16 ${className}`}>
      {children}
    </div>
  )
}

export default Section