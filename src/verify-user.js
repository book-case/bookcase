module.exports = (req, res, next) => {
	res.locals.verify = () => {
		//TODO add authentications
		if(!req.session.user){
			return req.session.user;
		}
		return false;
	};

	next();
};
