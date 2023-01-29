


const validateTask = (req, res, next) => {

    if (!req.body.description) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Cannot validate task',
            error: 'Missing mandatory parameters in request body'
        });
    }
    next();

}

module.exports = validateTask;