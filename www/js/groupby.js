(function() {

	angular.module('starter')

	.filter('groupByMonthYearDay', function($parse) {

		var dividers = {};

		return function(input, dateField) {
			if (!input || !input.length) return;

			var output = [],
				previousDate,
				currentDate;

			for (var i = 0, ii = input.length; i < ii && (item = input[i]); i++) {
				currentDate = moment(item[dateField]);
				if (!previousDate ||
					currentDate.month() != previousDate.month() ||
					currentDate.year() != previousDate.year() ||
				  currentDate.day() != previousDate.day()
				) {

					var dividerId = currentDate.format('YYYYMMDD');

					if (!dividers[dividerId]) {
						dividers[dividerId] = {
							isDivider: true,
							divider: currentDate.format('ll')
						};
					}

					output.push(dividers[dividerId]);

				}
				output.push(item);

				previousDate = currentDate;
			}

			return output;
		};

	})

	.directive('dividerCollectionRepeat', function($parse) {
		return {
			priority: 1001,
			compile: compile
		};

		function compile (element, attr) {
			var height = attr.itemHeight || '73';
    		attr.$set('itemHeight', 'item.isDivider ? 37 : ' + height);

			element.children().attr('ng-hide', 'item.isDivider');
			element.prepend(
				'<div class="item item-divider ng-hide" ng-show="item.isDivider" ng-bind="item.divider"></div>'
			);
		}
	});

})();
