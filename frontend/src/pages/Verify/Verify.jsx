import React, { useContext } from 'react'
import './Verify.css'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { StoreContext } from "../../Context/StoreContext.jsx";
import axios from 'axios'
import { useEffect } from 'react'

const Verify = () => {


  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderid")
  const { url } = useContext(StoreContext)
  const navigate = useNavigate();
  
  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", { success, orderId })
      navigate("/myorder");
  }

  useEffect(() => {
    verifyPayment();
  },[])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
