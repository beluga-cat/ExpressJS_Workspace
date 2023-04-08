const path = require('path');
const PORT = process.env.PORT || 3500;
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Yello');
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // nodejs_webserver/views/index.html
})

app.get('/lmao', (req, res) => {
    res.send('LMAO');
})

app.get('/old-page(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
})

app.get('/*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

// Chaining of Route Handlers
app.get('/', (req, res, next) => {
    console.log("Attempted to Print");
    next();
}, (req, res, next) => {
    res.send('Hello World!');
})



// Chaining of route Handlers via Arrays
const one = (req, res, next) => {
    console.log("One");
    next();
}

const two = (req, res, next) => {
    console.log("Two");
    next();
}

const three = (req, res, next) => {
    console.log("three");
    next();
}

app.get('/chain(.html)?', [one, three, two]);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));