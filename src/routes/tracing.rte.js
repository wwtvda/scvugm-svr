var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();
const app = express()
const port = 4000

const Tracing = require('../schema/tracing.js');

router.get('/tracing', async function (req, res) {
  const data = await Tracing.find();
  res.json(data);
})

router.post('/tracing', async function (req, res) {
  const tempat = req.body.tempat;
  const deskripsi = req.body.deskripsi;

const tracing = new Tracing({
    tempat: tempat,
    deskripsi: deskripsi,
  });
  await tracing.save()
  res.send('Successfully adding tracing case');
  //res.json(data);
})

/* 

router.put('/isola/:id', function (req, res) {
  res.send('update isolation case');
})

router.delete('/isola/:id', function (req, res) {
   res.send('deletion isolation case');
})
*/
app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

module.exports = router;