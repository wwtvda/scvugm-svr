const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    holder_name: String,
    user_type: [String]
});

userSchema.methods.show = function show() {
    const greeting = this.username
      ? "New data added : " + this.username
      : "no data added";
    console.log(greeting);
  };

const userNew = mongoose.model('userNew', userSchema);

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}

module.exports = userNew;