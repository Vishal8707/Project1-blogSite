let obj ={
    name:"Aradhy",
    lastName:"sharma",
    Age: 21
}

console.log({...obj});
const saveData = await authorModel.find({...obj, isdeleted: false})