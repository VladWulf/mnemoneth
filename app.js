const express = require('express');
const app = express();


app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index')
})


app.listen(3000, 'localhost', () => {
  console.log('listening from http://localhost:3000')
})
