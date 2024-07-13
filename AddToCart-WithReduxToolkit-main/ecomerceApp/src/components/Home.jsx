import React, { useState } from 'react'
import Cardsdata from './CardData'
import { FaStar } from "react-icons/fa6";
import { addToCart } from '../redux/features/cardSlice';
import { useDispatch } from 'react-redux';
import  toast from 'react-hot-toast';

function Home() {
    const [CardData,setCardData] = useState(Cardsdata)
    const dispatch = useDispatch()

    // add to cart
    const send = (e)=>{
        dispatch(addToCart(e))
        toast.success("Item added in your cart")
    }
  return (
    <div>

        <h2 className='heading'>Restaurents Items</h2>

        <section className='allCard'>
            {
                CardData.map((card)=>{
                    return(
                        <div className="card">
                        <div>
                        <img src={card.imgdata} alt="img" />
                        </div>
                     <h3>{card.dish}</h3>
                     <h4> Price :{card.price}$</h4>
                     <h5>Address : {card.address}</h5>
                     <h5>Rating : {card.rating}<FaStar className='star' /></h5>
                     <button onClick={()=>send(card)}>Add to cart</button>
                    </div>
                    )
                })
            }
           
        </section>
    </div>
  )
}

export default Home