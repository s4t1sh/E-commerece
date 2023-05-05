import {React,useContext, useEffect,useState} from 'react'
import "./navbar.css"
import { NavLink, useNavigate } from 'react-router-dom'
import {LoginContext} from "../context/contextprovider"
import {useSelector} from "react-redux"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const Navbar = () => {

  
  const [text,setText] = useState("")
  const {products} = useSelector(state => state.getproudctsdata);
  console.log(text);
  const [liopen,setLiopen] = useState(true)
  // console.log("hello"+account.carts.length)

  const history = useNavigate();
  let data;

  

  const {account,setAccount} = useContext(LoginContext)

  const getdetailvaliduser = async()=>{
    const res = await fetch("/validuser",{
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      
      credentials: "include"
    });

    data = await res.json();
    // console.log(data);

    if(res.status!==201){
      console.log("error");

    }else{
      console.log("data valid");
      setAccount(data);
    }

  };

  const logoutuser = async()=>{
    const res2 = await fetch("/logout",{
      method: "GET",
      headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
      },
      
      credentials: "include"
    });

    const data2 = await res2.json();
    // console.log(data);

    if(res2.status!==201){
      console.log("error");

    }else{
      console.log("data valid");
      setAccount(false);
      history("/")
    }

  };

  useEffect(()=>{
    getdetailvaliduser()
  },[])
  
  const getText = ((items)=>{
    setText(items);
    setLiopen(false)
  })
  return (
    <div>
        
      <div className="container-fluid">
        <div className="row bg-dark pt-3 pb-3">
            <div className="col text-white fs-4 fw-bold">
              <NavLink to="/">WebMarket</NavLink>  
            </div>
            <div className="col">
                <input className='pt-1 pb-1' type="text" onChange={(e)=>getText(e.target.value)} name="" id="" placeholder='search products...'/>
                <button className='search-btn pb-1 pt-1 ps-2 pe-2'><i className="fa-solid fa-magnifying-glass text-white"></i></button>
            </div>
            {/* search filter */}

            {
              text && <List className='extrasearch' hidden={liopen}>
                {
                  products.filter(product =>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product=>(
                    <ListItem>
                      <NavLink to={`/getproductsone/${product.id}`}></NavLink>
                      {product.title.longTitle}
                    </ListItem>
                  ))
                }
              </List>
            }

            {
              account?"":<div className="col-1 text-center">
              <NavLink to="/login" className='fw-bold'>Sign In</NavLink>
            </div>
            }
            
            <div className="col-2 text-center">
              {
                account?<>
                <i className="fa-solid fa-cart-shopping text-white fs-4"></i>
              
                <NavLink className='text-white fw-bold' to='/buynow'> Cart</NavLink>
                <span className=" badge rounded-pill bg-danger">
                  {account.carts.length}
                </span>
                </>
                :<>
                <i className="fa-solid fa-cart-shopping text-white fs-4"></i>
                <NavLink className='text-white fw-bold' to='/login'> Cart</NavLink>
                </>
                
              }
              
                
            </div>
            <div className="col-1">
              {
                account?<div className='dropdown rounded-pill account-avatar'><button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"><span className='pe-1'>{account.fname[0].toUpperCase()}</span></button>
                <ul class="dropdown-menu ps-4">
                  <li style={{cursor:"pointer"}}>My Account</li>
                  <li style={{cursor:"pointer"}} onClick={logoutuser}>Logout</li>
                </ul>
                </div>
                :<i className="fa-solid fa-user text-white fs-4"></i>
              }
              
            </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar
