const router = require('express').Router()
const {getCollection, ObjectId} = require('../../../dbconnect')


//getting collection
let collection = null
const getFoodEventsCollection = async () => {
    if(!collection) collection = await getCollection('FoodTruckAPI', 'FoodTruckEvents')
        return collection
}

//API to return JSON object that has menu items
router.get('/events', async (request, response) => {
    console.log("works")
    const collection = await getFoodEventsCollection()
    const found = await collection.find().toArray()
    response.send(found)

})

//API to return JSON object that contains menu item with specificied ID
router.get('/events/:id', async (request, response) => {
    const { id } = request.params

    const collection = await getFoodEventsCollection()
    const found = await collection.findOne({_id: new ObjectId(id)})
    if(found)
        response.send(found)

    //find the associated menu item information

    
})

router.post('/events', async (request, response) => {
    const { name, location, date, time } = request.body
    const collection = await getFoodEventsCollection()

    const result = await collection.insertOne({name, location, date, time })
    console.log(result)
    response.send('done')

})

module.exports = router;