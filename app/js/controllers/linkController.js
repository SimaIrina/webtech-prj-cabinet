'use strict'
angular.module('doctorModule').controller('linkController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
    const SERVER = 'https://proiect-final-irinateal.c9users.io'

    let $constructor = () => {
        $http.get(SERVER + '/doctors/' + $stateParams.doctorId)
            .then((response) => {
                $scope.doctor = response.data
                return $http.get(SERVER + '/doctors/' + $stateParams.doctorId + '/pacients')
            })
            .then((response) => {
                $scope.pacients = response.data
            })
            .catch((error) => {
                console.log(error)
            })
    }

    $scope.addPacient = (pacient) => {
        $http.post(SERVER + '/doctors/' + $stateParams.doctorId + '/pacients', pacient)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    $scope.deletePacient = (pacient) => {
        console.log(SERVER + '/doctors/' + $stateParams.doctorId + '/pacients/' + pacient.id);
        $http.delete(SERVER + '/doctors/' + $stateParams.doctorId + '/pacients/' + pacient.id)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    $scope.selected = {}

    $scope.getTemplate = (pacient) => {
        if (pacient.id == $scope.selected.id) {
            return 'edit'
        }
        else {
            return 'display'
        }
    }

    $scope.editPacient = (pacient) => {
        $scope.selected = pacient;
    }
    
    var isShown = false;
    $scope.arata = function() {
        if (isShown) {
            document.getElementById('addPacientForm').style.display = 'none';
            isShown = false;
        }
        else {
            document.getElementById('addPacientForm').style.display = 'block';
            isShown = true;
        }
    }
    $scope.cancelEditing = () => {
        $scope.selected = {}
    }
    $scope.savePacient = (pacient) => {
        $http.put(SERVER + '/doctors/' + $stateParams.doctorId + '/pacients/' + pacient.id, pacient)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }
    $constructor()
}])
