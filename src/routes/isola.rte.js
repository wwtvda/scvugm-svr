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
  //res.json(data);
})

router.put('/isola/:id', async function (req, res) {
  console.log(req.params)
  const isolaId = req.params.id
  console.log(isolaId)
  const isola = await Isola.findOne({ _id: isolaId })
  if(!isola) return res.sendStatus(404)

  const isola = new Isola({
    lokasi: lokasi,
    masuk: masuk,
    keluar: keluar,
    status: status
  });
  await isola.save()
  res.send('Successfully update isolation case');
})


/**
 *  1. Get the id of the entry that the front end wants to update
    2. Find the entry in the database, given the id
    3. Get the value of what the front end wants the entry to be updated to
    4. Update the entry with that value
    We’ve done similar things to 1 and 2 in DELETE route, and 3 in POST route.
 */

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