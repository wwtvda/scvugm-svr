const mongoose = require('mongoose');

const vaccSchema = new mongoose.Schema({
    pelaksana: String,
    tanggal: Date,
    lokasi: String,
    jumlah: Number,
    total: Number,
    deskripsi: String
});

vaccSchema.methods.show = function show() {
    const greeting = this.pelaksana
      ? "New vaccination added : " + this.pelaksana
      : "no vaccination added";
    console.log(greeting);
  };

const vaccNew = mongoose.model('vaccNew', vaccSchema);

const vacc = new vaccNew({
    pelaksana: 'Direktorat SDM',
    tanggal: "20210224",
    lokasi: 'Grha Sabha Pramana',
    jumlah: 500,
    total: 460,
    deskripsi: 'Acara lancar jaya'
 });
vacc.show(); // "Meow name is fluffy"

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    const showData = await vaccNew.find();
    await vaccNew.find({ name: /^vacc/ });
    await vacc.save();
    console.log(showData);
}