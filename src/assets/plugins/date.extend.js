/*
 * Desc: Javascript Date 对象扩展方法
 * Author: wangmd
 * Date: 2016/12/06
 */

;(function() {

    if (typeof Date.prototype.add !== 'function') {
        // 添加毫秒数
        Date.prototype.add = function(milliseconds) {
            var m = this.getTime() + milliseconds;
            return new Date(m);
        };
    }

    if (typeof Date.prototype.addSeconds !== 'function') {
        // 添加秒数
        Date.prototype.addSeconds = function(seconds) {
            return this.add(seconds * 1000);
        };
    }

    if (typeof Date.prototype.addMinutes !== 'function') {
        // 添加分钟
        Date.prototype.addMinutes = function(minutes) {
            return this.addSeconds(minutes * 60);
        };
    }

    if (typeof Date.prototype.addHours !== 'function') {
        // 添加小时
        Date.prototype.addHours = function(hours) {
            return this.addMinutes(hours * 60);
        };
    }

    if (typeof Date.prototype.addDays !== 'function') {
        // 添加天数
        Date.prototype.addDays = function(days) {
            return this.addHours(days * 24);
        };
    }

    if (typeof Date.isLeapYear !== 'function') {
        // 是否是闰年
        Date.isLeapYear = function(year) {
            return (year % 4 === 0 && year % 100 !== 0);
        };
    }

    if (typeof Date.daysInMonth !== 'function') {
        // 返回指定年份指定月份的天数
        Date.daysInMonth = function(year, month) {
            if (month === 2) {
                if (year % 4 === 0 && year % 100 !== 0) {
                    return 29;
                } else {
                    return 28;
                }
            } else if ((month <= 7 && month % 2 === 1) || (month > 7 && month % 2 === 0)) {
                return 31;
            } else {
                return 30;
            }
        };
    }

    if (typeof Date.prototype.addMonth !== 'function') {
        // 当前时间往后追加一个月
        Date.prototype.addMonth = function() {
            var m = this.getMonth();
            if (m === 11) {
                return new Date(this.getFullYear() + 1, 1, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
            }
            var daysInNextMonth = Date.daysInMonth(this.getFullYear(), this.getMonth() + 1);
            var day = this.getDate();
            if (day > daysInNextMonth) {
                day = daysInNextMonth;
            }
            return new Date(this.getFullYear(), this.getMonth() + 1, day, this.getHours(), this.getMinutes(), this.getSeconds());
        };
    }

    if (typeof Date.prototype.subMonth !== 'function') {
        // 当前时间往前倒退一个月
        Date.prototype.subMonth = function() {
            var m = this.getMonth();
            if (m === 0) {
                return new Date(this.getFullYear() - 1, 12, this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
            }
            var day = this.getDate();
            var daysInPreviousMonth = Date.daysInMonth(this.getFullYear(), this.getMonth());
            if (day > daysInPreviousMonth) {
                day = daysInPreviousMonth;
            }
            return new Date(this.getFullYear(), this.getMonth() - 1, day, this.getHours(), this.getMinutes(), this.getSeconds());
        };
    }

    if (typeof Date.prototype.addMonths !== 'function') {
        // 当前月份向前减少或向后增加月份，months可以为正也可以为负
        Date.prototype.addMonths = function(months) {
            var result = false;
            if (months > 0) {
                while (months > 0) {
                    result = this.addMonth();
                    months--;
                }
            } else if (months < 0) {
                while (months < 0) {
                    result = this.subMonth();
                    months++;
                }
            } else {
                result = this;
            }
            return result;
        };
    }

    if (typeof Date.prototype.addYears !== 'function') {
        Date.prototype.addYears = function(year) {
            return new Date(this.getFullYear() + year, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds());
        };
    }

})();
