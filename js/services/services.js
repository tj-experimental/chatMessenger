/**
 * Created by jtony on 2016-09-09.
 */

(function (ng) {
    "use strict";
    var app = ng.module('services', []);

    app.factory('socket', ['$rootScope', function ($rootScope) {
        var socket = io.connect();
        return{
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });

            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if(callback){
                            callback.apply(socket, args);
                        }
                    });
                });

            }
        };
    }]);

})(angular);