const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Middleware to parse JSON bodies
app.use(express.json());




app.get('/api/getItems',async (res,req) =>{
    try {
        const response = await prisma.items.findMany();
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

app.get('/', (req, res) => {
    res.send('Welcome to my Express server!');
});

const server = app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}!`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

export default app