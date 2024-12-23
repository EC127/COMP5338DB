// Replace the MongoDB statement "db.units.find()" with your solution.
var res = db.climates.find({
    "monthlyAvg.10.snowDays": {$exists: 1, $gt: 0}
}).count()