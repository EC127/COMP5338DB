// Replace the MongoDB statement "db.units.find()" with your solution.
var res = db.climates.find(
    { city: { $regex: /([a-zA-Z])\1/, $options: "i" } },
    {city: 1, _id: 0}
).sort(
    {city: 1}
)
