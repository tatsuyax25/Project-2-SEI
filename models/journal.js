import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;
import commentSchema from './comment';

const journalSchema = new _Schema({
    name: String,
    picture: String,
    text: String,
    comments: ['Comment'],
    user: {type: Schema.Types.ObjectId, ref: "User"}
}, {
    timestamps: true
});


export default model('Journal', journalSchema);