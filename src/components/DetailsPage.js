import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

import '../css/DetailsPage.css'

const DetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, 'menu', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such recipe!");
      }
    };

    fetchData();
  }, [id]);

  if (!data) { return <div> Loading ... </div> };

  return (
    <div>
      <header className="header_Sec">
        <div className="container">
          <img className='img_container' src={data.file} alt='img' />
        </div><div className="header_Text">
          <h1>{data.title}</h1>
          <p className="created_by"><span>by {data.name}</span></p>
          <p className="summary">{data.summary}</p>
        </div>
      </header>

      <main>
        <pre className="instructions_content">
          {data.instructions}
        </pre>
      </main>
    </div>
  )
}

export default DetailsPage