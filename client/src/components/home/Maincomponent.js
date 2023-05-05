import React, { useEffect } from 'react'
import Banner from './Banner'
import Slide from './Slide'
import { getProducts } from '../redux/action/action'
import {useDispatch,useSelector} from "react-redux"

const Maincomponent = () => {

  const {products} = useSelector(state => state.getproudctsdata);
  console.log(products);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getProducts());
  },[dispatch]);
  return (
    <>
        <Banner/>
        <div className="container-fluid mt-3 mb-3">
          <div className="row">
            <div className="col-9 pt-4 shadow-lg">
              <Slide title="Deal of the day" products={products}/>
            </div>
            <div className="col ms-3 me-3 shadow-lg text-center pb-3">
                <h4 className='pt-3 pb-3'>Festive latest launches</h4>
                <img className='img-fluid pb-3' src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/Wireless/Jupiter/Launches/T3/DesktopGateway_CategoryCard2x_758X608_T3._SY608_CB639883570_.jpg" alt="rightimg" />
                <a href="#">See More</a>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-3 mb-3">
          <div className="row">
            <div className="col pt-4 shadow-lg">
              <Slide title="Today's Deal" products={products}/>
            </div>
          </div>
        </div>

      <div className="container-fluid text-center">
        <div className="row">
          <div className="col"><img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" className='img-fluid' alt="" /></div>
        </div>
        
      </div>

      <div className="container-fluid mt-3">
          <div className="row">
            <div className="col pt-4 shadow-lg">
              <Slide title="Best Seller" products={products}/>
            </div>
          </div>
        </div>

        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col pt-4 shadow-lg">
              <Slide title="Upto 80% off" products={products}/>
            </div>
          </div>
        </div>

    </>
    
  )
}

export default Maincomponent
