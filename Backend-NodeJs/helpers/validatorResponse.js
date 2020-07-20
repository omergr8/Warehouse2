module.exports = {

  success: function(message= 'Success', data=null) {
    return { 
      isValid: true,
      message,
      data
    }
  },

  failure: function(message= '') {
    return { 
      isValid: false,
      message
    }
  }
}