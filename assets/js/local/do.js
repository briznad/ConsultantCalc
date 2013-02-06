(function () { // store vars in a privately scoped anonymous function

    var numFields = {},
		$numberFields = null,
		$radioFields = null,
		inputRate = 'hourlyRate',
		tally = function () {
			$numberFields.each(function () {
				numFields[$(this).attr('id')] = parseInt($(this).val());
			});

			numFields['totalDays'] = numFields['businessDays'] - numFields['vacationDays'];

			switch (inputRate) {
				case 'hourlyRate':
					numFields['dailyRate'] = numFields['hourlyRate'] * numFields['hoursPerDay'];
					numFields['yearlyRate'] = numFields['dailyRate'] * numFields['totalDays'];
					break;
				case 'dailyRate':
					numFields['hourlyRate'] = numFields['dailyRate'] / numFields['hoursPerDay'];
					numFields['yearlyRate'] = numFields['dailyRate'] * numFields['totalDays'];
					break;
				case 'yearlyRate':
					numFields['dailyRate'] = numFields['yearlyRate'] / numFields['totalDays'];
					numFields['hourlyRate'] = numFields['dailyRate'] / numFields['hoursPerDay'];
					break;
			}

			$.each(numFields, function (key, value) {
				$('#' + key).val(value.toString());
			});
	    };


    /* when DOM is ready, bind some shit */

    $(document).ready(function() {

		$numberFields = $('input[type="number"]'),
		$radioFields = $('input[type="radio"]');

    	$radioFields.change(function () {
    		var $thisInput = $(this).next('.control-group').find('input[type="number"]'); // cache the number input relative to the selected radio button

    		$radioFields.next('.control-group').find('input[type="number"]').prop('disabled', true); // disable all rate inputs fields

    		$radioFields.parent('.well').removeClass('current'); // remove "current" class from all wells

    		inputRate = $thisInput.attr('id'); // save the current rate input

    		$(this).parent('.well').addClass('current'); // add "current" class to current input well

    		$thisInput.prop('disabled', false); // enable the current rate input field

    		tally();
    	});

    	$numberFields.change(function () {
    		tally();
    	});

    	$numberFields.keyup(function () {
    		tally();
    	});

    });

    /* /when DOM is ready, bind some shit */

})();