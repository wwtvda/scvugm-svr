var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();
const app = express()
const port = 4000



const Isola = require('../schema/isola.js');



router.get('/isola', async function (req, res) {
  const data = await Isola.find();
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

/* 
router.post('/isola', function (req, res) {
  res.send('adding isolation case');
})

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