// Replace the MongoDB statement "db.units.aggregate({$match: {total: 1}})" with your solution.
db.coords.createIndex({ city: 1 })
db.climates.createIndex({ city: 1 })


var res = db.coords.aggregate([
    {
        $lookup: {
            from: "climates", 
            localField: "city", 
            foreignField: "city", 
            as: "cc_joined"
        }
    },

    {
        $match: {
            latitude: { $gt: 0 }
        }
    },

    {
        $unwind: "$cc_joined"
    },

    {
        $match: {
            $expr: {
                $gt: [
                    { $arrayElemAt: [ "$cc_joined.monthlyAvg.rainfall", 5 ] }, 
                    { $arrayElemAt: [ "$cc_joined.monthlyAvg.rainfall", 2 ] } 
                ]
            }
        }
    },
    
    {
        $sort: { latitude: 1 }
    },

    {
        $project: {
            _id: 0,
            city: 1,
            latitude: 1
        }
    }
])
