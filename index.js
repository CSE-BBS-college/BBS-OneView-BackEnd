const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const result = require('./routes/result');
const teacher = require('./routes/teacher')

app.use('/teacher', teacher)
app.use('/', result);

app.listen(5000, () => {
    console.log('Listening on port 5000!');
})


    