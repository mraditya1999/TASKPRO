const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const utils = require('./utils');
const config = require('./config');
const jwt = require('jsonwebtoken')

app.use(cors());
app.use(express.json());

app.use( (req, res, next) => {
    const skipUrls = [ '/user/register', '/user/login' ]
    if ( skipUrls.findIndex( (item) => item == req.url ) != -1 )
        {
            next()
        }
    else {
        const token = req.headers.token
        // console.log(token)
        if (!token) {
            res.send(utils.createError('Missing token'))
        }
        else {
            try {
                const payload = jwt.verify(token, config.secret, { expiresIn: '1h' })
                // console.log("payload",payload)
                req.data = payload
                next()
            } catch (ex) {
                res.send(utils.createError('Invalid token'))
                console.log(ex)
            }
        }
    }
} )

// app.use( (req, res, next) => {
//     const skipUrls = [ '/user/register', '/user/login' ]
//     if (skipUrls.findIndex((item)=> item == req.url) != -1)
//     {
//         next()
//     }
//     else{
//         const token = req.headers.token
//         if (!token){
//             res.send(utils.createError('Missing token'))
//         }
//         else{
//             try {
//                 const payload = jwt.verify(token, config.secret)
//                 req.data = payload
//                 next()
//             } catch (error) {
//                 res.send(utils.createError('Invalid token'))
//             }
//         }
//     }
// })

const userRouter = require('./routers/user');
const adminRouter = require('./routers/admin');
const taskDetailRouter = require('./routers/taskdetails');

<<<<<<< HEAD
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/task-details", taskDetailRouter);

=======
app.use('/user', userRouter);
>>>>>>> 5cf032bf8f8a10275d507d2b62702360183d29c0

app.listen(port, () => {
  console.log(`Server is listening @ port ${port}`);
});
