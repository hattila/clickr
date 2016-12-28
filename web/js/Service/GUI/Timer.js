
Hw.Srvc.Timer = (function(){

    /**
     * Number of milliseconds to count down
     *
     * @type {number}
     * @private
     */
    var _time = 0;

    /**
     * Whether a countdown is in progress
     *
     * @type {boolean}
     * @private
     */
    var _timerInProgress = false;

    /**
     * How often the Timer should change, and by how much (milliseconds)
     *
     * @type {number}
     * @private
     */
    var _timerInterval = 100;
    var _timerIntervalVar;
    var _$container = $('#level-timer');

    var _updateContainer = function () {
        _$container.text(_formatMilliSeconds(_time));
    };

    var _formatSeconds = function (d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        return (
            (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" +
            (s < 10 ? "0" : "") + s
        );
    };

    var _formatMilliSeconds = function (d) {
        d = Number(d);
        var b = d / 1000; // seconds
        var h = Math.floor(b / 3600);
        var m = Math.floor(b % 3600 / 60);
        var s = Math.floor(b % 3600 % 60);
        var ms= Math.floor(d % 1000);
        return (
            (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" +
            (s < 10 ? "0" : "") + s + '.' +
            (ms < 100 ? "0" : "") + (ms / 10)
        );
    };

    var getTime = function () {
        return _time;
    };

    var setTime = function (time) {
        if (!_timerInProgress) {
            _time = time;
        } else {
            console.warn('Timer is already set!');
        }
    };

    var start = function (time) {
        if (time) {
            setTime(time);
        }

        if (!_timerInProgress) {
            _timerInProgress = true;
            _timerIntervalVar = setInterval(function () {
                _time -= _timerInterval;
                _updateContainer();

                if (_time <= 0) {
                    reset();
                    $.publish('/timer/expires');
                }
            }, _timerInterval);
        } else {
            console.warn('Timer is already set!');
        }
    };

    var reset = function (time) {
        _time = 0;
        _timerInProgress = false;
        clearTimeout(_timerIntervalVar);
        _updateContainer();

        if (time) {
            start(time);
        }
    };

    var pause = function () {
        if (_timerInProgress) {
            _timerInProgress = false;
            clearTimeout(_timerIntervalVar);
        }
    };

    return {
        getTime: getTime,
        setTime: setTime,
        start: start,
        reset: reset,
        pause: pause
    }
})();
