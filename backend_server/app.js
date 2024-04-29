const express = require("express")
const app = express();
const cors = require("cors")
const stripe = require("stripe")("sk_test_51PAM9fSEX84BngO54Q0kN2bD5ZSlkgC4w9vMyCuLxEUvio8Y8faxBVjc4Q8oHfgKKtIfHMn4VPAtTeZxtEh78rIx00FiWkOJEy")

// var corsOptions = {
//     origin: "http://localhost:3000"
//   };
  
//   app.use(cors(corsOptions));

app.use(express.json());
app.use(cors());

app.post("https://localhost:7000/api/create-checkout-session",async(req,res) => {
    const {products} = req.body()
    console.log("ppp",products)

    const lineItem = products.map((product) => ({
        price_data:{
            currency:"inr",
            product_data:{
                name:product.dish
            },
            unit_amount:product.price * 100
        },
        quantity:product.qnty
    }))

    const session = await stripe.checkout.sessions.create({
        payments_method_types:["cards"],
        line_items:lineItem,
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancer_url:"http://localhost:3000/cancel"
    })

    res.json({id:session.id})
});

app.listen(7000,() => {
    console.log("server start")
})