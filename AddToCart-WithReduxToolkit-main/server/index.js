const express = require("express")
const app = express()
const cors = require("cors")
const stripe = require("stripe")("sk_test_51PbFAcRrWbVeSjRYm1RPFf5EOwMbZvo9GWDGGU7W4NDPMNcBVRI52ig7KZHaiASCOLkAlu5Xb32QbMO1gvsS0EKc006WoNRywV")

app.use(express.json())
app.use(cors())


app.post("/api/payment-checkout", async (req, res) => {
    try {

        const products = JSON.parse(req.body.body); 
        console.log(products);  // 

console.log(products);  
       console.log(products)
        const lineItem = products.map((product)=>({
            price_data:{
                currency:"inr",
                product_data:{
                   name:product.dish
                },
                unit_amount: product.price * 100,
            },
            quantity:product.qnty

        }))
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItem,
            mode: 'payment',
            success_url: 'http://localhost:5173/success',
            cancel_url: 'http://localhost:5173/cancel',
        })
        res.json({id:session.id})

    } catch (error) {
        res.status(500).send({
            message: "Error in payment",
            error: error.message
        });
    }
});


app.listen(8080,()=>{
    console.log("server is runing")
})