Template.stats.helpers({
    usercount: function() {
        return Session.get('usercount');
    },
    projectcount: function() {
    	return Projects.find().count();
    },
    projectownercount: function() {
    	var ps = Projects.find();
    	var owners = countByKey(ps, 'owner', false);
    	return Object.keys(owners).length;
    }
});

Template.stats.rendered = function() {
	// project plot
	var datekey = 'postedDate';
	var data = last30days(Projects, datekey);
	plotPerDay(data, 'projects', datekey);
	// user plot
	var datekey = 'createdAt';
	var data = last30days(Meteor.users, datekey);
	plotPerDay(data, 'users', datekey)
	// comment plot
	var datekey = 'postedDate';
	var data = last30days(Comments, datekey);
	plotPerDay(data, 'comments', datekey);
}

// get entries with date in the last 30 days
function last30days(collection, key) {
	var now = new Date();
	var query = {};
	query[key] = {
        $gte: moment(now).subtract('days', 30)
   	}
	return collection.find(query);
}

// count mongo results by key
var countByKey = function(data, key, date) {
	var tmpCounts = {};
	data.forEach(function(entry) {
		var ekey;
		if (date) {
			ekey = moment(entry[key]).format("YYYY/MM/DD");
		} else {
			ekey = entry[key];
		}
		if (!tmpCounts[ekey]) {
			tmpCounts[ekey] = 1
		} else {
			tmpCounts[ekey] += 1
		}
	});
	var counts = [];
	for (var ekey in tmpCounts) {
		counts.push({ date: ekey, count: tmpCounts[ekey] });
	}
	return counts;
}

// generate a range of Date strings
function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push( moment(currentDate).format("YYYY/MM/DD") );
        currentDate = moment(currentDate).add('days', 1);
    }
    return dateArray;
}

// merge counts into key array
function mergeCounts(array, counts) {
	var merged = {};
	counts.forEach(function(obj) {
		merged[obj.date] = obj.count;
	});
	array.forEach(function(key) {
		if (!merged[key]) {
			merged[key] = 0;
		}
	});
	var newcounts = [];
	for (var key in merged) {
		var res = {
			date: key,
			count: merged[key]
		};
		newcounts.push(res);
	}
	return newcounts.sort(comparedates);
}

// comparator for array of date-count objects
function comparedates(a, b) {
	if (a.date < b.date)
		return -1;
	if (a.date > b.date)
		return 1;
	return 0;
}

// attach a d3js per-day barplot
var plotPerDay = function(data, plotid, key) {
	var now = new Date();
	var dates = getDates(moment(now).subtract('days', 30), now);
	function counts() {
		return [{ 
			key: plotid, 
			values: mergeCounts(dates, countByKey(data, key, true))
		}];
	}
	var selector = '#' + plotid + ' svg';

	nv.addGraph(function() {
		var chart = nv.models.multiBarChart()
			.x(function(d) { return d.date })
			.y(function(d) { return d.count })
			.reduceXTicks(false)
			.showControls(false)
			.tooltips(false)
			.showLegend(false)
			.margin({top: 10, right: 60, bottom: 80, left: 25}) 
			.rotateLabels(45);
		// console.log(counts);
		d3.select(selector)
			.datum(counts())
			.call(chart);

		nv.utils.windowResize(chart.update);

		return chart;
	});
}
