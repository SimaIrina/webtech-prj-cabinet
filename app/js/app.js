'use strict'
const app = angular.module('pacientsApp', [
    'ui.router',
    'linkController'
])
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home')
    $stateProvider
        .state("home", {
            url: '/home',
            templateUrl: 'views/home.html'
        })
        .state('doctors', {
            url: '/doctors',
            templateUrl: 'views/doctors.html',
            controller: 'doctorController'
        })
        .state('link', {
            url: '/doctors/:doctorId/pacients',
            templateUrl: 'views/link.html',
            controller: 'linkController'
        })
        .state('pacients', {
            url: '/pacients',
            templateUrl: 'views/pacients.html',
            controller: 'pacientController'
        })
}])
