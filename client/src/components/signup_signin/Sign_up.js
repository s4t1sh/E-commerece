import React, { useState }  from 'react'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sign_up = () => {

        const [logdata,setData] = useState({
            fname:"",
            email : "",
            mobile:"",
            password : "",
            repass:""
        });
        
        const adddata = (e)=>{
            const {name,value} = e.target;
    
            setData(()=>{
                return{
                    ...logdata,
                    [name]:value
                }
    
            })
        }

        const senddata = async(e)=>{
            e.preventDefault()
            const {fname,email,mobile,password,repass} = logdata;
            const res = await fetch("register",{
                method : "POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    fname,email,mobile,password,repass
                })
            })
            const data = await res.json();
            // console.log(data);

            if(res.status === 422 || !data){
                // alert("No data")
                toast.warn("Invalid details",{
                    position:"top-center",
                })
            }
            else{
                // alert("Signup Successful");
                toast.success("Signup successful",{
                    position:"top-center",
                })
                setData({...logdata,fname:"",email:"",mobile:"",password:"",repass:""});
            }
        }

        
    

  return (
    <>
        <div className="container-fluid text-center mt-5">
            <h3 className='fw-bold'>WebMarket</h3>
        </div>

        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col"></div>
                <div className="col-3">
                    <div className='p-4 border border-secondary-subtle rounded'>
                        <h3>Sign-Up</h3>
                        <form className='form-group fw-bold' method='post'>
                            <div class="mb-3 mt-3">
                                <label htmlFor="fname" class="form-label">Your Name</label>
                                <input type="text" class="form-control" name="fname" onChange={adddata} value={logdata.fname}/>
                            </div>
                            <div class="mb-3 mt-3">
                                <label htmlFor="email" class="form-label">Email</label>
                                <input type="email" class="form-control" name="email" onChange={adddata} value={logdata.email}/>
                            </div>
                            <div class="mb-3 mt-3">
                                <label htmlFor="mobile" class="form-label">Mobile Number</label>
                                <input type="number" class="form-control" name="mobile" onChange={adddata} value={logdata.mobile}/>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="password" class="form-label">Password</label>
                                <input type="password" class="form-control" name="password" placeholder='Atleast 6 characters' onChange={adddata} value={logdata.password}/>
                            </div>
                            <div class="mb-3">
                                <label htmlFor="repass" className="form-label">Re-enter Password</label>
                                <input type="password" class="form-control" name="repass" onChange={adddata} value={logdata.repass}/>
                            </div>
                        <div class="d-grid gap-2 mt-3">
                            <button class="rounded signin-btn" type="button" onClick={senddata}>Continue</button>
                        </div>
                        </form>
                    </div>
                    <ToastContainer />
                    <div className="text-center mt-3">
                        <p>Already Have an Account?<NavLink to="/login" className="text-primary">Sign In</NavLink></p>
                    </div>
                    
                </div>
                <div className="col"></div>
            </div>
        </div>
    </>
  )
}

export default Sign_up
