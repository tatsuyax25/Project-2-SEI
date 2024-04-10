import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const commentSchema = new _Schema({
    text: String,
    user: {type: Schema.Types.ObjectId, ref: "User"}
}, {
    timestamps: true
});


export default model('Comment', commentSchema);