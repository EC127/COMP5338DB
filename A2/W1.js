// Replace the MongoDB statement "db.units.aggregate({$count: "total"})" with your solution.
db.co2.createIndex({ "data.year": 1 })

var res = db.co2.aggregate([
    { $unwind: "$data" },
    
    { $match: { "data.year": 2022 } },
    
    { 
        $project: {
            per_capita_gdp: { $divide: ["$data.gdp", "$data.population"] }
        }
    },
    
    { $match: { per_capita_gdp: { $gte: 20000 } } },

    { $count: "count" }
]).next().count



