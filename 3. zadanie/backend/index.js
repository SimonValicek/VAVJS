const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

const PORT = 8080

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../frontend/build')))

//app.listen(PORT, () => console.log('Server is running at :5050'))

const db = require('./models')


const activities = require('./routes/Activities')
const methods = require('./routes/Methods')
const users = require('./routes/Users')
const commercials = require('./routes/Commercials')
app.use("/activities", activities)
app.use("/methods", methods)
app.use("/registration", users)
app.use("/commercials",commercials)

db.sequelize
    .sync()
    .then(()=>{
        app.listen(PORT,err=>{
            if(err)
                console.log(err)
            console.log('Listening on PORT ',PORT)
        })
})
