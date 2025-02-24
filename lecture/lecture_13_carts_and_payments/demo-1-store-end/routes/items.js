import express from 'express';
var router = express.Router();

router.get('/', async(req, res) => {
    // get from db
    console.log("db")
    let allItems = await req.models.Item.find()
    // return
    res.json(allItems)
})

router.post('/saveCart', async (req, res) => {
    console.log("saving cart, session currently is: ", req.session);
    // itemCount
    // itemId
    let cartInfo = req.body;
    // TODO: make sure cart only has ids and counts
    req.session.cartInfo = JSON.stringify(cartInfo);
    console.log("updated session is now: ", req.session)
    res.json({status: "success"})
})

router.get('/getCart', async(req, res) => {
    // check for session cart info, if there is none, return empty array
    if(!req.session || !req.session.cartInfo){
        res.json([])
        return
    }
    // get cart info: count + db lookup for price, then combine
    let cartInfo  = JSON.parse(req.session.cartInfo);
    let combinedCartInfo = await addPricesToCart(cartInfo, req.models);
    res.json(combinedCartInfo);
})

router.post('/create-payment-intent', async(req, res) => {
    // look up the order amount
    let orderAmount = await calculateOrderAmount(req);

    //create a paymentintent object with order amount
    const paymentIntent = await req.stripe.paymentIntents.create({
        amount: orderAmount * 100, // USD = US cents
        currency: "usd",
        automatic_payment_methods: {
            enabled: true
        }
    })
    //send
    res.send({
        clientSecret: paymentIntent.client_secret,
    })

})

async function calculateOrderAmount(req){
    // get cart info
    let cartInfo = JSON.parse(req.session.cartInfo);
    // combine with price info
    let combinedCartInfo = await addPricesToCart(cartInfo, req.models)
    //calculate and return total cost
    let totalCost = await combinedCartInfo.map(item => item.price +item.itemCount).reduce((prev, curr) => prev + curr)
    return totalCost;
}

async function addPricesToCart(cartInfo, models){
    // cartInfo should be shaped like this [{itemId:234, itemCount:2}, {itemId:204, itemCount:1}]
    // look up all items listed in the cart
    let cartItemIds = cartInfo.map(cartItem => cartItem.itemId);
    let itemsInfo = await models.Item.find().where("_id").in(cartItemIds).exec()

    // transform into an object where you can look up by id
    let itemsInfoById = {};
    itemsInfo.forEach(itemInfo => {
        itemsInfoById[itemInfo._id] = itemInfo
    })

    // take the cartInfo and make a new object that includes name and price
    let combinedCartInfo = cartInfo.map(cartItem => {
        return {
            itemId: cartItem.itemId, //from user cart
            itemCount: cartItem.itemCount, // from user cart
            name: itemsInfoById[cartItem.itemId].name, // from db
            price: itemsInfoById[cartItem.itemId].price // from db
        }
    })
    return combinedCartInfo;
}

export default router;
