import { Schema, model } from 'mongoose';



const userSchema = new Schema({
    name: String,
    email: String,
    googleId: String
}, {
    timestamps: true // need to have googleId on my userSchema
});

export default model('User', userSchema);
