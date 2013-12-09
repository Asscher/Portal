var portalAppControllers = angular.module('portalAppControllers', []);

portalAppControllers.controller("LoginController", function ($scope,$http,$location) {
    $scope.name = 'test';
    $scope.password = 'test';
    $scope.token='token';

    /*if (window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $scope.name =window.localStorage["username"];
        $scope.password = window.localStorage["password"];
    }*/

    $scope.login = function (name, password, loginForm) {
        if(loginForm.$valid){
           //$scope.encrypted = getEncription(name,password,device.uuid);
           $location.url('/news')
            /*$http({method: 'GET', url: baseUrl+ 'api/v1/authenticate', headers: {'ABCPortalServicesCredentials': $scope.encrypted}}).
                success(function(data, status, headers, config) {
                    $scope.token=headers;
                    $scope.url=$http.url;
                    window.localStorage["username"] = name;
                    window.localStorage["password"] = password;

                }).
                error(function(data, status, headers, config) {
                    $scope.token=data +" " + status;
                });
                */
        }
    };
});
/*
app.factory('loginService', function($http, $q) {
    return {
        getToken: function (name, password) {
            var deferred = $q.defer();
            navigator.notification.alert("service" , function () { });
            return $http({method: 'GET', url: baseUrl+ 'api/v1/authenticate', headers: {'ABCPortalServicesCredentials': getEncription(name,password,device.uuid)}}).
                success(function(data, status, headers, config) {
                    deferred.resolve(data);
                    window.localStorage["username"] = name;
                    window.localStorage["password"] = password;

                }).
                error(function(data, status, headers, config) {
                    deferred.resolve(status);
                });
            return deferred.promise;
        }
    }
});
*/

