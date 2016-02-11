var myApp = angular.module('employeeApp', ['ngRoute']);

myApp.config(function($routeProvider) {
    $routeProvider
        .when('/employeeList', {
            templateUrl: 'employeeListView.html',
            controller: 'employeeListController as elc'
        })
        .when("/employeeDetail", {
            templateUrl: 'employeeDetail.html',
            controller: 'employeeDetailController as edc'
        })
        .otherwise({
            redirectTo: '/'
        });
});

myApp.controller('employeeListController', function($scope, $location, dataService) {
    var self = this;
    self.employeeList = dataService.employees;
    self.empEdit = function empEdit(emp) {
        var employeeSize = dataService.employees.length;
        dataService.edit(emp);
        dataService.id = emp.ID;
        dataService.fName = emp.fName;
        dataService.mName = emp.mName;
        dataService.lName = emp.lName;
        dataService.dob = emp.dob;


        for (var i = 0; i < employeeSize; i++) {
            if (dataService.employees[i].ID === emp.ID) {
                dataService.index = i;
                //console.log('Index ' + dataService.index);
                console.log(dataService.employees[i]);
            }
        }
    };

    self.ageCalculation = function ageCalculation(emp) {

        console.log(emp.dob);
        var d = Date.parse(emp.dob),
            today = new Date(),
            age = today.getTime() - d;

        return (age / (365 * 24 * 60 * 60 * 1000)).toFixed(0) + ' Years';


    };

    self.empDelete = function empDelete(emp) {
        self.employeeList.splice(self.employeeList.indexOf(emp), 1);
    };

    self.addEmp = function addEmp() {
        $location.path('/employeeDetail');
        dataService.edit(null);

    };
});


myApp.controller('employeeDetailController', function($scope, dataService, $location) {
    var self = this;

    self.empId = dataService.id;
    self.empName = dataService.fName;
    self.empMName = dataService.mName;
    self.empLName = dataService.lName;
    self.empDob = dataService.dob;

    self.editEmp = function editEmp() {
        $location.path('/employeeList');
        dataService.employees[dataService.index].ID = self.empId;
        dataService.employees[dataService.index].fName = self.empName;
        dataService.employees[dataService.index].mName = self.empMName;
        dataService.employees[dataService.index].lName = self.empLName;
        dataService.employees[dataService.index].dob = self.empDob;
        self.empId = '';
        self.empName = '';
        self.empMName = '';
        self.empLName = '';
        self.empDob = '';


    };

    self.add = function add() {
        $location.path('/employeeList');
        dataService.employees.push({
            "ID": self.empId,
            "fName": self.empName,
            "mName": self.empMName,
            "lName": self.empLName,
            "dob": self.empDob
        });
    }

});

myApp.service('dataService', function($location) {
    this.employees = [{
        ID: 12345,
        fName: 'Jane',
        mName: 'Y',
        lName: 'Doe',
        dob: '01/01/1986'
    }, {
        ID: 12346,
        fName: 'Dixit',
        mName: 'G',
        lName: 'Patel',
        dob: '03/28/1984'
    }, {
        ID: 12347,
        fName: 'Jack',
        mName: 'B',
        lName: 'Ryan',
        dob: '01/03/1994'
    }];

    this.edit = function edit(obj) {
        $location.path('/employeeDetail');
        return obj;
    };

    this.id = '';
    this.name = '';
    this.dob = '';
    this.mName = '';
    this.lName = '';
    this.index;
});
