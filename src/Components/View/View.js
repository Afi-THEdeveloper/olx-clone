import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import {  collection, query, where, getDocs, doc } from "firebase/firestore";
import {FirebaseContext} from '../../store/Contexts'
import {postContext} from '../../store/postContext'
function View() {
  const [userDetails,setUserDetails] = useState()
  const {postDetails} = useContext(postContext)
  const {db} =useContext(FirebaseContext)
  useEffect(()=>{
    const userquery = query(collection(db, "users"), where("id", "==", postDetails.userID));
    getDocs(userquery).then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        setUserDetails(doc.data())
      })
    })
    
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails&&postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">

        {postDetails&&<div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.productName}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.date}</span>
        </div>}

        {userDetails&&<div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.profileName}</p>
          <p>{userDetails.phoneNumber}</p>
        </div>}

      </div>
    </div>
  );
}
export default View;
