// Replace the MongoDB statement "db.units.find()" with your solution.
var res = db.climates.find({
    region: "Germany"
}).count()
