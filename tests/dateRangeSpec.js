describe("dateRange", function() {
	"use strict";

  var d = dateRange; // shorthand
  var i = 0;
  var tmp;
  var tmpIter;
	var dr;
  var dateList;

	beforeEach(function() {
		dateList = ["11/1/2014", "8/1/2014", "10/1/2014", "7/1/2014", "12/1/2014", "9/1/2014", "6/1/2014"];
	});

	afterEach(function() {
		i = null;
		tmp = null;
		tmpIter = null;
		dr = null;
	});

	describe("initialization", function() {

		it("should not do anything if nothing is passed", function() {
			dr = dateRange();
			expect(dr.getList().length).toBe(0);
			expect(dr.getStartDate()).toBeFalsy();
			expect(dr.getEndDate()).toBeFalsy();
		});

		it("should sort unsorted lists of dates", function() {
			dr = dateRange(dateList);
			for(i = 0, tmp = dr.getList(); i < tmp.length - 1; i++) {
				expect(tmp[i]).toBeLessThan(tmp[i + 1]);
			}
		});

	});

	describe("load()", function() {

		it("should (re)initialize the list used by the object", function() {
			dr = dateRange();
			expect(dr.getList().length).toBe(0);
			dr.load(dateList);
			expect(dr.getList().length).toBe(dateList.length);
		});

		it("should convert all dates to their Date object equivalent", function() {
			dateList = ["1/1/2014", "2/1/2014", "3/1/2014", "4/1/2014"];
			dr = dateRange(dateList);
			for(i = 0, tmp = dr.getList(); i < tmp.length; i++) {
				expect(tmp[i].getTime()).toBe(new Date(dateList[i]).getTime());
			}
		});

	});

	describe("getList()", function() {

		it("should return a list with length equal to the list passed in", function() {
			dr = dateRange();
			expect(dr.getList().length).toBe(0);
			dr.load(dateList);
			expect(dr.getList().length).toBe(dateList.length);
		});

	});

	describe("getStartDate()", function() {

		it("should return the start date", function() {
			dateList = ["1/1/2014", "2/1/2014", "3/1/2014", "4/1/2014"];
			dr = dateRange();
			expect(dr.getStartDate()).toBe(undefined);
			dr.load(dateList);
			expect(dr.getStartDate().getTime()).toBe(new Date(dateList[0]).getTime());
		});

	});

	describe("getStartDateIndex()", function() {

		it("should return the start date", function() {
			dateList = ["1/1/2014", "2/1/2014", "3/1/2014", "4/1/2014"];
			dr = dateRange();
			expect(dr.getStartDateIndex()).toBe(undefined);
			dr.load(dateList);
			expect(dr.getStartDateIndex()).toBe(0);
		});

	});

	describe("getEndDate()", function() {

		it("should return the end date", function() {
			dateList = ["1/1/2014", "2/1/2014", "3/1/2014", "4/1/2014"];
			dr = dateRange();
			expect(dr.getEndDate()).toBe(undefined);
			dr.load(dateList);
			expect(dr.getEndDate().getTime()).toBe(new Date(dateList[dateList.length - 1]).getTime());
		});

	});

	describe("getEndDateIndex()", function() {

		it("should return the end date", function() {
			dateList = ["1/1/2014", "2/1/2014", "3/1/2014", "4/1/2014"];
			dr = dateRange();
			expect(dr.getEndDateIndex()).toBe(undefined);
			dr.load(dateList);
			expect(dr.getEndDateIndex()).toBe(dateList.length - 1);
		});

	});

	describe("setStartDate()", function() {

		it("should set the start date", function() {
			dr = dateRange(dateList);
			dr.setStartDate(2);
			expect(dr.getStartDate()).toBe(dr.getList()[2]);
		});

	});

	describe("setEndDate()", function() {

		it("should set the end date", function() {
			dr = dateRange(dateList);
			dr.setEndDate(2);
			expect(dr.getEndDate()).toBe(dr.getList()[2]);
		});

	});

});
