'use strict'
angular.module('doctorModule').controller('pacientController', ['$scope', '$http', function($scope, $http) {
    const SERVER = 'https://proiect-final-irinateal.c9users.io'

    let $constructor = () => {
        $http.get(SERVER + "/pacients")
            .then((response) => {
                $scope.pacients = response.data
            })
            .catch((error) => {
                console.log(error)
            })
    }
    
    $scope.getTemplate = (pacient) => {
        return 'display'
    }

    $constructor();
    return 'display';
}])
