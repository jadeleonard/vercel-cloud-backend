const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

app.get('/api/getitems', async (req, res) => {
    try {
        const response = await prisma.items.findMany();
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/carousel',async (res,req) =>{
        try {
            const response = await prisma.carousel.findMany();
            if(response.ok){
                res.json(response)
            }
        } catch (error) {
            console.log(error)
        }
})
app.get('/api/navbar', async (req, res) => {
    try {
        const navbarItems = await prisma.navbar.findMany();
        res.json(navbarItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Set the origin to your frontend URL

    res.setHeader('Access-Control-Allow-Origin', 'https://cloud-mount-git-main-lukabartos-projects.vercel.app/api/navbar'); 
    res.setHeader('Access-Control-Allow-Origin', 'https://cloud-mount.vercel.app/'); 
    res.setHeader('Access-Control-Allow-Origin', 'https://cloud-mount-3y2nneodq-lukabartos-projects.vercel.app'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE','get','post','delete'); // Allow specific HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    next();
  });
  
// Get details for a single item by ID
app.get('/api/getitems/:id', async (req, res) => {
    const id = parseInt(req.params.id);q
    try {
        const item = await prisma.items.findUnique({
            where: { id }
        });
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/createitem', async (req, res) => {
    const { name, description, price, seller, image } = req.body;
    try {
        const response = await prisma.items.create({
            data: { name, description, price, seller, image }
        });
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



const welcome = {
    "title": "Welcome to This page and This the official API for cloud page"
};
// Update an item
app.put('/api/updateitem/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description, price, seller, image } = req.body;
    try {
        const updatedItem = await prisma.items.update({
            where: { id },
            data: { name, description, price, seller, image }
        });
        res.json(updatedItem);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an item
app.delete('/api/deleteitem/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.items.delete({
            where: { id }
        });
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.send(welcome);
});

const server = app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}!`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
