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

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

module.export = traceNew