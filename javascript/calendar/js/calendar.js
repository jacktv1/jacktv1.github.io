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
	
	// init dropdown list year
	initListYear: function() {
		var datePicker = document.getElementById('date-picker');
		datePicker.innerHTML += `<span class="addon" id="btn-show-cal"></span>`;
		var myCalendar = document.getElementById('myCalendar');
		var calendaHTML = "";
		calendaHTML += `<div class="calendar-header">
									<button id="prev-year" class="btn" >&lt;&lt;</button>
									<button id="prev-month" class="btn">&lt;</button>

									<select id="month">`;						
		for (var i = 0; i < calendar.monthList.length; i++) {
			calendaHTML += '<option value="' + (i + 1) + '">' + calendar.monthList[i] + '</option>';
		}			
		calendaHTML += `</select>
							   <select id="year">`;		

		
		for (var i = 1970; i < 2100; i++) {
			calendaHTML += '<option value="' + i + '">' + i + '</option>';
		}
		calendaHTML += `</select>
							   <button id="next-month" class="btn">&gt;</button>
							   <button id="next-year" class="btn">&gt;&gt;</button>
							   </div>`;
		calendaHTML += '<ul class="day-of-week">';					   
		for (var i = 0; i < calendar.dayOfWeek.length; i++) {
			calendaHTML += '<li>' + calendar.dayOfWeek[i] + '</li>';
		}
		calendaHTML += '</ul>';			
		myCalendar.innerHTML = 	calendaHTML;	
	},
	// print all day in a month of the year
	initListDay: function(month, year) {
		var day = new Date(year, month, 0);
		var dayOfMonth = day.getDate();
		var nowDate = new Date();
		if (typeof(document.getElementById("list-day")) != 'undefined' && document.getElementById("list-day") != null) {
		    document.getElementById("list-day").remove();
		}

		var myCalendar = document.getElementById('myCalendar');
		myCalendar.innerHTML += '<ul id="list-day" class="day">';

		var listDay = document.getElementById("list-day");
		listDay.innerHTML = '';
		var firstDayOfWeek = new Date(year, month -1, 1).getDay();

		for (var i = 0; i < firstDayOfWeek; i++) {
			listDay.innerHTML += '<li></li>';
		}
		
		for (var i = 1; i <= dayOfMonth; i++) {
			if (nowDate.getDate() == i  && nowDate.getMonth() == (month -1) && nowDate.getFullYear() == day.getFullYear())
				listDay.innerHTML += '<li class="date now" data-day="' + i + '">' + i + '</li>';
			else
				listDay.innerHTML += '<li class="date" data-day="' + i + '">' + i + '</li>';
		}
		myCalendar.innerHTML += '</ul>';

		calendar.selectDate();
		calendar.calendarControl();

		var listYear = document.getElementById("year");
		var listMonth = document.getElementById("month");

		listMonth.value = calendar.curMonth;
		listYear.value = calendar.curYear;
	},
	// show date on textbox when click a day of calendar
	selectDate: function() {
		var listDate = document.getElementsByClassName('date');
		for(var i = 0; i < listDate.length; i++) {
			listDate[i].onclick = function() {
				var month = document.getElementById('month').value;
				var year = document.getElementById('year').value;
				var day = this.dataset.day;

				var txt_date = document.getElementById('txt_date');
				txt_date.value = day + "/" + month + "/" + year;

				var calendar = document.getElementById('myCalendar');
				calendar.style.display = "none";
			}
		}
	},
	// Calendar control
	calendarControl: function() {
		
		var year = document.getElementById("year");
		var month = document.getElementById("month");
		var btnNextMonth = document.getElementById('next-month');
		btnNextMonth.onclick = function() {
			if (parseInt(calendar.curMonth) < 12) {
				calendar.curMonth = parseInt(month.value) + 1;
				calendar.initListDay(calendar.curMonth, year.value);
				
			}
		};

		var btnPrevMonth = document.getElementById('prev-month');
		btnPrevMonth.onclick = function() {
			if (parseInt(calendar.curMonth) > 1) {
				calendar.curMonth = parseInt(month.value) - 1;
				calendar.initListDay(calendar.curMonth, year.value);
			}
		};

		var btnNextYear = document.getElementById('next-year');
		btnNextYear.onclick = function() {
			if (parseInt(calendar.curYear) < 2099) {
				calendar.curYear = parseInt(year.value) + 1;
				calendar.initListDay(month.value, calendar.curYear);
			}
			
		};

		var btnPrevYear = document.getElementById('prev-year');
		btnPrevYear.onclick = function() {
			if (parseInt(calendar.curYear) > 1970) {
				calendar.curYear = parseInt(year.value) - 1;
				calendar.initListDay(month.value, calendar.curYear);
			}
		};

		month.onchange = function() {
			calendar.curYear = year.value;
			calendar.curMonth = this.value;
			calendar.initListDay(this.value, year.value);
		};

		year.onchange = function() {
			calendar.curYear = this.value;
			calendar.curMonth = month.value;
			calendar.initListDay(month.value, this.value);
		};

		var btnShowCal = document.getElementById('btn-show-cal');
		btnShowCal.onclick = function() {
			var calendar = document.getElementById('myCalendar');
			calendar.style.display = "block";
		};
	}
}