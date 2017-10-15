var User 		= require('../models/user');
var jwt 		= require('jsonwebtoken');
var secret 		= 'aloksaumya';
module.exports = function(router){
		// for user registraion 
		// http://localhost:3000/api/users
		router.post('/users',function(req,res){
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;

		//console.log(typeof req.body.username);

			if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == ''){
				res.json({ success: false , message: 'some data went missing!!!'});
			} else{
				user.save(function(err){
					if (err){
						res.json({ success: false , message: 'user already exist!!!'});
					}else{ 
						res.json({ success: true , message: 'user created'});
					}
				});
			}  
	});
	// user login
	// http://localhost:3000/api/authenticate
	router.post('/authenticate', function(req,res){
		User.findOne({ username : req.body.username}).select('email username password').exec(function(err,user){
			if (err) throw err;
			if (!user){
				res.json({ success :false , message: 'could not authenticate user'});
			}else if (user){
				if (req.body.password){
					var validPassword = user.comparePassword(req.body.password);	
				}else{
					res.json({ success: false , message: 'no password provided'});
				}
				
				if (!validPassword){
					res.json({ success: false , message: 'could not authenticate user'});
				}else{
					var token = jwt.sign({ username : user.username, email : user.email} ,secret,{ expiresIn: '24h'});
					res.json({ success: true , message: 'user authenticated' , token : token});
				}
			}
		});
	});

	return router;

}

