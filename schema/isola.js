const mongoose = require('mongoose');

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

const isolaNew = mongoose.model('isolaNew', isolaSchema);


const isola = new isolaNew({
    lokasi: 'Baciro Selatan',
    masuk: "22/02/2022",
    keluar: "31/03/2022",
    status: 'Selesai Isolasi',
 });
isola.show(); // "Meow name is fluffy"

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    const showData = await isolaNew.find();
    await isolaNew.find({ name: /^isola/ });
    await isola.save();
    console.log(showData);
}