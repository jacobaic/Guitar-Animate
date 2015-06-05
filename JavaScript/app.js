var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate', 'ngGrid']);


animateApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'Templates/page-home.html',
            controller: 'mainController'
        })
        .when('/home', {
            templateUrl: 'Templates/page-home.html',
            controller: 'mainController'
        })
        .when('/purchase', {
            templateUrl: 'Templates/page-purchase.html',
            controller: 'aboutController'
        })
        .when('/contact', {
            templateUrl: 'Templates/page-contact-bkp1.html',
            controller: 'contactController'
        });

});

animateApp.controller('mainController', function($scope,$http,$rootScope) {
    $scope.pageClass = 'page-home';
    $rootScope.gridShow=false;
    $http.get('Resources/Data/Guitar-Gallery-black.json').success(function(resp){
        $scope.guitars = resp.allGuitars;
    });
    $scope.guitarindex=0;
    $scope.firstRec = true;
    $scope.lastRec = false;
    $scope.index = 0;
    $scope.comp = false;
    $scope.guitarchecklist=[];
    $scope.guitarindex=$scope.index;
    localStorage.guitarindex=$scope.guitarindex;
    $scope.next = function(){
        if ($scope.comp){
            $scope.guitarchecklist.push($scope.index);
            $scope.guitarindex=$scope.index;
            localStorage.guitarindex=$scope.guitarindex;
        }
        if($scope.index  < $scope.guitars.length-1){
            $scope.index++;
            $scope.comp = false;
            $scope.firstRec = false;
            $scope.guitarindex=$scope.index;
            localStorage.guitarindex=$scope.guitarindex;
        }
        if($scope.index == $scope.guitars.length -1) {
            $scope.lastRec = true;
        }

    };
    $scope.prev = function(){
        if($scope.index > 0){
            $scope.index--;
            $scope.comp = false;
            $scope.guitarindex=$scope.index;
            localStorage.guitarindex=$scope.guitarindex;
        }
        if($scope.index == 0){
            $scope.firstRec = true;
            $scope.lastRec = false;
        }
    };
    $scope.buy=function(){
        localStorage.guitarindex=$scope.guitarindex;
        $scope.pageClass = 'page-about';
    }
});

animateApp.controller('aboutController', function($scope,$http,$rootScope) {
    $scope.pageClass = 'page-about';

    $scope.guitarindex=localStorage.guitarindex;
    $http.get('Resources/Data/Guitar-Gallery-black.json').success(function(resp){
        $scope.buyguitar = resp.allGuitars;
    });
    $scope.guitarindex=0;
    $scope.guitarindex=localStorage.guitarindex;
    $scope.slide = true;
    $scope.crca1=null;
    $scope.myVisaCard=true;
    $scope.myMasterCard=true;
    $scope.myAmExCard=true;
    $scope.myDiscCard=true;
    $scope.fname=null;
    $scope.cardtype=function(){
        if ($scope.crca1=="3"){
            $scope.myAmExCard=true;
            $scope.myVisaCard=false;
            $scope.myMasterCard=false;
            $scope.myDiscCard=false;
        } else if ($scope.crca1=="4"){
            $scope.myVisaCard=true;
            $scope.myMasterCard=false;
            $scope.myAmExCard=false;
            $scope.myDiscCard=false;
        } else if ($scope.crca1=="5"){
            $scope.myMasterCard=true;
            $scope.myVisaCard=false;
            $scope.myAmExCard=false;
            $scope.myDiscCard=false;
        } else if ($scope.crca1=="6"){
            $scope.myDiscCard=true;
            $scope.myVisaCard=false;
            $scope.myMasterCard=false;
            $scope.myAmExCard=false;
        } else if ($scope.crca1=="1")
        {
            alert("Invalid Card No.!");
            $scope.myVisaCard=true;
            $scope.myMasterCard=true;
            $scope.myAmExCard=true;
            $scope.myDiscCard=true;
            $scope.crca1=null;
        }
    }
    $scope.detailTrueFalse=true;
    $scope.confirm=function(){
        $scope.pageClass = 'page-about';
        $scope.detailTrueFalse = !$scope.detailTrueFalse;
        $scope.slide=!$scope.slide
    }
    $scope.edit=function(){
        $scope.pageClass = 'page-about';
        $scope.detailTrueFalse = !$scope.detailTrueFalse;
        $scope.slide=!$scope.slide
    }
    $scope.buyStat=false;
    $scope.buy=function(){
        $scope.buyStat=true;
    }
    $scope.inputfocus = false;
    $scope.inputfocus1 = false;
    $scope.inputcc = false;
    $scope.numlen = function(){
        if ($scope.phnum1.length==3){
            $scope.inputfocus = true;
        }
    }
    $scope.numlen1 = function(){
        if ($scope.phnum2.length==3){
            $scope.inputfocus1 = true;
        }
    }
    $scope.numlen2 = function(){
        if ($scope.phnum3.length==4){
            $scope.inputcc = true;
        }
    }
    $rootScope.gridShow=false;
    console.log($rootScope.gridShow)
});

animateApp.controller('contactController', function($scope, $http,$rootScope) {
    $scope.pageClass = 'page-contact';
    $rootScope.gridShow=true;
    $http.get('Resources/Data/peoples.json').success(function(data){
        $scope.peoples = data;
    });
    $scope.gridOptions = {
        data: 'peoples',
        enablePinning: true,
       /* columnDefs: [{ field: "fname", displayName:'First Name', width: 140},
                     { field: "lname", displayName:'Last Name',  width: 140},
                     { field: "tel",   displayName:'Phone',      width: 130},
                     { field: "city",  displayName:'City',       width: 120},
                     { field: "state", displayName:'State',      width: 80},
                     { field: "zip",   displayName:'Zip',        width: 80}] */
    };
   // $scope.guitarindex=0;

});

animateApp.directive('ngFocus',function($parse){
    return function(scope,element,attrs){
        var ngFocusGet = $parse(attrs.ngFocus);
        var ngFocusSet = ngFocusGet.assign;
        if (!ngFocusSet) {
            throw Error("Non assignable expression");
        }

        var digesting = false;
        scope.$watch(attrs.ngFocus,function(newVal){
            if(newVal){
                digesting = true;
                element[0].focus();
            }
            else {
                digesting = true;
                element[0].blur();
            }

        });
        element.bind("blur",function(){
            if(digesting){
                digesting = false;
                ngFocusSet(scope,false);
            }
            else {
                scope.$apply(function(){
                    ngFocusSet(scope,false);
                });
            }

        });

        element.bind("focus",function(){
            if(digesting){
                digesting = false;
                ngFocusSet(scope,true);
            }
            else{
                scope.$apply(function(){
                    ngFocusSet(scope,true);
                });
            }

        });
    };
});

// phone number
function phonelen(n1, n2){
    var x=document.getElementById(n1).value;
    if(x.length==3){
        document.getElementById(n2).focus();
    }
}
//Credit Card
function crcalen(n1, n2){
    var x=document.getElementById(n1).value;
    if(x.length==4){
        document.getElementById(n2).focus();
    }
}