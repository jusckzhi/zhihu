import React from "react";
import "./Banner.css";
import { Carousel } from "antd-mobile";
import { Link } from "react-router-dom";

function Banner(props) {
  const { banner } = props;
  return (
    <div className="banner">
      <Carousel autoplay={false} infinite>
        {banner.map((item) => (
          <Link key={item.id} to="/detail" className="banner-item">
            <img src={item.image} alt="" />
            <p>{item.title}</p>
          </Link>
        ))}
      </Carousel>
    </div>
  );
}
export default Banner;
