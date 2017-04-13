function nasdaqStatus(currentDateISOString) {
    if(typeof moment === 'undefined')
    	$('#adblockingAlert').html("Are you using some adblocking software? Try switching it off for this site.");

    var now = moment(currentDateISOString).tz('America/New_York');

    if (!isWorkingDay(now)) {
        var nextOpenDate = nextWorkingDay(now).hour(9).minute(30).second(0);
        var timeToWait = moment.duration(nextOpenDate.diff(now, 'seconds'), 'seconds');
        return {currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: durationToString(timeToWait)};
    }

    var openDate = moment(now).hour(9).minute(30).second(0);
    if (now.isBefore(openDate)) {
        var timeToWait = moment.duration(openDate.diff(now, 'seconds'), 'seconds');
        return {currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: durationToString(timeToWait)};
    } 
    
    var closeDate = moment(now).hour(16).minute(0).second(0);
    // 24.12:
    //var closeDate = moment(now).hour(13).minute(0).second(0);
    if (now.isAfter(closeDate)) {
        var nextOpenDate = nextWorkingDay(now).hour(9).minute(30).second(0);
        var timeToWait = moment.duration(nextOpenDate.diff(now, 'seconds'), 'seconds');
        return {currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: durationToString(timeToWait)};
    }

    var timeToWait = moment.duration(closeDate.diff(now, 'seconds'), 'seconds');
    return {currentStatus: 'OPEN', nextStatus: 'CLOSED', timeUntilNextStatus: durationToString(timeToWait)};
}

function isWorkingDay(now) {
	if (isHoliday(now)) return false;
    var SUNDAY = 0;
    var SATURDAY = 6;
    return !(now.day() == SUNDAY || now.day() == SATURDAY);
}

var holidays = ['2017-04-14'];

function isHoliday(now) {
	for (var i = 0; i < holidays.length; i++) {
		var holiday = moment.tz(holidays[i], "America/New_York"); 
		if (now.isSame(holiday, 'day')) {
			console.log(now);
			return true;
		} 
	}
	return false;
}

function nextWorkingDay(now) {
    var candidate = moment(now).add(1, 'days');
    while(!isWorkingDay(candidate))
        candidate = candidate.add(1, 'days');
    return candidate;
}

function durationToString(duration) {
    return duration.days() + 'd ' + duration.hours() + 'h ' + duration.minutes() + 'm ' + duration.seconds() + 's';
}

function myTimer() {
    var status = nasdaqStatus();
    $('#status').html(status.currentStatus);
    $('#nextStatus').html(status.nextStatus);
    $('#timeUntilNextStatus').html(status.timeUntilNextStatus);
}

