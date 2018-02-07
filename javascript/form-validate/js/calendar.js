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
		var datePicker = document.getElementById('date-picker');
		var myCalendar = document.getElementById('myCalendar');
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

		myCalendar.innerHTML = 	calendaHTML;	
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
		var myCalendar = document.getElementById('myCalendar');
		var listDay = document.getElementById("list-day");
		var firstDayOfWeek = new Date(year, month -1, 1).getDay();

		if (typeof(listDay) != 'undefined' && listDay != null) {
		    document.getElementById("list-day").remove();
		}

		myCalendar.innerHTML += '<ul id="list-day" class="day">';
		listDay = document.getElementById("list-day");
		listDay.innerHTML = '';
		

		for (var i = 0; i < firstDayOfWeek; i++) {
			listDay.innerHTML += '<li></li>';
		}
		
		// print all day of month
		for (var i = 1; i <= dayOfMonth; i++) {
			if (nowDate.getDate() == i  && nowDate.getMonth() == (month -1) && nowDate.getFullYear() == day.getFullYear())
				listDay.innerHTML += '<li class="date now" data-day="' + i + '">' + i + '</li>';
			else
				listDay.innerHTML += '<li class="date" data-day="' + i + '">' + i + '</li>';
		}
		myCalendar.innerHTML += '</ul>';

		calendar.calendarControl();

		var listYear = document.getElementById("year");
		var listMonth = document.getElementById("month");

		listMonth.value = calendar.curMonth;
		listYear.value = calendar.curYear;
	},

	// The below function define event of calendar control
	calendarControl() {
		
		var year = document.getElementById("year");
		var month = document.getElementById("month");

		// Event when click button next month
		var btnNextMonth = document.getElementById('next-month');
		btnNextMonth.onclick = function() {
			if (parseInt(calendar.curMonth) < 12) {
				calendar.curMonth = parseInt(month.value) + 1;
				calendar.initListDay(calendar.curMonth, year.value);		
			}
		};

		// Event when click button previous month
		var btnPrevMonth = document.getElementById('prev-month');
		btnPrevMonth.onclick = function() {
			if (parseInt(calendar.curMonth) > 1) {
				calendar.curMonth = parseInt(month.value) - 1;
				calendar.initListDay(calendar.curMonth, year.value);
			}
		};

		// Event when click button next year
		var btnNextYear = document.getElementById('next-year');
		btnNextYear.onclick = function() {
			if (parseInt(calendar.curYear) < 2099) {
				calendar.curYear = parseInt(year.value) + 1;
				calendar.initListDay(month.value, calendar.curYear);
			}
		};

		// Event when click button previous year
		var btnPrevYear = document.getElementById('prev-year');
		btnPrevYear.onclick = function() {
			if (parseInt(calendar.curYear) > 1970) {
				calendar.curYear = parseInt(year.value) - 1;
				calendar.initListDay(month.value, calendar.curYear);
			}
		};

		// Event when select a month
		month.onchange = function() {
			calendar.curYear = year.value;
			calendar.curMonth = this.value;
			calendar.initListDay(this.value, year.value);
		};

		// Event when select a year
		year.onchange = function() {
			calendar.curYear = this.value;
			calendar.curMonth = month.value;
			calendar.initListDay(month.value, this.value);
		};

		// Event when click input date
		var birthday = document.getElementById('birthday');
		birthday.onclick = function() {
			var calendar = document.getElementById('myCalendar');
			if (calendar.style.display == "block")
				calendar.style.display = "none";
			else
				calendar.style.display = "block";
		};

		// Show date on textbox when click on a day of calendar
		var listDate = document.getElementsByClassName('date');
		for(var i = 0; i < listDate.length; i++) {
			listDate[i].onclick = function() {
				var month = document.getElementById('month').value;
				var year = document.getElementById('year').value;
				var day = this.dataset.day;

				var txt_date = document.getElementById('birthday');
				txt_date.value = day + "/" + month + "/" + year;

				var calendar = document.getElementById('myCalendar');
				calendar.style.display = "none";
			}
		}
	}
}