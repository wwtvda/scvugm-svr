var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();
const app = express()
const port = 4000

const Patient = require('../schema/patient.js');

router.get('/patient', async function (req, res) {
  const data = await Patient.find();
  res.json(data);
})

/**
 * req.body =
 * {
 *   lokasi: 'baciro selatan',
 *   masuk: '2022/10/11',
 *   keluar: '2022/10/20',
 *   status: 'Selesai Isolasi'
 * }
 */

router.post('/patient', async function (req, res) {
  const nama_pasien = req.body.nama_pasien;
  const nik = req.body.nik;
  const jenis_kelamin = req.body.jenis_kelamin;
  const alamat = req.body.alamat;
  const no_hp = req.body.no_hp;
  const onset = req.body.onset;
  const status = req.body.status;
  const tindakan = req.body.tindakan;

const patient = new Patient({
    nama_pasien: nama_pasien,
    nik: nik,
    jenis_kelamin: jenis_kelamin,
    alamat: alamat,
    no_hp: no_hp,
    onset: onset,
    status: status,
    tindakan: tindakan
  });
  await patient.save()
  res.send('Successfully adding patient case');
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