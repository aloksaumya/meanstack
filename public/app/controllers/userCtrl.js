angular.module('userControllers',['userServices'])
.controller('regCtrl',function($http,User){
	var app =this;

	this.regUser = function(regData){
		app.loading = true;
		app.errorMsg = false;
		User.create(app.regData).then(function(data){
			console.log(data.data.success);
			console.log(data.data.message);
			if (data.data.success){
				app.loading = false;
				app.successMsg = data.data.message;
			}else{
				app.loading = false;
				app.errorMsg = data.data.message;
			}
		});
	};
});