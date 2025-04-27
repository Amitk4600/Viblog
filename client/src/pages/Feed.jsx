import React from 'react'
import NavBar from '../components/Navbar'
import { useLoginUserMutation } from '../features/api/authApi';

function Feed() {
 const userName = localStorage.getItem("username")
  return (
    <div>
      <NavBar />
      <h1>Welcome {userName}</h1>
      <h2>Feed</h2>
      <p>This is the feed page where you can see all the stories.</p>
    </div>
  )
}

export default Feed