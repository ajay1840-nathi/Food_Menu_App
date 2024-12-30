import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import headerimg1 from '../assets/images/curry.jpg'; 
import headerimg2 from '../assets/images/macncheese.jpg';
import headerimg3 from '../assets/images/tomato-salad.jpg';
import headerimg4 from '../assets/images/schnitzel.jpg';
import headerimg5 from '../assets/images/dumplings.jpg';

import '../css/ImageSlide.css'

const ImageSlide = () => {
  const images = [headerimg1, headerimg2, headerimg3,headerimg4,headerimg5];

  return (
    <Carousel className="mainImg">
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="mainImg"
            src={image}
            alt={`Slide ${index}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageSlide;
