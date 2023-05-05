import React, { useContext, useEffect,useState } from 'react'
import './cart.css';
import { useNavigate, useParams } from 'react-router-dom';
import {LoginContext} from "../context/contextprovider"

const Cart = () => {

  const { id } = useParams("");
    // console.log(id);
    const history = useNavigate("");

   const {account,setAccount} = useContext(LoginContext)

    const [inddata, setIndedata] = useState("");

    // console.log([inddata]);

    const getinddata = async () => {
        const res = await fetch(`/getproductsone/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        // console.log(data);

       
        if (res.status !== 201) {
          setIndedata(data);
      } else {
          console.log("ind mila hain");
          
      }
        
    };

    useEffect(() => {
        getinddata();
    }, [id]);


    //add cart function
    const addtocart = async (id) => {
        console.log(id);
        const check = await fetch(`/addcart/${id}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inddata
            }),
            credentials: "include"
        });
        // console.log(check);
        const data1 = await check.json();
        // console.log(data1 +  'ok');


      if(check.status === 401 || !data1){
        history("/login")
        console.log("user invalid")
        
      }else{
        // alert("data added in your cart");
        history("/buynow");
        setAccount(data1);
      }
    }

  return (

    <>
    {inddata && Object.keys(inddata).length &&
      <div className="container-fluid mt-5 p-5">
        <div className="row">
            <div className="col-md text-center">
                <img src={inddata.url} className='product-img' alt="" />
                <div className='mt-3'>
                    <button className='btn btn-warning rounded-pill me-5 pe-5 ps-5' onClick={()=>addtocart(inddata
                      .id)}>Add to cart</button>
                    <button className='btn btn-danger rounded-pill pe-5 ps-5'>Buy Now</button>
                </div>
            </div>
            <div className="col-md">
                <div className='border p-3'>
                    <h3>{inddata.title.shortTitle}</h3>
                    <h4>{inddata.title.longTitle}</h4>
                    <hr />
                    <p>M.R.P.: <del>₹{inddata.price.mrp}</del> </p>
                    <p>Deal of the Day: <span className="text-danger"> ₹{inddata.price.cost}</span></p>
                    <p>You save: <span className="text-danger">₹{inddata.price.mrp - inddata.price.cost} ({inddata.price.discount})</span></p>
                    <p><span className="text-danger">Discount</span>: <b>{inddata.discount}</b></p>
                    <p><span className="fw-bold text-success">FREE Delivery:</span><b>Oct 8-21</b><span className="fw-bold text-success">Details</span></p>
                    <p>Fastest Delivery: Tomorrow 11 AM</p>
                    <p><b>About the Item:</b> {inddata.description}</p>
                </div>
                
            </div>
        </div>
      </div>
}
    </>
  )
}

export default Cart
