const mongoose = require('mongoose');

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


const patient = new patientNew({
    nama_pasien: 'Caroline Hapsari',
    nik: 3202292602990003,
    jenis_kelamin: 'Perempuan',
    alamat: 'Kpg. Gegerkalong Hilir No. 869, Singkawang 60291, SulBar',
    no_hp: 089700766679,
    onset: "11022021",
    status: 'suspek',
    tindakan: 'Isolasi Mandiri'
 });
patient.show(); // "Meow name is fluffy"

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    const showData = await patientNew.find();
    await patientNew.find({ name: /^patient/ });
    await patient.save();
    console.log(showData);
}