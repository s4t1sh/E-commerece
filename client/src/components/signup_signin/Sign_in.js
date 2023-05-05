import React, { useState,useContext, useEffect } from 'react'
import "./sigin.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/contextprovider';

const Sign_in = () => {
    const [logdata,setData] = useState({
        email : "",
        password : "",
    });
    
    const history = useNavigate();
    const {account,setAccount} = useContext(LoginContext)

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
        e.preventDefault();
        const {email,password} = logdata;
        const res = await fetch("/login",{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email,password
            })
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 400 || !data){
            console.log("Invalid details")
            toast.warn("Invalid details",{
                position:"top-center",
            })
        }else{
            console.log("data valid");
            setAccount(data)
            history("/")
            toast.success("Signup successful",{
                position:"top-center",
            })
            setData({...logdata,email:"",password:""})
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
                        <h3>Sign-In</h3>
                        <form method='post'>
                            <div className="mb-3 mt-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" name="email" onChange={adddata} value={logdata.email}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" name="password" placeholder='Atleast 6 characters' onChange={adddata} value={logdata.password}/>
                            </div>
                        <div className="d-grid gap-2 mt-3">
                            <button className="rounded signin-btn" type="button" onClick={senddata}>Continue</button>
                        </div>
                        </form>
                    </div>
                    <ToastContainer />
                    <div className="text-center mt-3">
                        <p>New to WebMarket?</p>
                        <NavLink to="/register" className='btn ps-3 pe-3 rounded text-dark pt-1 pb-1 create-btn'>Create New WebMarket Account</NavLink>
                    </div>
                    
                </div>
                <div className="col"></div>
            </div>
        </div>
    </>
  )
}

export default Sign_in
