const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/sign-in', (req, res) => {
    console.log(req.body)
    res.send({status: "ok"})
  })

app.post('/api/sign-up', (req, res) => {
  console.log(req.body)
  res.send({status: "ok"})
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})