import React from 'react'
import Footer from '../Components/Footer/Footer'
import ProfileComp from '../Components/Profile/ProfileComp'
import HeaderContext from '../Components/Header/HeaderContext'
import Header from '../Components/Header/Header'

function Profile() {
  return (
    <>
      <Header />
      <ProfileComp />
      <Footer />
    </>
  )
}

export default Profile