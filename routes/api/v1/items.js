const router = require('express').Router()
const {getCollection, ObjectId} = require('../../../dbconnect')


//getting collection
let collection = null
const getFoodItemsCollection = async () => {
    if(!collection) collection = await getCollection('FoodTruckAPI', 'FoodTruckItems')
        return collection
}

//API to return JSON object that has menu items
router.get('/menu', async (request, response) => {
    console.log("works")
    const collection = await getFoodItemsCollection()
    const found = await collection.find().toArray()
    response.send(found)


})

//API to return JSON object that contains menu item with specificied ID
router.get('/menu/:id', async (request, response) => {
    const { id } = request.params

    const collection = await getFoodItemsCollection()
    const found = await collection.findOne({_id: new ObjectId(id)})
    if(found)
        response.send(found)

    //find the associated menu item information

    
})

router.post('/menu', async (request, response) => {
    const { name, description, price } = request.body
    const collection = await getFoodItemsCollection()

    const result = await collection.insertOne({name, description, price })
    console.log(result)
    response.send('done')

})

module.exports = router