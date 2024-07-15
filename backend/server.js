const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const userRouter = require('./routers/user');

app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is listening @ port ${port}`);
});
