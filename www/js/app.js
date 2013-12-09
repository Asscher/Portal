'use strict';

var portalApp = angular.module("portalApp", [
        'ngResource',
        'ngRoute',
        'portalAppControllers'
    ])
    .config(function ($routeProvider) {
        $routeProvider.when('/login',
            {
                templateUrl: 'templates/login.html',
                controller: 'LoginController'
            });
        $routeProvider.when('/portal',
            {
                templateUrl: 'portal.html',
                controller: 'LoginController'
            });
        $routeProvider.when('/news',
            {
                templateUrl: 'templates/news.html',
                controller: 'LoginController'
            });
        $routeProvider.when('/settings',
            {
                templateUrl: 'templates/settings.html',
                controller: 'LoginController'
            });
        $routeProvider.otherwise({redirectTo: '/login'});
    });

portalApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);
