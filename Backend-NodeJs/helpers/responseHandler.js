module.exports = {
    success: function(res, data = {}, message = '', status = 200) {
        return res.status(status).json(
            {
                message, data, err:null
            }
        );
    },
    failure: function(res, err={}, message='', status=500){
        return res.status(status).json(
            {
                message, err, data:null
            }
        );
    },
}