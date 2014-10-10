'use strict';

/* Controllers */
(function () {

    angular.module('myApp.controllers', []).
        controller('bento', ['$http', '$scope', '$location',

            function ($http, $scope, $location) {

                var base_url, search, search_services;

                // Add new services here.
                search_services = ['catalog', 'articles', 'dpla', 'services', 'guides'];

                // Always update once on load.
                update_results();

                // Update when a new search term is entered.
                $scope.$on('$locationChangeSuccess', function () {
                    update_results();
                });

                function update_results() {

                    if ($location.search().any) {

                        set_loading_status();

                        base_url = location.protocol + '//' + search_server + '/search-services/';
                        search = '?any=' + $location.search().any;

                        $scope.asyncSelected = $location.search().any;

                        for (var i = 0; i < search_services.length; i++) {
                            fetch(search_services[i]);
                        }
                    } else {
                        for (var i = 0; i < search_services.length; i++) {
                            $scope[search_services[i] + '_results'] = [];
                        }
                    }
                }

                function fetch(search_service) {
                    $http.jsonp(base_url + search_service + search + '&callback=JSON_CALLBACK', {'cache': true}).success(
                        function (data) {
                            var element = document.createElement('div');

                            // Fix strange HTML embeds in article results.
                            if (data.items) {
                                for (var i = 0; i < data.items.length; i++) {
                                    element.innerHTML = data.items[i].title;
                                    data.items[i].title = element.textContent;
                                }
                            }
                            $scope[search_service + '_results'] = data;
                        }
                    ).error(
                        function (data, status) {
                            console.log("Error: " + status);
                        }
                    );
                }

                function set_loading_status() {
                    for (var i = 0; i < search_services.length; i++) {
                        $scope[search_services[i] + '_results'] = false;
                    }
                }
            }])
        .controller('AutoComplete', ['$scope', '$http', '$location', '$window',
            function ($scope, $http, $location, $window) {
                $scope.search = function ($item) {
                    $scope.asyncSelected = $item.text;

                    if ($window.location.href.indexOf('search') > -1) {
                        $location.search('any=' + $item.text);
                    } else {
                        $window.location.href = '/search?any=' + $item.text;
                    }
                };

                $scope.getLocation = function (val) {
                    var truncate_length = 50;

                    return $http.jsonp(location.protocol + '//' + search_server + '/search-services/suggest?callback=JSON_CALLBACK&text=' + val, {'cache': true}).then(function (res) {

                        // Autopopulate first item
                        var first_item = document.getElementById('searchbox').value;

                        var suggestions = [
                            {text: first_item, label: first_item.truncate(truncate_length), payload: {type: ""}}
                        ];
                        angular.forEach(res.data.ac[0].options, function (item) {
                            item.label = item.text.truncate(truncate_length);
                            suggestions.push(item);
                        });
                        return suggestions;
                    });
                };

            }]);

    String.prototype.truncate = function (max_length) {
        var too_long, s_;
        too_long = this.length > max_length;
        if (too_long) {
            s_ = this.substr(0, max_length - 1);
            s_ = s_.substr(0, s_.lastIndexOf(' ')) + '…';
        } else {
            s_ = this;
        }
        return s_;
    }
})();
