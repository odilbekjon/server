const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
app.use(cors())
const { read, write } = require('./lib/FS')

app.use(express.json())


// for PRODUCTS - 1 

app.get('/products', (req, res) => {
    const { shopId } = req.query

    if(shopId) {
        const data = read(path.resolve('./model/products.json'))
        return res.send(data.filter(e => e.shopID == shopId))
    }

    const data = read(path.resolve('./model/products.json'))
    res.send(data)
})

app.get('/products/:id', (req, res) => {
    const { id } = req.params
    res.writeHead(200, options)
    res.send(read(path.resolve('./model/products.json')).find(e =>  e.id == id))
})

app.post('/newProduct', (req, res) => {
    const {name, price, shopID, url} = req.body
    const foundData = read(path.resolve('./model/products.json'))
    foundData.push({id:foundData.length + 1, name, price, shopID, url })

    write(path.resolve('./model/products.json'), foundData)

    res.send("POST") 
})

app.put('/products', (req, res) => {
    const {id, name, price, url } = req.body
    const arr = read(path.resolve('./model/products.json'))
    // const findIndex = arr.findIndex(e => e.id == id)
    const find =  arr.find(e => e.id == id)

    find.name = name ? name : find.name
    find.price = price ? price : find.price
    find.url = url ? url : find.url
    // arr.splice(findIndex , 1 , find)
    write(path.resolve('./model/products.json'), arr)
    
    res.send("PUT")
})

app.delete('/products', (req, res) => {
    const { id } = req.body
    const arr = read(path.resolve('./model/products.json'))
    const findIndex = arr.findIndex(e => e.id == id)
    arr.splice(findIndex, 1)
    write(path.resolve('./model/products.json'), arr)
    res.send("DELETE")
})

// for SHOPS - 2

app.get('/shops', (req, res) => {
    res.send(read(path.resolve('./model/shops.json')))
})

app.get('/shops/:id', (req, res) => {
    const { id } = req.params
    res.send(read(path.resolve('./model/shops.json')).find(e =>  e.id == id))
})

app.post('/shops', (req, res) => {
    const { name, number, category} = req.body
    const foundData = read(path.resolve('./model/shops.json'))
    foundData.push({id:foundData.length + 1,  name, number, category })

    write(path.resolve('./model/shops.json'), foundData)

    res.send("POST") 
})

app.put('/shops', (req, res) => {
    const {id, name, category } = req.body
    const arr = read(path.resolve('./model/shops.json'))
    const findIndex = arr.findIndex(e => e.id == id)
    const find =  arr.find(e => e.id == id)

    find.name = name ? name : find.name
    find.category = category ? category : find.category
    arr.splice(findIndex , 1 , find)
    write(path.resolve('./model/shops.json'), arr)
    
    res.send("PUT")
})

app.delete('/shops', (req, res) => {
    const { id } = req.body
    const arr = read(path.resolve('./model/shops.json'))
    const findIndex = arr.findIndex(e => e.id == id)
    arr.splice(findIndex, 1)
    write(path.resolve('./model/shops.json'), arr)
    res.send("DELETE")
})


app.get('/shopInfo/:id', (req, res) => {
    const { id } = req.params
    const products = read(path.resolve('./model/products.json'))
    const shops = read(path.resolve('./model/shops.json'))
    const shopProducts = products.filter(e => e.shopId == id)
    const shop = shops.find(e => e.id == id)

    if (shop) {
        if (shopProducts.length) {
            shop.products = shopProducts
        }
        res.send(shop)
    }
    else {
        res.sendStatus(400)
    }
})

app.listen(8000, console.log("Worked"))