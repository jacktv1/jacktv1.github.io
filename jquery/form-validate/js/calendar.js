var calendar = {
	curMonth: null,
	curYear: null,
	monthList: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"Septemper",
		"October",
		"November",
		"December"
	],
	dayOfWeek: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],

	// Init dropdown list year
	initListYear() {
		var $datePicker = $('#date-picker');
		var $myCalendar = $('#myCalendar');
		var calendaHTML = "";

		// Init header of calendar
		calendaHTML += `<div class="calendar-header">`;
		// Init button previous year, previous month
		calendaHTML += `<button id="prev-year" class="btn" >&lt;&lt;</button>
						<button id="prev-month" class="btn">&lt;</button>`;

		// Init chose month
		calendaHTML += `<select id="month">`;
		for (var i = 0; i < calendar.monthList.length; i++) {
			calendaHTML += '<option value="' + (i + 1) + '">' + calendar.monthList[i] + '</option>';
		}
		calendaHTML += `</select>`;

		// Init chose year
		calendaHTML += `<select id="year">`;
		for (var i = 1970; i < 2100; i++) {
			calendaHTML += '<option value="' + i + '">' + i + '</option>';
		}
		calendaHTML += `</select>`;

		// Init button previous year, previous month
		calendaHTML += `<button id="next-month" class="btn">&gt;</button>
						<button id="next-year" class="btn">&gt;&gt;</button>`;

		// close tag calendar header
		calendaHTML += `</div>`;

		// Init day of week of calendar
		calendaHTML += '<ul class="day-of-week">';
		for (var i = 0; i < calendar.dayOfWeek.length; i++) {
			calendaHTML += '<li>' + calendar.dayOfWeek[i] + '</li>';
		}
		calendaHTML += '</ul>';


		$myCalendar.html(calendaHTML);
	},

	/**
	* The below function print all day in a month,
	* @param {int} month
	* @param {int} year
	*/

	initListDay(month, year) {
		var day = new Date(year, month, 0);
		var dayOfMonth = day.getDate();
		var nowDate = new Date();
		var $myCalendar = $('#myCalendar');
		var $oldListDay = $("#list-day");
		$oldListDay.remove();
		var firstDayOfWeek = new Date(year, month -1, 1).getDay();

		$myCalendar.html($myCalendar.html() + '<ul id="list-day" class="day">');
		var $listDay = $("#list-day");

		for (var i = 0; i < firstDayOfWeek; i++) {
			$listDay.html($listDay.html() + '<li></li>');
		}

		// print all day of month
		for (var i = 1; i <= dayOfMonth; i++) {
			if (nowDate.getDate() == i  && nowDate.getMonth() == (month -1) && nowDate.getFullYear() == day.getFullYear())
				$listDay.html( $listDay.html() + '<li class="date now" data-day="' + i + '">' + i + '</li>');
			else
				$listDay.html($listDay.html() + '<li class="date" data-day="' + i + '">' + i + '</li>');
		}

		$myCalendar.html($myCalendar.html() + '</ul>');

		calendar.calendarControl();

		var $listYear = $("#year");
		var $listMonth = $("#month");

		$listMonth.val(calendar.curMonth);
		$listYear.val(calendar.curYear);
	},

	// The below function define event of calendar control
	calendarControl() {

		var $year = $("#year");
		var $month = $("#month");

		// Event when click button next month
		var $btnNextMonth = $("#next-month");
		$btnNextMonth.on('click', function() {
			if (parseInt(calendar.curMonth) < 12) {
				calendar.curMonth = parseInt(month.value) + 1;
				calendar.initListDay(calendar.curMonth, year.value);
			}
		});

		// Event when click button previous month
		var $btnPrevMonth = $("#prev-month");
		$btnPrevMonth.on('click', function() {
			if (parseInt(calendar.curMonth) > 1) {
				calendar.curMonth = parseInt(month.value) - 1;
				calendar.initListDay(calendar.curMonth, year.value);
			}
		});

		// Event when click button next year
		var $btnNextYear = $("#next-year");
		$btnNextYear.on('click', function() {
			if (parseInt(calendar.curYear) < 2099) {
				calendar.curYear = parseInt(year.value) + 1;
				calendar.initListDay(month.value, calendar.curYear);
			}
		});

		// Event when click button previous year
		var $btnPrevYear = $("#prev-year");
		$btnPrevYear.on('click', function() {
			if (parseInt(calendar.curYear) > 1970) {
				calendar.curYear = parseInt($year.val()) - 1;
				calendar.initListDay($month.val(), calendar.curYear);
			}
		});

		// Event when select a month
		$month.on('change', function() {
			calendar.curYear = $year.val();
			calendar.curMonth = $(this).val();
			calendar.initListDay($(this).val(), $year.val());
		});

		// Event when select a year
		$year.on('change', function() {
			calendar.curYear = $(this).val();
			calendar.curMonth = $month.val();
			calendar.initListDay($month.val(), $(this).val());
		});

		// Event when click input date
		var $birthday = $("#birthday");
		$birthday.on('click', function() {
			var $myCalendar = $('#myCalendar');
			$myCalendar.toggleClass('d-block');
		});

		// Show date on textbox when click on a day of calendar
		var $listDate = $('.date');

		$listDate.on('click', function() {

			var $day = $(this).data("day");
			var $txt_date = $("#birthday");

			var stringDate = $day + "/" + $month.val() + "/" + $year.val();
			$txt_date.val(stringDate);

			var $myCalendar = $("#myCalendar");
			$myCalendar.toggleClass('d-block');
		});

	}
}
