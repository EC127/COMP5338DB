// Replace the MongoDB statement below with your solution.
db.climates.updateMany(
    {
        "monthlyAvg.5.dryDays": {$lte: 15},
        "monthlyAvg.6.dryDays": {$lte: 15},
        "monthlyAvg.7.dryDays": {$lte: 15}
    },
    {$set: {rainy_mid_year: "yes"}}
)

