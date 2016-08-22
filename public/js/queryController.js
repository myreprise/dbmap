var queryController = angular.module('queryController', ['gservice']);

queryController.controller('queryController', function($scope, $log, $http, $rootScope, gservice){

	//initialize variables
	$scope.formData = {};
	var queryBody = {};

	var startLat = 30.5931, startLong = 114.3054;

	//Functions


	//Query paraments incorporated into a JSON queryBody
	$scope.queryProjects = function(){
		//Assemble queryBody
		queryBody = {
			name: $scope.formData.name,
			developer: $scope.formData.developer,
			city: $scope.formData.city
		};

		//Post the queryBody to the /query POST route to retrieve filtered results
		$http.post('/query', queryBody)
			.success(function(queryResults){

				//Pass the filtered results to the gMaps service and refresh the map
				gservice.refresh(startLat, startLong, queryResults);

				//count the number of records retrieved.
				$scope.queryCount = queryResults.length;

				$scope.queryProjects = queryResults
			})
			.error(function(queryResults){
				console.log('Error ' + queryResults);
			})
	};

});