import React, { useContext, useEffect, useState } from 'react';

import './View.css';
import { PostContext } from '../../store/PostContext';
import { firestore } from '../../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
function View() {
  const [userDetails,setUserDetails] = useState()
  const {postDetails} = useContext(PostContext)
  useEffect(() => {
    if (postDetails && postDetails.userId) {
      const userId = postDetails.userId;
      
      // Create a reference to the users collection
      const usersCollectionRef = collection(firestore, 'users');

      // Create a query against the collection using the where clause
      const q = query(usersCollectionRef, where('id', '==', userId));

      // Execute the query
      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setUserDetails(doc.data());
          });
        })
        .catch((error) => {
          console.error('Error fetching user details:', error.message);
        });
    }
  }, [postDetails]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{new Date(postDetails.createdAt.seconds * 1000).toLocaleDateString()}</span>
        </div>
       {userDetails&& <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phone}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
