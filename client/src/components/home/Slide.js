import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { products } from './productdata';
import "./slide.css"
import {NavLink} from "react-router-dom"

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const Slide = ({title,products}) => {
  return (
    
            <>
                <div className="row">
                    <div className="col text-start">
                        <p className='fs-4 ps-3'>{title}</p>
                    </div>
                    <div className="col"></div>
                    <div className="col text-end">
                        <input type="button" value="View All" className='btn btn-primary'/>
                    </div>
                <hr/>
                </div>
                <div className="row pt-3">
                    <div className="col">
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                        swipeable={true}
                        draggable={false}
                        showDots={false}
                        autoPlay={true}
                        centerMode = {true}
                        autoPlaySpeed={4000}
                        keyBoardControl={true}
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        containerClass="carousel-container"
                    >
                        {
                            products.map((e)=>{
                                return(
                                 <>
                                    <NavLink to={`/getproductsone/${e.id}`}>
                                        <img className='img-fluid product_img' src={e.url} alt=""/>
                                    </NavLink>
                                        <p className="lh-1 mt-3">{e.title.shortTitle}</p>
                                        <p className="lh-1">{e.price.discount}</p>
                                        <p className="lh-1">{e.tagline}</p>
                                  </>
                                )
                            })
                        }
                </Carousel>
                    </div>
                </div>
                
                </>
  )
}

export default Slide
