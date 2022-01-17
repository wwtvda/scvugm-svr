var express = require('express');
const { send } = require('express/lib/response');
const { findOne } = require('../schema/tracing.js');
var router = express.Router();
const app = express()
const port = 4000

const Tracing = require('../schema/tracing.js');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
})

router.put('/tracing/:id', async function (req, res) {
  const tracingId = req.params.id
  const tracing = await Tracing.findOne({ _id: tracingId })
  console.log(tracingId)
  if(!tracing) return res.sendStatus(404)
  if(tracing.tempat !== req.body.tempat) tracing.tempat = req.body.tempat
  if(tracing.deskripsi !== req.body.deskripsi) tracing.deskripsi = req.body.deskripsi
  const updateTracing = await Tracing.findOneAndUpdate({_id: tracingId}, tracing)
  res.send('Successfully update tracing case');
})



router.delete('/tracing/:id', async function (req, res) {
  const tracingId = req.params.id
  const tracing = await Tracing.findOne({ _id: tracingId })
  if(!tracing) return res.sendStatus(404)
  await Tracing.deleteOne({ _id: tracingId });
  res.send('Successfully delete tracing case');
})


app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

module.exports = router;