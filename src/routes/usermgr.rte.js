var express = require('express');
const { send } = require('express/lib/response');
const { findOne } = require('../schema/usermgr.js');
var router = express.Router();
const app = express()
const port = 4000

const Usermgr = require('../schema/usermgr.js');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
    user_type: user_type
  });
  await usermgr.save()
  res.send('Successfully adding user case');
})

router.put('/usermgr/:id', async function (req, res) {
  const usermgrId = req.params.id
  const usermgr = await Usermgr.findOne({ _id: usermgrId })
  console.log(usermgrId)
  if(!usermgr) return res.sendStatus(404)
  if(usermgr.username !== req.body.username) usermgr.username = req.body.username
  if(usermgr.password !== req.body.password) usermgr.password = req.body.password
  if(usermgr.holder_name !== req.body.holder_name) usermgr.holder_name = req.body.holder_name
  if(usermgr.user_type !== req.body.user_type) usermgr.user_type = req.body.user_type
  const updateUsermgr = await Usermgr.findOneAndUpdate({_id: usermgrId}, usermgr)
  res.send('Successfully update user case');
})



router.delete('/usermgr/:id', async function (req, res) {
  const usermgrId = req.params.id
  const usermgr = await Usermgr.findOne({ _id: usermgrId })
  if(!usermgr) return res.sendStatus(404)
  await Usermgr.deleteOne({ _id: usermgrId });
  res.send('Successfully delete usermgrtion case');
})


app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })

module.exports = router;