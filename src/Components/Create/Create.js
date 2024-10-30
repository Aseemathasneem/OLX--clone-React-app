import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';

import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { AuthContext } from '../../store/Context';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../../firebase/config';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('')
  const [category,setCategory] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState(null)
  const navigate = useNavigate()
  const handleSubmit = async () => {
    try {
      const auth = getAuth();
      
      // Ensure user is signed in before accessing UID
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
  
        // Create a reference to the storage location
        const storageRef = ref(getStorage(), `/image/${image.name}`);
  
        
        await uploadBytes(storageRef, image);
  
        // Get the download URL after the upload is complete
        const url = await getDownloadURL(storageRef);
        console.log('Download URL:', url);
  
        const productsCollectionRef = collection(firestore, 'products');
  
        await addDoc(productsCollectionRef, {
          name,
          category,
          price,
          url,
          userId,
          createdAt: serverTimestamp()
        }) .then(() => {
          
          navigate('/');
        })
  
        console.log('Product details added to Firestore successfully');
      } else {
        console.error('User is not signed in.');
      }
    } catch (error) {
      console.error('Error uploading file or adding to Firestore:', error.message);
    }
  };
  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"value={price}
            onChange={(e)=>setPrice(e.target.value)} />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''}></img>
          
            <br />
            <input onChange={(e)=>{
              setImage(e.target.files[0])
            }} type="file" />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
