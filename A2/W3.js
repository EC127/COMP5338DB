// Replace the MongoDB statement "db.units.aggregate({$match: {total: 1}})" with your solution.
db.climates.createIndex({ region: 1 })

var res = db.co2.aggregate([

    { $unwind: "$data" },

    { 
        $match: { 
            "data.year": { $in: [1970, 2020] }
        }
    },

    {
        $group: {
            _id: "$region",
            co2_per_capita: { $push: "$data.co2_per_capita" }
        }
    },

    {
        $project: {
            region: "$_id",
            co2_growth: {
                $subtract: [
                    { $arrayElemAt: ["$co2_per_capita", 1] },  
                    { $arrayElemAt: ["$co2_per_capita", 0] }   
                ]
            }
        }
    },

    { $sort: { co2_growth: -1 } },
    { $limit: 5 },

    {
        $lookup: {
            from: "climates",
            localField: "region",
            foreignField: "region",
            as: "climate_data"
        }
    },

    { $unwind: "$climate_data" },

    {
        $project:{
            city_name: "$climate_data.city",
            co2_growth: "$co2_growth",
            _id: 0
        }
    },

    {
        $lookup:{
            from: "coords",
            localField: "city_name",
            foreignField: "city",
            as: "city_coords"
        }
    },

    { $unwind: "$city_coords"},

    { 
        $match: {
            $or: [
                { "city_coords.latitude": { $gt: 30 } },
                { "city_coords.latitude": { $lt: -30 } }
            ]
        }
    },

    {
        $project:{
            _id: 0,
            city_name: "$city_name",
            co2_growth: "$co2_growth"
        }
    }

])

