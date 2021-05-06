//////////////////////
// DEPENDENCIES
//////////////////////
const express = require('express');


//////////////////////
// APP OBJECT
//////////////////////
const app = express();


//////////////////////
// ROUTES
//////////////////////
app.get("/", (req, res) => {
    //res.json lets us send a response as JSON data
    res.json({
        response: "Hello World"
    });
});


//////////////////////
// LISTENER
//////////////////////

// We chose a non 3000 port because react dev server uses 3000 the highest possible port is 65535
// Why? cause it's the largest 16-bit integer, fun fact!
// But because we are "elite" coders we will use 1337
app.listen(1337, () => console.log("Listening on port 1337"))
