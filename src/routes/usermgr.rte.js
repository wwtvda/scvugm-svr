var express = require('express');
const { send } = require('express/lib/response');
var router = express.Router();
const app = express()
const port = 4000

const Usermgr = require('../schema/usermgr.js');

router.get('/usermgr', async function (req, res) {
  const data = await Usermgr.find();
  res.json(data);
})

router.post('/usermgr', async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const holder_name = req.body.holder_name;
  const user_type = req.body.user_type;

const usermgr = new Usermgr({
    username: username,
    password: password,
    holder_name: holder_name,
    user_type: user_type,
  });
  await usermgr.save()
  res.send('Successfully adding user case');
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