import express from 'express'

const app = express();
app.use(express.json());


app.listen(5100, () => {
    console.log("Jay Ganesh !");

})