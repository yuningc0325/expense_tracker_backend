const mongoose =require('mongoose'),
const Schema= mongoose.Schema();

const currencySchema = new Schema({
    NT:{
        type:String,
    },
    Pound:{
        type:String,
    },
    USD:{
        type:String,
    },
    Euro:{
        type:String,
    },
    Jpy:{
        type:String,
    },
})

const currency = mongoose.model('currency',currencySchema);
module.exports= currency;
