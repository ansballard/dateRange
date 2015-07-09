/**
 *  @name dateRange
 *  @param {Array} dateList An array of strings representing dates
 *  Throws an exception if invalid dates are given
 */
var dateRange = function(dateList) {
	"use strict";

	var i = 0;
	var stringDateList = dateList;
	var objDateList = [];
	var startDate = {};
	var endDate = {};

	var load = function load(dl) {
		for (i = 0; i < dl.length; i++) {
			objDateList.push(new Date(dl[i]));
		}
		objDateList.sort(function(a, b) {
			return a - b;
		});
		startDate = {
			index: 0,
			date: objDateList[0]
		};
		endDate = {
			index: objDateList.length - 1,
			date: objDateList[objDateList.length - 1]
		};
	};

	if (typeof stringDateList !== "undefined") {
		load(stringDateList);
	}

	return {
		/**
		 *	Get the list of dates as objects
		 *	@name dateRange.getList
		 *	@return {Array} List of dates as Date objects
		 */
		getList: function dateRangeGetFullList() {
			return objDateList;
		},
		/**
		 *	Get the start date as an object
		 *	@name dateRange.getStartDate
		 *	@return {Date} Start date
		 */
		getStartDate: function dateRangeGetStartDate() {
			return startDate.date;
		},
		/**
		 *	Get the start date index in the full list
		 *	@name dateRange.getStartDateIndex
		 *	@return {integer} Start date index
		 */
		getStartDateIndex: function dateRangeGetStartDateIndex() {
			return startDate.index;
		},
		/**
		 *	Get the end date as an object
		 *	@name dateRange.getEndDate
		 *	@return {Date} End date
		 */
		getEndDate: function dateRangeGetEndDate() {
			return endDate.date;
		},
		/**
		 *	Get the end date index in the full list
		 *	@name dateRange.getEndDateIndex
		 *	@return {integer} End date index
		 */
		getEndDateIndex: function dateRangeGetEndDateIndex() {
			return endDate.index;
		},
		/**
		 *	Set the start date via the index, throws exceptions
		 *	@name dateRange.setStartDate
		 *	@param {integer} index Index of the desired start date
		 */
		setStartDate: function dateRangeSetStartDate(index) {
			index = (+index);
			if (index < 0 || index > endDate.index) {
				throw "Invalid start date";
			} else {
				startDate.index = index;
				startDate.date = objDateList[index];
			}
		},
		/**
		 *	Set the end date via the index, throws exceptions
		 *	@name dateRange.setEndDate
		 *	@param {integer} index Index of the desired end date
		 */
		setEndDate: function dateRangeSetEndDate(index) {
			index = (+index);
			if (index < startDate.index || index >= objDateList.length) {
				throw "Invalid end date";
			} else {
				endDate.index = index;
				endDate.date = objDateList[index];
			}
		},
		/**
		 *	Get a list of dates that can be selected as the start date
		 *	@name dateRange.getValidStartDates
		 *	@return {Array} List of dates that are valid start dates
		 */
		getValidStartDates: function dateRangeGetValidStartDates() {
			var tmpValidStartDates = [];
			for (i = 0; i <= endDate.index; i++) {
				tmpValidStartDates.push(objDateList[i]);
			}
			return tmpValidStartDates;
		},
		/**
		 *	Get a list of dates that can be selected as the end date
		 *	@name dateRange.getValidEndDates
		 *	@return {Array} List of dates that are valid end dates
		 */
		getValidEndDates: function dateRangeGetValidEndDates() {
			var tmpValidEndDates = [];
			for (i = startDate.index; i < objDateList.length; i++) {
				tmpValidEndDates.push(objDateList[i]);
			}
			return tmpValidEndDates;
		},
		/**
		 *	Get a list of objects with .valid and .date members
		 *	@name dateRange.getStartDate
		 *	@return {Array} List of dates with validity
		 */
		getStartDateList: function dateRangeGetStartDateList() {
			var tmpStartDateList = [];
			for (i = 0; i <= endDate.index; i++) {
				tmpStartDateList.push({
					date: objDateList[i],
					valid: true
				});
			}
			for (; i < objDateList.length; i++) {
				tmpStartDateList.push({
					date: objDateList[i],
					valid: false
				});
			}
			return tmpStartDateList;
		},
		/**
		 *	Get a list of objects with .valid and .date members
		 *	@name dateRange.getEndDate
		 *	@return {Array} List of dates with validity
		 */
		getEndDateList: function dateRangeGetEndDateList() {
			var tmpEndDateList = [];
			for (i = 0; i < startDate.index; i++) {
				tmpEndDateList.push({
					date: objDateList[i],
					valid: false
				});
			}
			for (; i < objDateList.length; i++) {
				tmpEndDateList.push({
					date: objDateList[i],
					valid: true
				});
			}
			return tmpEndDateList;
		},
		/**
		 *	Resets the start and end dates to the first and last dates in the list
		 *	@name dateRange.resetRange
		 */
		resetRange: function dateRangeResetRange() {
			this.setStartDate(0);
			this.setEndDate(objDateList.length - 1);
		},
		/**
		 *	Sets the start and end date after resetting them
		 *	@name dateRange.setRange
		 */
		setRange: function dateRangeSetRange(start, end) {
			this.resetRange();
			this.setStartDate(start);
			this.setEndDate(end);
		},
		/**
		 *	(re)Initializes the list of dates via a list of strings with dl
		 *	@name dateRange.load
		 *	@param {Array} dl An array of dates as strings
		 */
		load: load
	};

};
