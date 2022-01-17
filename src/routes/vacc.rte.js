var express = require('express');
const { send } = require('express/lib/response');
const { findOne } = require('../schema/vacc.js');
var router = express.Router();
const app = express()
const port = 4000

const Vacc = require('../schema/vacc.js');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get('/vacc', async function (req, res) {
  const data = await Vacc.find();
  res.json(data);
})


router.post('/vacc', async function (req, res) {
  const pelaksana = req.body.pelaksana;
  const tanggal = req.body.tanggal;
  const lokasi = req.body.lokasi;
  const jenis = req.body.jenis;
  const jumlah = req.body.jumlah;
  const total = req.body.total;
  const deskripsi = req.body.deskripsi;

const vacc = new Vacc({
    pelaksana: pelaksana,
    tanggal: tanggal,
    lokasi: lokasi,
    jenis: jenis,
    jumlah: jumlah,
    total: total,
    deskripsi: deskripsi
  });
  await vacc.save()
  res.send('Successfully adding vaccination case');
})

router.put('/vacc/:id', async function (req, res) {
  const vaccId = req.params.id
  const vacc = await Vacc.findOne({ _id: vaccId })
  console.log(vaccId)
  if(!vacc) return res.sendStatus(404)
  if(vacc.pelaksana !== req.body.pelaksana) vacc.pelaksana = req.body.pelaksana
  if(vacc.tanggal !== req.body.tanggal) vacc.tanggal = req.body.tanggal
  if(vacc.lokasi !== req.body.lokasi) vacc.lokasi = req.body.lokasi
  if(vacc.jenis !== req.body.jenis) vacc.jenis = req.body.jenis
  const updateVacc = await Vacc.findOneAndUpdate({_id: vaccId}, vacc)
  res.send('Successfully update vaccination case');
})



router.delete('/vacc/:id', async function (req, res) {
  const vaccId = req.params.id
  const vacc = await Vacc.findOne({ _id: vaccId })
  if(!vacc) return res.sendStatus(404)
  await Vacc.deleteOne({ _id: vaccId });
  res.send('Successfully delete vacction case');
})


app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

module.exports = router;