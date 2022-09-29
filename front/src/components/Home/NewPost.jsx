import {
  faBackward,
  faPaperPlane,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, {  useEffect, useState } from "react";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import "../../Styles/stylesComp/newPost.css";

const NewPost = () => {
  // console.log(imageUrl);
  const [msg, setMsg] = useState("");
  const [pictureUser, setPictureUser] = useState();
  // const[ msgImg,setMsgImg] = useState(null);
  const [file, setFile] = useState();
  const user_id = JSON.parse(localStorage.getItem("user_info")).user.user_id;
  const inputRef = useRef();

  //**************************************  LES FONCTIONS**************************/

  const cancelPost = (e) => {
    setFile("");
    setMsg("");
    // setMsgImg("")
  };

  const getProfilePicture = () => {
    axios({
      method: "GET",
      url: `http://localhost:4200/api/user/${user_id}`,
      withCredentials: true,
    })
      .then((res) => {
        if (res.data[0].user_picture) {
          setPictureUser(res.data[0].user_picture);
        } else {
          setPictureUser(`http://localhost:4200/images/anonymousUser.svg`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePic = (e) => {
    if (e.target.files.length !== 0) {
      // setMsgImg(URL.createObjectURL(file));
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
    // setMsgImg(URL.createObjectURL(inputRef.current.value));
  };

  const handlePost = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userId", user_id);
    data.append("content", msg);
    data.append("attachment", file);
    // const post ={
    //     post_user_id:user_id,
    //     content:msg,
    //     post_imageUrl:{"attachment":file}
    // }
    // console.log(post);
    axios({
      method: "POST",
      url: `http://localhost:4200/api/post`,
      data,
      withCredentials: true,
    })
      .then((res) => {
        // if(res.data[0]){
        //   setPictureUser(res.data[0]);
        // }else{
        //   setPictureUser( `http://localhost:4200/images/anonymousUser.svg`)
        // }
        // getProfilePicture()
        cancelPost();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //************************************** LES EFFETS ******************************/
  useEffect(() => {
    if (user_id) {
      getProfilePicture();
    }
  });

  return (
    <div className="postContainer">
      <div className="posForm">
        <div className="imgTitre">
          <NavLink to="/profil">
            {user_id && <img src={pictureUser} alt="" className="imgPic" />}
            
          </NavLink>
        </div>
        <br />
        <div className="contTextarea">
        <textarea
          name="msg"
          id="msg"
          placeholder="exprimez-vous"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />          
        </div>

        <br />
        <div className="contimgPrev">
          {file ? <img src={URL.createObjectURL(file)} alt="" className="imgPrev"/> : ""}
        </div>
        <div className="footerForm">
          <label htmlFor="attachment">
            <FontAwesomeIcon icon={faUpload} />
          </label>
          <input
            type="file"
            name="attachment"
            id="attachment"
            ref={inputRef}
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handlePic(e)}
          />
          <div className="btns">
            {msg || file ? (
              <button className="cancel" onClick={cancelPost} >
                <FontAwesomeIcon icon={faBackward}/>
              </button>
            ) : null}

            <button className="sendMsg" onClick={handlePost}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
