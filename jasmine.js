describe("Timezone: EST", function () {
    it("Friday 09:29", function () {
        var result = nasdaqStatus('2014-01-24T09:29:59-05:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        expect(result.timeUntilNextStatus).toBe('0d 0h 0m 1s');
    });
    it("Friday 09:30", function () {
        var result = nasdaqStatus('2014-01-24T09:30:00-05:00');
        expect(result.currentStatus).toBe('OPEN');
        expect(result.nextStatus).toBe('CLOSED');
        expect(result.timeUntilNextStatus).toBe('0d 6h 30m 0s');
    });
    it("Friday 16:00", function () {
        var result = nasdaqStatus('2014-01-24T16:00:00-05:00');
        expect(result.currentStatus).toBe('OPEN');
        expect(result.nextStatus).toBe('CLOSED');
        expect(result.timeUntilNextStatus).toBe('0d 0h 0m 0s');
    });
    it("Friday 16:01", function () {
        var result = nasdaqStatus('2014-01-24T16:01:00-05:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        expect(result.timeUntilNextStatus).toBe('2d 17h 29m 0s');
    });
    it("Saturday", function () {
        var result = nasdaqStatus('2014-01-25T10:00:00-05:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        expect(result.timeUntilNextStatus).toBe('1d 23h 30m 0s');
    });
    it("Sunday", function () {
        var result = nasdaqStatus('2014-01-26T10:00:00-05:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        expect(result.timeUntilNextStatus).toBe('0d 23h 30m 0s');
    });
});

describe("Timezone: EET", function () {
    it("Sunday", function () {
        var result = nasdaqStatus('2014-01-26T10:00:00+02:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        expect(result.timeUntilNextStatus).toBe('1d 6h 30m 0s');
    });
    it("Monday 10:00", function () {
        var result = nasdaqStatus('2014-01-27T10:00:00+02:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        expect(result.timeUntilNextStatus).toBe('0d 6h 30m 0s');
    });
    it("Monday 22:59:59", function () {
        var result = nasdaqStatus('2014-01-27T22:59:59+02:00');
        expect(result.currentStatus).toBe('OPEN');
        expect(result.nextStatus).toBe('CLOSED');
        expect(result.timeUntilNextStatus).toBe('0d 0h 0m 1s');
    });
    it("Monday 23:00:00", function () {
        var result = nasdaqStatus('2014-01-27T23:00:00+02:00');
        expect(result.currentStatus).toBe('OPEN');
        expect(result.nextStatus).toBe('CLOSED');
        expect(result.timeUntilNextStatus).toBe('0d 0h 0m 0s');
    });
    it("Monday 23:00:01", function () {
        var result = nasdaqStatus('2014-01-27T23:00:01+02:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        expect(result.timeUntilNextStatus).toBe('0d 17h 29m 59s');
    });
});

describe("Timezone: EET, summer time", function () {
    it("Sunday", function () {
        var result = nasdaqStatus('2014-10-19T10:00:00+03:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        expect(result.timeUntilNextStatus).toBe('1d 6h 30m 0s');
    });
    it("Monday 10:00", function () {
        var result = nasdaqStatus('2014-10-20T10:00:00+03:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        expect(result.timeUntilNextStatus).toBe('0d 6h 30m 0s');
    });
    it("Monday 22:59:59", function () {
        var result = nasdaqStatus('2014-10-20T22:59:59+03:00');
        expect(result.currentStatus).toBe('OPEN');
        expect(result.nextStatus).toBe('CLOSED');
        expect(result.timeUntilNextStatus).toBe('0d 0h 0m 1s');
    });
    it("Monday 23:00:00", function () {
        var result = nasdaqStatus('2014-10-20T23:00:00+03:00');
        expect(result.currentStatus).toBe('OPEN');
        expect(result.nextStatus).toBe('CLOSED');
        expect(result.timeUntilNextStatus).toBe('0d 0h 0m 0s');
    });
    it("Monday 23:00:01", function () {
        var result = nasdaqStatus('2014-10-20T23:00:01+03:00');
        expect(result.currentStatus).toBe('CLOSED');
        expect(result.nextStatus).toBe('OPEN');
        expect(result.timeUntilNextStatus).toBe('0d 17h 29m 59s');
    });
});