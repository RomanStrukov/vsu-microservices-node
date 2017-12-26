var housingApp = angular.module("housingApp", []);
housingApp.controller("billsControl", function($scope) {
$scope.bills = [
                    { 'name':'Infosys Technologies',
                    	'employees': 125000,
                    	'headoffice': 'Bangalore'},
                    	{ 'name':'Cognizant Technologies',
	                    	'employees': 100000,
	                    	'headoffice': 'Bangalore'},
	                    	{ 'name':'Wipro',
		                    	'employees': 115000,
		                    	'headoffice': 'Bangalore'},
		                    	{ 'name':'Tata Consultancy Services (TCS)',
			                    	'employees': 150000,
			                    	'headoffice': 'Bangalore'},
			                    	{ 'name':'HCL Technologies',
				                    	'employees': 90000,
				                    	'headoffice': 'Noida'},
                    ];
$scope.addRow = function(){		
	$scope.bills.push({ 'name':$scope.name, 'employees': $scope.employees, 'headoffice':$scope.headoffice });
	$scope.name='';
	$scope.employees='';
	$scope.headoffice='';
};

$scope.removeRow = function(name){				
		var index = -1;		
		var comArr = eval( $scope.bills );
		for( var i = 0; i < comArr.length; i++ ) {
			if( comArr[i].name === name ) {
				index = i;
				break;
			}
		}
		if( index === -1 ) {
			alert( "Something gone wrong" );
		}
		$scope.bills.splice( index, 1 );		
	};
});

housingApp.controller("HttpController", [ '$scope', '$http',
	function($scope, $http) {
		$http({
			method : 'GET',
			url : '/getAllProfiles'
		}).success(function(data, status, headers, config) {
			$scope.profiles = data;
		}).error(function(data, status, headers, config) {
			alert( "failure");
		});
} ])