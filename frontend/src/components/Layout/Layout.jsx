import React from 'react'

import Header from './../Header/Header'
import Footer from './../Footer/Footer'
import Routers from './../../routers/Routers'


const layout = () => {
  return (
    <div>
      <Header/>
      <Routers/>
      <Footer/>
    </div>
  )
}

export default layout
