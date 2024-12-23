// Replace the MongoDB statement "db.units.aggregate({$match: {total: 1}})" with your solution.
db.analytics1.createIndex({ year: 1 });

db.analytics1.aggregate([

    { 
      $match: { year: 2022 } 
    },
  
    {
      $addFields: {
        main_co2_cont: {
          $switch: {
            branches: [
              { case: { $eq: ["$coal_co2_cont", { $max: ["$coal_co2_cont", "$gas_co2_cont", "$oil_co2_cont", "$other_co2_cont"] }] }, then: "coal" },
              { case: { $eq: ["$gas_co2_cont", { $max: ["$coal_co2_cont", "$gas_co2_cont", "$oil_co2_cont", "$other_co2_cont"] }] }, then: "gas" },
              { case: { $eq: ["$oil_co2_cont", { $max: ["$coal_co2_cont", "$gas_co2_cont", "$oil_co2_cont", "$other_co2_cont"] }] }, then: "oil" }
            ],
            default: "other"
          }
        }
      }
    },
  
    {
      $merge: {
        into: "analytics1",  
        whenMatched: "merge", 
        whenNotMatched: "discard"
      }
    }
])

