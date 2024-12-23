// Replace the MongoDB statement "db.units.aggregate({$match: {total: 1}})" with your solution.
db.co2.aggregate([

    { $unwind: "$data" },

    {
        $project: {
            _id: { $concat: ["$iso_code", "-", { $toString: "$data.year" }] },
            id: "$region",
            year: "$data.year",
            co2: "$data.co2",
            coal_co2_cont: { $multiply: [{ $divide: ["$data.coal_co2", "$data.co2"] }, 100] },
            gas_co2_cont: { $multiply: [{ $divide: ["$data.gas_co2", "$data.co2"] }, 100] },
            oil_co2_cont: { $multiply: [{ $divide: ["$data.oil_co2", "$data.co2"] }, 100] },
        }
    },

    {
        $addFields: {
            other_co2_cont: { 
                $subtract: [ 
                    100, 
                    {
                        $add: ["$coal_co2_cont", "$gas_co2_cont", "$oil_co2_cont"]
                    }
                ]
            }
        }
    },
    
    { $out: "analytics1" }  
])


