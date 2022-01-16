const mongoose = require('mongoose');

const date = new Date();

const vaccSchema = new mongoose.Schema({
    pelaksana: String,
    tanggal: Date,
    lokasi: String,
    jenis: String,
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
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

module.exports = vaccNew;