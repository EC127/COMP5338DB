// Replace the MongoDB statement "db.units.aggregate({$match: {total: 1}})" with your solution.
db.coords.createIndex({ elevation: 1 });

var res = db.coords.aggregate([
    {
        $match: {
            elevation: { $gt: 500 }
        }
    },

    {
        $lookup: {
            from: "climates",
            localField: "city_id",
            foreignField: "_id",
            as: "city_region"
        }
    },

    { $unwind: "$city_region" },

    {
        $group: {
          _id: "$city_region.region"  
        }
    },

    {
        $lookup: {
            from: "analytics1",
            let: { regions: "$_id" },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$id", "$$regions"] },
                                { $gte: ["$year", 2001] },
                                { $lte: ["$year", 2022] },
                            ]
                        }
                    }
                },
                { $project: { _id: 0, year: 1, co2: 1 } }
            ],
            as: "year_co2"
        }
    },

    { $unwind: "$year_co2" },

    {
        $group: {
            _id: "$_id",
            co2_emissions: { $push: "$year_co2.co2" }
        }
    },
  
    {
        $addFields: {
            average_emissions: { $avg: "$co2_emissions" } 
        }
    },

    {
        $project: {
            region: "$_id",
            co2_emissions: "$co2_emissions",
            average_emissions: "$average_emissions",
            _id: 0
        }
    },

    { $sort: { average_emissions: 1 }},

    { $limit: 3 },

])
