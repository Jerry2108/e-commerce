import mongoose from 'mongoose';

const schema = mongoose.Schema;

//create Item Schema
const ItemSchema = new schema({
    title:{
        type: String,
        required: true
    },
    price:{
        type:Number,
        required:true
    },
    date_added:{
        type:Date,
        default:Date.now
    },
    image: String
});

//create item model
const Item = mongoose.model('Item', ItemSchema);

export default Item;