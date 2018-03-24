let express = require('express'),
    app = express();

app.get('/', (req, res) =>{
    // res.sendFile("./build/index.html")
    res.sendFile("build/index.html")

})

app.listen(3000, () => {
    console.log("server started")
})
