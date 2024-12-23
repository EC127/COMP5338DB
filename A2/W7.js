// Replace the MongoDB statement "db.units.aggregate({$match: {total: 1}})" with your solution.
db.co2.aggregate([

    { $unwind: "$data" },

    {
        $match: {
            $and: [
                { "data.year": { $gte: 2001, $lte: 2021 } },  
                { "data.energy_per_capita": { $exists: true } } 
            ]
        }
    },
    
    {
        $group: {
            _id: "$region",
            estimated_annual_energy_y01_y21: {
                $push: {
                    $multiply: ["$data.energy_per_capita", "$data.population"]
                }
            }
        }
    },

    { $out: "analytics2" }

])



