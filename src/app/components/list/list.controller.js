(function () {
  'use strict';

  angular.module('ktest')
    .controller('ListController', ListController);

  ListController.$inject = ['$list', '$state','$contsApp', '$auth'];

  function ListController($list, $state, $contsApp, $auth) {
    var vm = this;
    vm.listsData = [];
    vm.searchFilter = '';
    vm.getDataList = getDataList;
    vm.run = run;
    vm.goTo = goTo;
    vm.logOut = logOut;
    vm.goToFirstListState = goToFirstListState;
    vm.run();

    function goTo(state) {
      $state.go(state)
    }

    function goToFirstListState() {
      var stateToGo = {
        order: Number.MAX_SAFE_INTEGER
      };
      for (var item in vm.listsData) {
        if (vm.listsData[item].order < stateToGo.order) {
          stateToGo = vm.listsData[item]
        }

      }
      // Проверяем, чтобы было куда идти
      if (stateToGo.state !== undefined) {
        $state.go(stateToGo.state);
      } else {
        $state.go($contsApp.defaultState)
      }

    }

    function logOut(){
      $auth.logOut();
      $state.go($contsApp.defaultState);
      return false;
    }

    function getDataList() {
      vm.listsData = $list.getListsData();
    }

    function run() {
      vm.getDataList();

      if ($state.current.name === 'auth.list' || $state.current.name === 'auth.list.default') {
        vm.goToFirstListState();
      }
    }

  }

})();
