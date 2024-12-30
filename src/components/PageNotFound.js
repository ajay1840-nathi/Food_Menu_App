import React from 'react'
import notfound from '../assets/images/404.webp'
import '../css/NotFound.css'
import {Link} from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className='not-found-wrapper'>
        <img className="not-found-container" src={notfound} alt="Not Found"/>
        <div className="not-found-content">
            <p>PAGE NOT FOUND</p>
            <p>It looks like nothing was found at this location.</p>
            <Link to={'/'}><button className='not-found-button'>BACK TO HOME</button></Link>
        </div>
    </div>
  )
}

export default PageNotFound