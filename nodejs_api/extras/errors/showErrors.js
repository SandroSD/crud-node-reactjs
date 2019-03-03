function showErrors(errors, callback){
	let mapaErrores = new Map();
	//console.log("errores", errors);
	errors.map(error => {
		let msgArray = [];
		
		if(mapaErrores.has(error['param'])){
			msgArray.push(mapaErrores.get(error['param']));
			msgArray.push(error['msg']);
			mapaErrores.set(error['param'], msgArray);
		}else{
			mapaErrores.set(error['param'], error['msg']);
		}
	});
	callback([...mapaErrores]);
}

module.exports = showErrors;