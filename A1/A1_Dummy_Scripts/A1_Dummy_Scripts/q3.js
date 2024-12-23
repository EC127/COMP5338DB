// Replace the MongoDB statement "db.units.distinct("Code")" with your solution.
var res = db.climates.distinct(
    "region",
    {
        "monthlyAvg.2.low": {$lte: 2},
        "monthlyAvg.6.high": {$gte: 25}
    }
)
