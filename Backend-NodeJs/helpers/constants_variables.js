module.exports = {
	person_name_regex: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
	phone_no_regex: /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/,
	enums: {
		// Types
		types: ['warehouse', 'category', 'product', 'productCategory', 'whProduct', 'shop']
	},
	messages: {

		NoRecordFound: "No Record Found",
		NoRecordsFound: "No Record Found",
		SuccessfulSave: "Save Successfully",
		SuccessfulDeletion: "Deleted Successfully",
		successfullRetrieval: "Data Retrieved Successfully",
		FailedDeletion: "Cound Not Delete the Record",
		invalidPageNo: "Invalid Page No"
		//Firm Model
		
	}
};
