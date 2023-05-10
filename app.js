require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const indexRouter = require('./routes/index')

app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
// app.use(express.static(__dirname 'public'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 9999, console.log('App running on port 9999'))