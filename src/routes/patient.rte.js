var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();
const app = express()
const port = 4000

const Patient = require('../schema/patient.js');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

router.get('/patient', async function (req, res) {
  const data = await Patient.find();
  res.json(data);
})

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
})

router.put('/patient/:id', async function (req, res) {
  const patientId = req.params.id
  const patient = await Patient.findOne({ _id: patientId })
  console.log(patientId)
  if(!patient) return res.sendStatus(404)
  if(patient.nama_pasien !== req.body.nama_pasien) patient.nama_pasien = req.body.nama_pasien
  if(patient.nik !== req.body.nik) patient.nik = req.body.nik
  if(patient.alamat !== req.body.alamat) patient.alamat = req.body.alamat
  if(patient.no_hp !== req.body.no_hp) patient.no_hp = req.body.no_hp
  if(patient.onset !== req.body.onset) patient.onset = req.body.onset
  if(patient.status !== req.body.status) patient.status = req.body.status
  if(patient.tindakan !== req.body.tindakan) patient.tindakan = req.body.tindakan
  const updatePatient = await Patient.findOneAndUpdate({_id: patientId}, patient)
  res.send('Successfully update patient case');
})

router.delete('/patient/:id', async function (req, res) {
  const patientId = req.params.id
  const patient = await Patient.findOne({ _id: patientId })
  if(!patient) return res.sendStatus(404)
  await Patient.deleteOne({ _id: patientId });
  res.send('Successfully delete patient case');
})

app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

module.exports = router;