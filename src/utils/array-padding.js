

exports.arrayPadding = (array, length)=>{
   if(array.length === length){
    console.log('no need to modify');
    return array;
   }
   for(let i = 0; i < length - array.length; i++){
    array.push(new Object());
   }
   console.log('new lenght', array.length);
   return array;
}