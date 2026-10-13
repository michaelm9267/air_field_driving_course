import React from 'react'
import Header from '../components/Header'

const Layout = ({children, setTestMode}) => {
  return (
    <div>
        <Header  setTestMode={setTestMode} />
        {children}
    </div>
  )
}

export default Layout