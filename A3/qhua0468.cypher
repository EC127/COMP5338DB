//Q1
//Find the number of questions with more than one answer but no accepted answer.
MATCH (q:Question)
WHERE q.answer_count > 1 AND q.accepted_answer_id IS NULL
RETURN COUNT(q) AS q1result;

//Q2
//Find the first question that has been asked, answered and commented on by the same user.
MATCH (q:Question)<-[:ASKED]-(u:User)-[:PROVIDED]->(a:Answer)-[:ANSWERED]->(q:Question)<-[:COMMENTED_ON]-(c:Comment)<-[:COMMENTED]-(u:User)
WITH apoc.date.format(q.creation_date,'s','yyyy-MM-dd HH:mm:ss') as creationTime, q.title as questionTitle, u.display_name as username
ORDER BY creationTime asc 
LIMIT 1
RETURN creationTime, questionTitle, username;

//Q3
//Find the top 5 tags excluding ‘neo4j’ and ‘cypher’ of the questions with no accepted answers.
MATCH (q:Question)-[:TAGGED]->(t:Tag)
WHERE q.accepted_answer_id IS NULL 
AND NOT t.name IN ['neo4j', 'cypher']
WITH t.name AS tname, COUNT(q) AS num
ORDER BY num DESC
LIMIT 5
RETURN tname, num;

//Q4
//Find the top 5 users based on the number of accepted answers they provide.
MATCH (u:User)-[:PROVIDED]->(a:Answer)-[:ANSWERED]->(q:Question)-[:TAGGED]->(t:Tag)
WHERE a.is_accepted = TRUE
WITH u.display_name AS username, COUNT(a) AS num, COLLECT(DISTINCT t.name) AS list, AVG(a.score) AS avgresult
ORDER BY num DESC
LIMIT 5
RETURN username, num, list, avgresult;

//Q5
//Find all users who have provided at least two answers where all answers provided have been accepted and at least one of these answers has a score greater than 0
MATCH (u:User)-[:PROVIDED]->(a:Answer)
WITH u.display_name AS username, COUNT(a) AS num, COLLECT(a.is_accepted) AS list, SUM(a.score) AS sum
WHERE num >= 2 
AND NOT FALSE IN list
AND sum > 0
RETURN username, num
ORDER BY username ASC;