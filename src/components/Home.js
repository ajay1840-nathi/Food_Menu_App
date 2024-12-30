import React from 'react'
import { Link } from 'react-router-dom'

import '../css/Home.css'
import ImageSlide from './ImageSlide';

const Home = () => {
  return (
    <div>
      <header className="header_container">
      <ImageSlide/>

        {/* <img className="mainImg" src={headerimg} alt="Main" /> */}
        <div className='header-main-content'>
          <div className="header_content">
            <h1>NextLevel Food for NextLevel Foodies</h1>
            <p>Taste &amp; share food from all over the world.</p>
          </div>
          <div className="header_button">
            <Link to={'/listing'}> <button>Explore Meals</button></Link>
          </div>
        </div>
      </header>

      <main>
        <section className="footer_content1">
          <h2>How it works</h2><p>NextLevel Food is a platform for foodies to share their favorite recipes with the world. It's a place to discover new dishes, and to connect with other food lovers.</p>
          <p>NextLevel Food is a place to discover new dishes, and to connect with other food lovers.</p>
        </section>
        <section className="footer_content2">
          <h2>Why NextLevel Food?</h2><p>NextLevel Food is a platform for foodies to share their favorite recipes with the world. It's a place to discover new dishes, and to connect with other food lovers.
          </p>
          <p>NextLevel Food is a place to discover new dishes, and to connect with other food lovers.</p>
        </section>
      </main>
    </div>
  )
}

export default Home
