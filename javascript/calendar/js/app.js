calendar.initListYear();
var nowDate = new Date();

calendar.initListDay(nowDate.getMonth() + 1, nowDate.getFullYear());

var btnNextMonth = document.getElementById('next-month');
btnNextMonth.onclick = function() {
	var month = document.getElementById('month');
	var year = document.getElementById('year');
	if (parseInt(month.value) < 12) {
		month.value = parseInt(month.value) + 1;
		calendar.initListDay(month.value, year.value);
	}
	
}

var btnPrevMonth = document.getElementById('prev-month');
btnPrevMonth.onclick = function() {
	var month = document.getElementById('month');
	var year = document.getElementById('year');
	if (parseInt(month.value) > 1) {
		month.value = parseInt(month.value) - 1;
		calendar.initListDay(month.value, year.value);
	}
}

var btnNextYear = document.getElementById('next-year');
btnNextYear.onclick = function() {
	var month = document.getElementById('month');
	var year = document.getElementById('year');
	if (parseInt(year.value) < 2099) {
		year.value = parseInt(year.value) + 1;
		calendar.initListDay(month.value, year.value);
	}
	
}

var btnPrevYear = document.getElementById('prev-year');
btnPrevYear.onclick = function() {
	var month = document.getElementById('month');
	var year = document.getElementById('year');
	if (parseInt(year.value) > 1970) {
		year.value = parseInt(year.value) - 1;
		calendar.initListDay(month.value, year.value);
	}
}

var month = document.getElementById('month');
month.onchange = function() {
	var year = document.getElementById('year');
	calendar.initListDay(this.value, year.value);
}

var year = document.getElementById('year');
year.onchange = function() {
	var month = document.getElementById('month');
	calendar.initListDay(month.value, this.value);
}

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

var btnShowCal = document.getElementById('btn-show-cal');
btnShowCal.onclick = function() {
	var calendar = document.getElementById('myCalendar');
	calendar.style.display = "block";
}