describe("Timezone: EST", function () {
    it("Friday 09:29", function () {
        var result = nasdaqStatus('2014-01-24T09:29:59-05:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '0d 0h 0m 1s'});
    });
    it("Friday 09:30", function () {
        var result = nasdaqStatus('2014-01-24T09:30:00-05:00');
        expect(result).toEqual({currentStatus: 'OPEN', nextStatus: 'CLOSED', timeUntilNextStatus: '0d 6h 30m 0s'});
    });
    it("Friday 16:00", function () {
        var result = nasdaqStatus('2014-01-24T16:00:00-05:00');
        expect(result).toEqual({currentStatus: 'OPEN', nextStatus: 'CLOSED', timeUntilNextStatus: '0d 0h 0m 0s'});
    });
    it("Friday 16:01", function () {
        var result = nasdaqStatus('2014-01-24T16:01:00-05:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '2d 17h 29m 0s'});
    });
    it("Saturday", function () {
        var result = nasdaqStatus('2014-01-25T10:00:00-05:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '1d 23h 30m 0s'});
    });
    it("Sunday", function () {
        var result = nasdaqStatus('2014-01-26T10:00:00-05:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '0d 23h 30m 0s'});
    });
});

describe("Timezone: EET", function () {
    it("Sunday", function () {
        var result = nasdaqStatus('2014-01-26T10:00:00+02:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '1d 6h 30m 0s'});
    });
    it("Monday 10:00", function () {
        var result = nasdaqStatus('2014-01-27T10:00:00+02:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '0d 6h 30m 0s'});
    });
    it("Monday 22:59:59", function () {
        var result = nasdaqStatus('2014-01-27T22:59:59+02:00');
        expect(result).toEqual({currentStatus: 'OPEN', nextStatus: 'CLOSED', timeUntilNextStatus: '0d 0h 0m 1s'});
    });
    it("Monday 23:00:00", function () {
        var result = nasdaqStatus('2014-01-27T23:00:00+02:00');
        expect(result).toEqual({currentStatus: 'OPEN', nextStatus: 'CLOSED', timeUntilNextStatus: '0d 0h 0m 0s'});
    });
    it("Monday 23:00:01", function () {
        var result = nasdaqStatus('2014-01-27T23:00:01+02:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '0d 17h 29m 59s'});
    });
});

describe("Timezone: EET, summer time", function () {
    it("Sunday", function () {
        var result = nasdaqStatus('2014-10-19T10:00:00+03:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '1d 6h 30m 0s'});
    });
    it("Monday 10:00", function () {
        var result = nasdaqStatus('2014-10-20T10:00:00+03:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '0d 6h 30m 0s'});
    });
    it("Monday 22:59:59", function () {
        var result = nasdaqStatus('2014-10-20T22:59:59+03:00');
        expect(result).toEqual({currentStatus: 'OPEN', nextStatus: 'CLOSED', timeUntilNextStatus: '0d 0h 0m 1s'});
    });
    it("Monday 23:00:00", function () {
        var result = nasdaqStatus('2014-10-20T23:00:00+03:00');
        expect(result).toEqual({currentStatus: 'OPEN', nextStatus: 'CLOSED', timeUntilNextStatus: '0d 0h 0m 0s'});
    });
    it("Monday 23:00:01", function () {
        var result = nasdaqStatus('2014-10-20T23:00:01+03:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '0d 17h 29m 59s'});
    });
});

describe("Holidays", function () {
    it("Before Thanksgiving 09:30", function () {
        var result = nasdaqStatus('2021-11-24T09:30:00-05:00');
        expect(result).toEqual({currentStatus: 'OPEN', nextStatus: 'CLOSED', timeUntilNextStatus: '0d 6h 30m 0s'});
    });
    it("Before Thanksgiving 16:01", function () {
        var result = nasdaqStatus('2021-11-24T16:01:00-05:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '1d 17h 29m 0s'});
    });
    it("Thanksgiving 09:30", function () {
        var result = nasdaqStatus('2021-11-25T09:30:00-05:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '1d 0h 0m 0s'});
    });
    it("Saturday 09:30, Martin Luther on Monday", function () {
        var result = nasdaqStatus('2021-01-16T09:30:00-05:00');
        expect(result).toEqual({currentStatus: 'CLOSED', nextStatus: 'OPEN', timeUntilNextStatus: '3d 0h 0m 0s'});
    });
});

describe("Early Close", function () {
    it("Day before Independence day, 09:30", function () {
        var result = nasdaqStatus('2019-07-03T09:30:00-04:00');
        expect(result).toEqual({currentStatus: 'OPEN', nextStatus: 'CLOSED', timeUntilNextStatus: '0d 3h 30m 0s'});
    });
    it("Day after Thanksgiving, 09:30", function () {
        var result = nasdaqStatus('2021-11-26T09:30:00-05:00');
        expect(result).toEqual({currentStatus: 'OPEN', nextStatus: 'CLOSED', timeUntilNextStatus: '0d 3h 30m 0s'});
    });
    it("December 24, 09:30", function () {
        var result = nasdaqStatus('2020-12-24T09:30:00-05:00');
        expect(result).toEqual({currentStatus: 'OPEN', nextStatus: 'CLOSED', timeUntilNextStatus: '0d 3h 30m 0s'});
    });
});

