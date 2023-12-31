
exports.randomDigitGenerator = ()=>{
    const number = Math.floor(100000 + Math.random() * 900000);
    console.log(number);
    return number.toString();
}