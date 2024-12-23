// Replace the MongoDB statement "db.units.aggregate({$match: {total: 1}})" with your solution.
db.co2.aggregate([

    { $unwind: "$data" },

    { $match: { "data.year": 2022 } },

    {
        $project: {
            _id: "$region" ,
            co2: "$data.co2",
            data_array: {
                $objectToArray: "$data"  
            }
        }
    },

    {
        $project: {
            _id: 1,
            co2: 1,
            data: {
                $filter: {
                    input: "$data_array",  
                    as: "field",
                    cond: { $regexMatch: { input: "$$field.k", regex: "per_capita" } }  
                }
            }
        }
    },

    {
        $set: {
            data: {
                $arrayToObject: "$data"  
            }
        }
    },

    {
        $project: {
            _id: 1,
            co2: 1,
            data: {
                $map: {
                    input: { $objectToArray: "$data" },  
                    as: "ky",  
                    in: { 
                        $arrayToObject: [ 
                            [{ k: "$$ky.k", v: "$$ky.v" }]  
                        ]
                    }
                }
            }
        }
    },

    { $out: "analytics3" }

])
