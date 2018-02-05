var calendar = {
	initListYear: function() {
		var listyear = document.getElementById("year");
		var listMonth = document.getElementById("month");
		for (var i = 1970; i < 2100; i++) {
			listyear.innerHTML += '<option value="' + i + '">' + i + '</option>';
		}
		var nowDate = new Date();
		listyear.value = nowDate.getFullYear();
		listMonth.value = nowDate.getMonth() + 1;
	},
	initListDay: function(month, year) {
		var day = new Date(year, month, 0);
		var dayOfMonth = day.getDate();
		var nowDate = new Date();
		
		var listDay = document.getElementById("list-day");
		listDay.innerHTML = '';
		var firstDayOfWeek = new Date(year, month -1, 1).getDay();
		console.log(firstDayOfWeek);
		for (var i = 0; i < firstDayOfWeek; i++) {
			listDay.innerHTML += '<li></li>';
		}
		
		for (var i = 1; i <= dayOfMonth; i++) {
			if (nowDate.getDate() == i  && nowDate.getMonth() == (month -1) && nowDate.getFullYear() == day.getFullYear())
				listDay.innerHTML += '<li class="date now" data-day="' + i + '">' + i + '</li>';
			else
				listDay.innerHTML += '<li class="date" data-day="' + i + '">' + i + '</li>';
		}
	}
}