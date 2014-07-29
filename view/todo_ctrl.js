var app = angular.module('TodoApp', []);
app.controller('TodoCtrl', function($scope, $http) {
	$scope.todos = [];
	$http.get('http://localhost:8080/todos').success(function(data) {
    	$scope.todos = data;
    	//alert(data);
  	});

	$scope.message = 'Angular is pretty cool.';
	//$scope.todos = [
    //	'Learn Sketch', 
    //	'Look at Dribbble and feel inferior',
    //	'Actually learn how to use the Pen tool'
  	//];
	$scope.done = function(todo) {
    	var indexOf = $scope.todos.indexOf(todo);
    	if (indexOf !== -1) {
      		$scope.todos.splice(indexOf, 1);
    	}
  	};
  	$scope.newTodo = "";
  	$scope.add = function(e) {
 		if(e.keyCode == 13) {
 			$scope.todos.push($scope.newTodo);
 		
 		// 	$http.post('http://localhost:8080/newtodo', $scope.newTodo)
			// 	.success(function(data) {
				
	  //           console.log(data);
			// });
			var data_in = {};
			data_in['id'] = 4;
			data_in['name'] = $scope.newTodo;
			$http({
	        	method  : 'POST',
	        	url     : 'http://localhost:8080/newtodo',
	        	data:  data_in,
	        	//data    : {name:$scope.newTodo},  // pass in data as strings
	        	headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
	        	//headers: {'Content-Type': 'application/json'}
	    	})
	        .success(function(data) {
	            console.log(data);
	        });

 			$scope.newTodo = '';
        }
  	};
});