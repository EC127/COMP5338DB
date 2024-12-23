conn = new Mongo();

db = conn.getDB("emissions");

load("w1.js");
print("** W1 results **")
print(res);
print();

load("w2.js");
print("** W2 results **")
while (res.hasNext())
{
    printjson(res.next());
}
print();

load("w3.js");
print("** W3 results **")
while (res.hasNext())
{
    printjson(res.next());
}
print();

load("w4.js");
print("** Workload W4 has executed. This workload does not print results. **")
print();

load("w5.js");
print("** Workload W5 has executed. This workload does not print results. **")
print();

load("w6.js");
print("** W6 results **")
while (res.hasNext())
{
    printjson(res.next());
}
print();

load("w7.js");
print("** Workload W7 has executed. This workload does not print results. **")
print();

load("w8.js");
print("** Workload W8 has executed. This workload does not print results. **")
print();

print("All eight aggregation workloads have finished execution.");
