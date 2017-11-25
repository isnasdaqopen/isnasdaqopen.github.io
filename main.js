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
    // Early close 24.11 and 03.07:
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

var holidays = [
	'2016-01-01', '2016-01-18', '2016-02-15', '2016-03-25', '2016-05-30', '2016-07-04', '2016-09-05', '2016-11-24', '2016-12-26',
	'2017-01-02', '2017-01-16', '2017-02-20', '2017-04-14', '2017-05-29', '2017-07-04', '2017-09-04', '2017-11-23', '2017-12-25'];

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

