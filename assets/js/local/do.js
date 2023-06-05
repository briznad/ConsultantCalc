(function($) { // store vars in a privately scoped anonymous function
	function roundTo2Decimals(num) {
		return Math.round((num + Number.EPSILON) * 100) / 100;
	}

	function tally($numberFields, inputRate) {
		const numFields = {};

		$numberFields.each(function() {
			numFields[$(this).attr('id')] = parseFloat($(this).val());
		});

		numFields.totalDays = roundTo2Decimals(numFields.businessDays - numFields.vacationDays);

		switch (inputRate) {
			case 'hourlyRate':
				numFields.dailyRate = roundTo2Decimals(numFields.hourlyRate * numFields.hoursPerDay);
				numFields.yearlyRate = roundTo2Decimals(numFields.dailyRate * numFields.totalDays);

				break;

			case 'dailyRate':
				numFields.hourlyRate = roundTo2Decimals(numFields.dailyRate / numFields.hoursPerDay);
				numFields.yearlyRate = roundTo2Decimals(numFields.dailyRate * numFields.totalDays);

				break;

			case 'yearlyRate':
				numFields.dailyRate = roundTo2Decimals(numFields.yearlyRate / numFields.totalDays);
				numFields.hourlyRate = roundTo2Decimals(numFields.dailyRate / numFields.hoursPerDay);

				break;
		}

		$.each(numFields, function (key, value) {
			$('#' + key).val(value.toString());
		});
	}

	/* when DOM is ready, bind some shit */
	$(document).ready(function() {
		const $numberFields = $('input[type="number"]');
		const $radioFields = $('input[type="radio"]');

		let inputRate = 'hourlyRate';

		$radioFields.change(function() {
			const $thisInput = $(this).next('.control-group').find('input[type="number"]'); // cache the number input relative to the selected radio button

			$radioFields.next('.control-group').find('input[type="number"]').prop('disabled', true); // disable all rate inputs fields

			$radioFields.parent('.well').removeClass('current'); // remove "current" class from all wells

			inputRate = $thisInput.attr('id'); // save the current rate input

			$(this).parent('.well').addClass('current'); // add "current" class to current input well

			$thisInput.prop('disabled', false); // enable the current rate input field

			tally($numberFields, inputRate);
		});

		$numberFields.change(function() {
			tally($numberFields, inputRate);
		});

		$numberFields.keyup(function() {
			tally($numberFields, inputRate);
		});

		$('#devBox').text($(window).width());

		$(window).resize(function() {
			$('#devBox').text($(window).width());
		});
	});
	/* /when DOM is ready, bind some shit */
})(jQuery || $ || {});
