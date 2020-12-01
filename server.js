const express = require('express');
const body = require('body-parser');
const request = require('request');

const app1 = express();
const app2 = express();
const server = express();

const PORT = 8080;

const servers = ['http://localhost:3000', 'http://localhost:3001'];
let cur = 0;

app1.use(body.json());
app2.use(body.json());

// Handles each request based on it's appropriate instance
const loadHandler = (req, res) => {
    req.pipe(request({
        url: servers[cur] + req.url
    })).pipe(res);
    cur = (cur + 1) % servers.length;
    console.log(cur);
}

const appHandler = serverNum =>  (req, res) => {
    console.log(`server ${serverNum} | ${req.method} | ${req.url} | ${req.body}`);
    res.send({message: `Response from server ${serverNum}`});
}

app1.get('*', appHandler(1));
app1.post('*', appHandler(1));

app2.get('*', appHandler(2));
app2.post('*', appHandler(2));

server.get('*', loadHandler).post('*', loadHandler);

app1.listen(3000, () => { console.log('server 1 started on port: 3000')});
app2.listen(3001, () => { console.log('server 2 started on port: 3001')});

server.listen(PORT, () => {
    console.log(`main server started on port: ${PORT}`)
});