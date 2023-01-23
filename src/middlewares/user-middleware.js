const validateUserAuth = (req, res, next) => {

    //check for mandatory fields like email and password

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Cannot validate user',
            error: 'Missing mandatory parameters in req body'
        });
    }

    //remove unncessary fields from req.body

    const allowedFields = ['name', 'email', 'password'];
    const keys = Object.keys(req.body);
    for (let i = 0; i < keys; i++) {
        if (!allowedFields.includes(keys[i]))
            delete req.body[keys[i]];
    }
    next();
}

module.exports = validateUserAuth
