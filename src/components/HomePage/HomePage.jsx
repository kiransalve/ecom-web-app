import React, { useEffect, useState } from "react";
import "../../css/HomePage.css";
import { Link } from "react-router-dom";
import image from "../../image/hero.jpg";
import Categories from "./Categories";
import products, { categories } from "../../productData/productData";

const productData = categories;

const data = products;
const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        // Calculate the next index, looping back to 0 if it exceeds the image count
        const nextIndex = (prevIndex + 1) % data.length;
        return nextIndex;
      });
    }, 3000);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  const currentImage = data[currentImageIndex].img;

  return (
    <div className="home-container">
      <div className="homepage">
        <div className="homepage-image">
          <img src={currentImage} alt="" />
        </div>
        <div className="content">
          <p className="title">Crafting Your Dreams onto Walls</p>
          <p className="description">
            Explore a Diverse Selection of Wall Paintings and Decor. Find the
            Perfect Art to Elevate Your Space, with Exclusive Designs and
            Affordable Options
          </p>
          <Link className="shopnow" to="/">
            Shop Now
          </Link>
        </div>
      </div>
      <h2 className="category-title">Category</h2>
      <div className="categories-container">
        {productData.map((item) => {
          return <Categories image={item.img} title={item.category} />;
        })}
      </div>
      <div className="footer"> Kiran Salve &copy; 2023 </div>
    </div>
  );
};

export default HomePage;
