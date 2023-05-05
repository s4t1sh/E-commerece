import React,{useContext} from 'react'
import { LoginContext } from '../context/contextprovider'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Option = ({deletedata,get}) => {

  const {account,setAccount} = useContext(LoginContext)

  const removedata = async(req,res)=>{
    try {
      const res = await fetch(`/remove/${deletedata}`,{
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const data = await res.json();
      console.log(data)

      if(res.status===400 || !data){
        console.log("error");
      }else{
        console.log("item deleted");
        setAccount(data);
        toast.success("Item Deleted",{
            position:"top-center",
        })
        get();
      }
    } catch (error) {
      console.log("error" + error);
    }
  }

  return (
    <div>
      <select name="" id="">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <span className='ps-3 text-danger' style={{cursor:"pointer"}} onClick={()=>{removedata(deletedata)}}>Delete </span>
      <span className='ps-3 text-success'>Save or Later </span>
      <span className='ps-3 text-primary'>See More like this </span>
      <ToastContainer/>
    </div>
  )
}

export default Option
