const secure = true

const localhttps = require("https-localhost")
const express = require('express')

if(secure){
    app = localhttps()
    console.log("HTTPS")
}else{
    app = express()
    console.log("HTTP running on port 3000")
}

const path = require('path')

app.use(express.static(__dirname + '/public'))
app.use(express.static(path.join(__dirname + '/node_modules')))
app.use('/build/', express.static(path.join(__dirname, 'node_modules/three/build')))
app.use('/jsm/', express.static(path.join(__dirname, 'node_modules/three/examples/jsm')))

app.listen(3000)