module.exports = (req, res, next) => {
    const verifyError = new Error(res.locals.translator('user.verify'));
    verifyError.status = 403;

    if(!req.session.user) return next(verifyError);
    //TODO add authentications
    next();
};
