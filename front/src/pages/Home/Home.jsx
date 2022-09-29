import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NewPost from '../../components/Home/NewPost';
import Posts from '../../components/Home/Posts';
import Navbar from '../../components/Navbar';
import "../../Styles/stylesPages/home.css"

const Home = () => {

    const [isAdmin, setIsAdmin] = useState(false);
    const [allPosts, setAllPosts] = useState([]);
    const [userId, setUserId] = useState("");
    // const [imageUrl,setImageUrl] = useState(null)
    const navigate = useNavigate();

    //*************************************************** LES FONCTIONS **********************************/
    // const getProfilePicture = () => {
    //   axios({
    //     method: "GET",
    //     url: `http://localhost:4200/api/user/${userId}`,
    //     withCredentials: true,
    //   })
    //     .then((res) => {
    //         if(res.data[0].user_picture){
    //           setImageUrl(res.data[0].user_picture);
    //         }else{
    //           setImageUrl( `http://localhost:4200/images/anonymousUser.svg`)
    //         }

    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };

    const fetchAllPosts = () => {
        axios({
          method: "GET",
          url: `http://localhost:4200/api/post`,
          withCredentials: true,
          data: {
            user_id: userId,
          },
        })
          .then((res) => {
            setAllPosts(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
    
    //********************************************  LES EFFETS  *******************************************/  
    useEffect(() => {
        if (!localStorage.getItem("user_info")) {
          navigate("/login");
          return;
        }
        const storageUserId = JSON.parse(localStorage.getItem("user_info")).user
          .user_id;
        setUserId(storageUserId);
        const admin = JSON.parse(localStorage.getItem("user_info")).user.admin;    
        if (admin === 1) {
          setIsAdmin(true);
        }
        // fetchAllPosts()
      },[navigate]);


      useEffect(()=>{
        fetchAllPosts()
      })


    return (
        <>
        <Navbar/>
        <div className="containerHomepage">
            <div>
                <NewPost
                // imageUrl={imageUrl}
                />
            </div>
            <div>
                <Posts
                allPosts={allPosts}
                userId={userId}
                // getProfilePicture={getProfilePicture}
                isAdmin={isAdmin}
                />
            </div>
        </div>    
        </>
    );
};

export default Home;