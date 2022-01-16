var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();
const app = express()
const port = 4000

const Vacc = require('../schema/vacc.js');

router.get('/vacc', async function (req, res) {
  const data = await Vacc.find();
  res.json(data);
})

router.post('/vacc', async function (req, res) {
  const pelaksana = req.body.pelaksana;
  const tanggal = req.body.tanggal;
  const lokasi = req.body.lokasi;
  const jenis = req.body.jenis;
  const jumlah = req.body.alamat;
  const total = req.body.total;
  const deskripsi = req.body.deskripsi;

//input new entry
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