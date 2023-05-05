import React, { useEffect, useState } from 'react'
import Option from './Option'
import './buynow.css'

const Buynow = () => {
    let totalPrice = 0,count=0;

    const [cartdata,setCartdata] = useState("");
    console.log(cartdata.carts)

    const getdatabuy = async()=>{
        const res = await fetch("/cartdetails",{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"    
        });

        const data = await res.json();

        if(res.status !== 201){
            console.log("error");
        }else{
            setCartdata(data.carts);
        }
    }

    useEffect(()=>{
        getdatabuy();
    },[])

  return (
    <>
    { cartdata ?
    <div className="container-fluid mt-5 ps-5 pe-5">
        <div className="row ">
            <div className="col-md-7 shadow-lg p-3">
                <h4>Shopping Cart</h4>
                <p className='text-success'>Select all items</p>
                <p className='text-end text-secondary lh-1'>Price</p>
                <hr />

                {
                    cartdata.map((e,k)=>{
                        
                            totalPrice+=e.price.cost
                            count++
                        return(
                            <>
                            
                            <div className="row">
                            <div className="col-3">
                                <img className='img-fluid' src={e.url} alt="" />
                            </div>
                            <div className="col ps-5">
                                <h3>{e.title.longTitle}</h3>
                                <h3>{e.title.shortTitle}</h3>
                                <p className="text-danger">Usually dispatched in 8 days</p>
                                <p>Eligible for FREE Shipping</p>
                                <Option deletedata={e.id} get={getdatabuy}/>
                                
                            </div>
                            <div className="col-2 text-end">
                                <b>₹{e.price.cost}</b>
                            </div>
                        </div>
                        <hr/>
                            </>
                        )
                    })
                }
                <p className='text-end'>Subtotal ({count} items): <b>₹{totalPrice}.00</b></p>
                </div>
                <div className="col-md mt-5 ms-3 ">
                            <div className='shadow-lg p-3'>
                                <p className="text-success">Your order us eligible for FREE Delivery</p>
                                <p>Select this option at checkout Details</p>
                                <h4>Subtotal({count} items): <b>₹{totalPrice}.00</b></h4>
                                <button className='rounded btn ps-5 pe-5 buy-btn mt-3'>Proceed to Buy</button>
                                
                            </div>
                </div>
        </div>
    </div> : ""
    }
    </>
  )
}

export default Buynow
