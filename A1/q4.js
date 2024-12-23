// Replace the MongoDB statement "db.units.find()" with your solution.
var res = db.climates.find(
    {},
    {city: 1, region: 1, _id: 0}
).sort(
    {"monthlyAvg.5.rainfall": -1}
).limit(5)
