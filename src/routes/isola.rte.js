var express = require('express');
const { send } = require('express/lib/response');
const { findOne } = require('../schema/isola.js');
var router = express.Router();
const app = express()
const port = 4000

const Isola = require('../schema/isola.js');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get('/isola', async function (req, res) {
  const data = await Isola.find();
  res.json(data);
})


router.post('/isola', async function (req, res) {
  const lokasi = req.body.lokasi;
  const masuk = req.body.masuk;
  const keluar = req.body.keluar;
  const status = req.body.status;

const isola = new Isola({
    lokasi: lokasi,
    masuk: masuk,
    keluar: keluar,
    status: status
  });
  await isola.save()
  res.send('Successfully adding isolation case');
})

router.put('/isola/:id', async function (req, res) {
  const isolaId = req.params.id
  const isola = await Isola.findOne({ _id: isolaId })
  console.log(isolaId)
  if(!isola) return res.sendStatus(404)
  if(isola.lokasi !== req.body.lokasi) isola.lokasi = req.body.lokasi
  if(isola.masuk !== req.body.masuk) isola.masuk = req.body.masuk
  if(isola.keluar !== req.body.keluar) isola.keluar = req.body.keluar
  if(isola.status !== req.body.status) isola.status = req.body.status
  const updateIsola = await Isola.findOneAndUpdate({_id: isolaId}, isola)
  res.send('Successfully update isolation case');
})



router.delete('/isola/:id', async function (req, res) {
  const isolaId = req.params.id
  const isola = await Isola.findOne({ _id: isolaId })
  if(!isola) return res.sendStatus(404)
  await Isola.deleteOne({ _id: isolaId });
  res.send('Successfully delete isolation case');
})


app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

module.exports = router;