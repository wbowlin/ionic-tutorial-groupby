(function() {

	angular.module('starter')
		   .controller('ItemController', ItemController)

	function ItemController() {
		var vm = this,
			items = [];

		for (var i = 1; i < 2000; i++) {
			var itemDate = moment().add(i, 'hours');

			var item = {
				description: 'Description for item ' + i,
				date: itemDate.toDate()
			};
			items.push(item);
		}

		vm.items = items;
		return vm;

	}

})();
