import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import svg from '..//assets/react.svg'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,removeToCart,removeSingleItem,emptyAllCard } from '../redux/features/cardSlice';
import { useState } from 'react';
import  toast from 'react-hot-toast';
import {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';

const CardDetails = () => {
    const {carts} = useSelector((state)=>state.allCart)
    const [totalPrice,setTotalPrice] = useState(0)
    const [totalqnuty,setTotalQnuty] = useState(0)
    const dispatch = useDispatch()
  
    //   add to cart
    const handleIncrement = (e)=>{
        dispatch(addToCart(e))
    }
    // remove to single cart
    const hanldeDeleteCard = (e)=>{
        dispatch(removeToCart(e))
        toast.success("item remove from your cart")
    }
    // remove to cart value
    const handleDecrement = (e)=>{
           dispatch(removeSingleItem(e))
    }
    // empty card
    const emptyCard = ()=>{
        dispatch(emptyAllCard())
        toast.success("your cart is empty")
    }
    // countAllTotal
    const Total = ()=>{
        let totalPrice = 0
        carts.map((elem)=>{
            totalPrice = elem.price * elem.qnty + totalPrice
        })
        setTotalPrice(totalPrice)
    }
    const TotalQanty = ()=>{
        let totalqaunty = 0
        carts.map((elem)=>{
            totalqaunty =  elem.qnty + totalqaunty
        })
        setTotalQnuty(totalqaunty)
    }
    useEffect(()=>{
        Total()
    },[Total])
    useEffect(()=>{
        TotalQanty()
    },[TotalQanty])


const handlePayment = async ()=>{
    try {
           console.log("mobin")
        const stripe = await loadStripe("pk_test_51PbFAcRrWbVeSjRYMeRz58atzwgDgZbHMe7eNuIRAUs5ItN2F7pQmO6cvP85yfvHAX5FjHf69hfYkPdnYU80QCr200788kTii4")
        const response = await axios.post("http://localhost:8080/api/payment-checkout",{
            body:JSON.stringify(carts)
        },{
            headers:{
                'Content-Type':"application/json"
            }
        })
        const session = response.data
        console.log(session)
        const result  = stripe.redirectToCheckout({
            sessionId:session.id
        })
        if(result.error){
            console.log(result.error)
        }
    } catch (error) {
        console.log(error)
    }
}






    return (
        <div className='CardDetails'>
            <div className="head">
                <h2>Card Calculation {carts.length > 0 ? `(${carts.length})`:""}</h2>
                {
                    carts.length > 0 
                        ? <button className='btn' onClick={()=>emptyCard()}><MdDelete className='delete' />Empty card</button>
                        : ""
                }
            </div>
            <div className="body">
                <div className="empty">
                    <div>
                        {
                            carts.length === 0 
                                ? <><FaShoppingCart className='Cart' /><h3>Your cart is empty</h3></> 
                                :  <table className="styled-table">
                                <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>Product </th>
                                        <th>Name </th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Assuming arr contains objects with product details */}
                                    {carts.map((item, index) => (
                                        <tr key={index}>
                                            <td><button className='btn1' onClick={()=>hanldeDeleteCard(item.id)}><MdDelete /></button></td>
                                            <td><img src={item.imgdata} alt="" className='imgset' /></td>
                                            <td>{item.dish}</td>
                                            <td className="quantity-control">
                                                <button className='btn decrement' onClick={item.qnty <=1 ? ()=>hanldeDeleteCard(item.id) :()=>handleDecrement(item)}>-</button>
                                                <input type="text" value={item.qnty} readOnly  disabled/>
                                                <button  className='btn increment' onClick={()=>handleIncrement(item)}>+</button>
                                            </td>
                                            <td>${item.price}</td>
                                            <td>${item.qnty * item.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="4">Total Items</td>
                                        <td>{totalqnuty}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="4">Total Price</td>
                                        <td>${totalPrice}</td>
                                        
                                    </tr>
                                    <tr>
                                        <td colSpan="4"><button className='btnPayment' onClick={handlePayment}>Checkout</button></td>
                                      
                                        
                                    </tr>
                                </tfoot>
                              </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetails
