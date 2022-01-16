const mongoose = require('mongoose');

const date = new Date();

const patientSchema = new mongoose.Schema({
    nama_pasien: String,
    nik: Number,
    jenis_kelamin: String,
    alamat: String,
    no_hp: Number,
    onset: Date,
    status: String,
    tindakan: String
});

patientSchema.methods.show = function show() {
    const greeting = this.nama_pasien
      ? "New patient added : " + this.nama_pasien
      : "no patient added";
    console.log(greeting);
  };

const patientNew = mongoose.model('patientNew', patientSchema);

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

module.exports = patientNew;