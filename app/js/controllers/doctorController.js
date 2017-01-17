'use strict'
const ctrl = angular.module('doctorModule', ['ui.router'])

const SERVER = 'https://proiect-final-irinateal.c9users.io'
ctrl.controller('doctorController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    let $constructor = () => {
        $http.get(SERVER + "/doctors")
            .then((response) => {
                $scope.doctors = response.data
            })
            .catch((error) => {
                console.log(error)
            })
    }
    $scope.addDoctor = (doctor) => {
        $http.post(SERVER + "/doctors", doctor)
            .then((response) => {
                $state.go($state.current, {}, {
                    reload: true
                })
            })
    }
    
    $scope.deleteDoctor = (doctor) => {
        $http.delete(SERVER + "/doctors/" + doctor.id)
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

    $scope.editDoctor = (doctor) => {
        $scope.selected = doctor
    }
    $scope.cancelEditing = () => {
        $scope.selected = {}
    }
    $scope.getTemplate = (doctor) => {
        if (doctor.id == $scope.selected.id) {
            return 'edit'
        }
        return 'display'
    }
    $scope.saveDoctor = (doctor) => {
        $http.put(SERVER + '/doctors/' + doctor.id, doctor)
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
