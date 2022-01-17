const mongoose = require('mongoose');

const date = new Date();

//Membuat Skema baru
const tracingSchema = new mongoose.Schema({
    tempat: String,
    deskripsi: String
});

tracingSchema.methods.show = function show() {
    const greeting = this.lokasi
      ? "New tracingtion added : " + this.lokasi
      : "no tracingtion added";
    console.log(greeting);
  };

//membuat model baru
const tracingNew = mongoose.model('tracingNew', tracingSchema);


main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

module.exports = tracingNew;