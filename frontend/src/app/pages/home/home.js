import React, { useEffect, useState} from "react";
import Navbar from "../../components/navbar/navbar";
import Feed from "../../components/feed/Feed";
import RightSidebar from "../../components/rightsidebar/RightSideBar";
import Submit from "../../components/submit/submit";
import styles from "./home.module.css"
import Friends from "../../components/friends/friends";
import NavbarPlaceholder from "../../components/navbarPlaceholder/navbarplaceholder";
import UserProfileCard from "../../components/userprofilecard/userprofilecard";

const Home = ({ navigate }) => {
  
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if(token) {
      fetch("/users/home", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setUser(data.user);
        })
    }
  }, [token, setToken, setUser])
  
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  if(token) {
    return(
      <>
        <Navbar logout={logout} user = {user}/>
        <NavbarPlaceholder/>
        <div id='homepage' className={styles.homepage}>
          <h1>GameBook {user.username}</h1>
          <Submit setPosts={setPosts} token={token} setToken={setToken}/>
          <div id='homepage-content' className={styles.content}>
          <div id='homepage-left' className={styles.left}>
              <UserProfileCard user = {user}/>
              <Friends token={token} setToken={setToken}/>
          </div>
          <div id='homepage-feed' className={styles.feed}>
            <Feed posts={posts} setPosts={setPosts} logout={logout} token={token} setToken={setToken}/>
          </div>
          <div id='homepage-right' className={styles.right}>
            {<RightSidebar />}
          </div>
            
            
          </div>
        </div>
      </>
    )
  } else {
    navigate('/login')
  }
}

export default Home;