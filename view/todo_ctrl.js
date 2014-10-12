var app = angular.module('TodoApp', []);
app.controller('TodoCtrl', function($scope, $http) {
	$scope.perons = [];
	$http.get('http://localhost:8081/spring4mvc/rest/persons').success(function(data) {
    	$scope.persons = data;
    	//alert(data);
  	});

	$scope.message = 'Angular is pretty cool.';

	$scope.done = function(persons) {
    	var indexOf = $scope.persons.indexOf(person);
    	if (indexOf !== -1) {
      		$scope.persons.splice(indexOf, 1);
    	}
  	};
  	$scope.newPerson = "";
  	$scope.add = function(e) {
 		if(e.keyCode == 13) {
 		
 		 	//$http.post('http://localhost:8080/newtodo', {name : $scope.newTodo})
			//.success(function(data) {
			//	console.log(data);
			//});

			$http({
	        	method  : 'POST',
	        	url     : 'http://localhost:8080/newperson',
	        	data    : {firstname : $scope.newPerson},  // pass in data as strings
	        	headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
	    	})
	        .success(function(data) {
	            console.log(data);
	        });
            var newPersonObj = {
                id: 1,
                firstname: $scope.newPerson
            }
 			$scope.persons.push({firstname:$scope.newPerson});
 			$scope.newPerson = '';
        }
  	};
});

