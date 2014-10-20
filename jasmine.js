describe("Timezone: EST", function () {
    it("Friday 09:29", function () {
        var result = nasdaqStatus('2014-01-24T09:29:59-05:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        expect(result.timeUntilNextStatus).toBe('0 hours 1 minutes 0 seconds');
    });
    it("Friday 09:30", function () {
        var result = nasdaqStatus('2014-01-24T09:30:00-05:00');
        expect(result.currentStatus).toBe('OPEN');
        expect(result.nextStatus).toBe('CLOSED');
    });
    it("Friday 16:00", function () {
        var result = nasdaqStatus('2014-01-24T16:00:00-05:00');
        expect(result.currentStatus).toBe('OPEN');
        expect(result.nextStatus).toBe('CLOSED');
    });
    it("Friday 16:01", function () {
        var result = nasdaqStatus('2014-01-24T16:01:00-05:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        expect(result.timeUntilNextStatus).toBe('17 hours 29 minutes 0 seconds');
    });
    it("Saturday", function () {
        var result = nasdaqStatus('2014-01-26T10:00:00-05:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        //expect(result.timeUntilNextStatus).toBe('24*2-0.5 hours 0 minutes');
    });
    it("Sunday", function () {
        var result = nasdaqStatus('2014-01-26T10:00:00-05:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
    });
});

describe("Timezone: EET", function () {
    it("Sunday", function () {
        var result = nasdaqStatus('2014-01-26T10:00:00+02:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
    });
    it("Monday 10:00", function () {
        var result = nasdaqStatus('2014-01-27T10:00:00+02:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
    });
    it("Monday 22:59:59", function () {
        var result = nasdaqStatus('2014-01-27T22:59:59+02:00');
        expect(result.currentStatus).toBe('OPEN');
        expect(result.nextStatus).toBe('CLOSED');
    });
    it("Monday 23:00:00", function () {
        var result = nasdaqStatus('2014-01-27T23:00:00+02:00');
        expect(result.currentStatus).toBe('OPEN');
        expect(result.nextStatus).toBe('CLOSED');
    });
    it("Monday 23:00:01", function () {
        var result = nasdaqStatus('2014-01-27T23:00:01+02:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
    });
});

describe("Timezone: EET, summer time", function () {
    it("Sunday", function () {
        var result = nasdaqStatus('2014-10-14T10:00:00+03:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
    });
    it("Monday 10:00", function () {
        var result = nasdaqStatus('2014-10-15T10:00:00+03:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
    });
    it("Monday 22:59:59", function () {
        var result = nasdaqStatus('2014-10-15T22:59:59+03:00');
        expect(result.currentStatus).toBe('OPEN');
        expect(result.nextStatus).toBe('CLOSED');
    });
    it("Monday 23:00:00", function () {
        var result = nasdaqStatus('2014-10-15T23:00:00+03:00');
        expect(result.currentStatus).toBe('OPEN');
        expect(result.nextStatus).toBe('CLOSED');
    });
    it("Monday 23:00:01", function () {
        var result = nasdaqStatus('2014-10-15T23:00:01+03:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
    });
});