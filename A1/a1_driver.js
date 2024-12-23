conn = new Mongo();

db = conn.getDB("city_data");

load("q1.js");
print("** Q1 results **")
print(res);
print();

load("q2.js");
print("** Q2 results **")
print(res);
print();

load("q3.js");
print("** Q3 results **")
printjson(res);
print();

load("q4.js");
print("** Q4 results **")
while (res.hasNext())
{
    printjson(res.next());
}
print();

load("q5.js");
print("** Q5 results **")
while (res.hasNext())
{
    printjson(res.next());
}
print();

load("q6.js");
print("** Q6 has finished executing. **")
print("All six queries have finished execution.");
