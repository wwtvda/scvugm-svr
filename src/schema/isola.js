const mongoose = require('mongoose');

const date = new Date();

//Membuat Skema baru
const isolaSchema = new mongoose.Schema({
    lokasi: String,
    masuk: Date,
    keluar: Date,
    status: String,
});

isolaSchema.methods.show = function show() {
    const greeting = this.lokasi
      ? "New isolation added : " + this.lokasi
      : "no isolation added";
    console.log(greeting);
  };

//membuat model baru
const isolaNew = mongoose.model('isolaNew', isolaSchema);

/* 
 const isola = new Isola({
    masuk: date,
    keluar: date,
    status: 'Selesai Isolasi',
 });
isola.show(); // Show Entry
*/

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    /*
    const showData = await isolaNew.find();
    await isolaNew.find({ name: /^isola/ });
    await isola.save();
    console.log(showData);
    */
}

module.exports = isolaNew;