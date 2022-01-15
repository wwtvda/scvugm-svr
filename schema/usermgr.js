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


const commander = new userNew({
    username: 'komandan1',
    password: 'komandan12354',
    holder_name: 'Rustamadji',
    user_type: ['Commander']
 });
commander.show(); // "Meow name is fluffy"

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
    const showData = await userNew.find();
    await userNew.find({ name: /^commander/ });
    await commander.save();
    console.log(showData);
}