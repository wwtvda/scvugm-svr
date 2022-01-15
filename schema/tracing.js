const mongoose = require('mongoose');

const traceSchema = new mongoose.Schema({
    tempat: String,
    deskripsi: String,
});

traceSchema.methods.show = function show() {
    const greeting = this.tempat
      ? "New trace added : " + this.tempat
      : "no trace added";
    console.log(greeting);
  };

const traceNew = mongoose.model('traceNew', traceSchema);


const tracing = new traceNew({
    tempat: 'Jl. Bungur no. G14 Bulaksumur',
    deskripsi: 'Caroline sebagai suspek pulang dari Luar Negeri',
 });
tracing.show(); // "Meow name is fluffy"

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    const showData = await traceNew.find();
    await traceNew.find({ name: /^tracing/ });
    await tracing.save();
    console.log(showData);
}