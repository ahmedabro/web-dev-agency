import React from 'react'
import SignInComponent from '../components/SignIn'
import InnerBanner from '../components/InnerBanner'

const SignIn = () => {
  return (
    <div>
      <InnerBanner title="Sign In" breadcrumb={[{ title: "Home", url: "/" }, { title: "Sign In" }]} />
      <SignInComponent />
    </div>
  )
}

export default SignIn
