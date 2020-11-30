const express = require('express');
const body = require('body-parser');

const app1 = express();
const app2 = express();

const PORT1 = 3000;
const PORT2 = 3001;

app1.use(body.json());
app2.use(body.json());

// Handles each request based on it's appropriate instance
const handler = serverNum => (req, res) => {
    console.log(`server ${serverNum} | ${req.method} | ${req.url} | ${req.body}`);
    res.send({message: `Response from server ${serverNum}`});
}

app1.get('*', handler(1));
app1.post('*', handler(1));

app2.get('*', handler(2));
app2.post('*', handler(2));

app1.listen(PORT1, () => { console.log(`server 1 started on port: ${PORT1}`)});
app2.listen(PORT2, () => { console.log(`server 2 started on port: ${PORT2}`)});