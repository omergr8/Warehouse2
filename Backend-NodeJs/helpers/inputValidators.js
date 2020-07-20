const validator = require("validator");

module.exports = {
  validateUrl(url) {
		if (!validator.isURL(url)) {
			return validatorRespnse.failure(messages.invalidURL);
		} else {
			return validatorRespnse.success();
		}
  },
  
  validateIntegerValue(intVal, minVal=1) {
		intVal = String(intVal);
    if (!validator.isInt(intVal, {min: minVal })) {
			return validatorRespnse.failure('');
    } 
    
    else {
			return validatorRespnse.success();
		}
	},
}