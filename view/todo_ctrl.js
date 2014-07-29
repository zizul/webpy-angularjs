var app = angular.module('TodoApp', []);
app.controller('TodoCtrl', function($scope, $http) {
	$scope.todos = [];
	$http.get('http://localhost:8080/todos').success(function(data) {
    	$scope.todos = data;
    	//alert(data);
  	});

	$scope.message = 'Angular is pretty cool.';

	$scope.done = function(todo) {
    	var indexOf = $scope.todos.indexOf(todo);
    	if (indexOf !== -1) {
      		$scope.todos.splice(indexOf, 1);
    	}
  	};
  	$scope.newTodo = "";
  	$scope.add = function(e) {
 		if(e.keyCode == 13) {
 		
 		 	//$http.post('http://localhost:8080/newtodo', {name : $scope.newTodo})
			//.success(function(data) {
			//	console.log(data);
			//});

			$http({
	        	method  : 'POST',
	        	url     : 'http://localhost:8080/newtodo',
	        	data    : {name : $scope.newTodo},  // pass in data as strings
	        	headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
	    	})
	        .success(function(data) {
	            console.log(data);
	        });
            var newTodoObj = {
                id: 1,
                name: $scope.newTodo
            }
 			$scope.todos.push({name:$scope.newTodo});
 			$scope.newTodo = '';
        }
  	};
});

