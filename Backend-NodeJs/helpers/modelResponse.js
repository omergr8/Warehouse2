module.exports = {
    success: function( data = {}) {
        return {
            isExecuted: true, message:'Successfully Executed', data 
        };
    },
    failure: function(err={}){
        return {
            isExecuted: false, message:'Failed Execution', err
        };
    },
}