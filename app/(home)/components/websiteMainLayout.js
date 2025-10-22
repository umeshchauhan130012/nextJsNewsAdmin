import React from 'react'
import Header from './header';
import Footer from './footer';

const WebsiteMainLayout = ({children}) => {
  return (
  <>
   <Header />
   {children}
   <Footer />
  </>
  )
}

export default WebsiteMainLayout;