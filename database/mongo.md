# Optimize query
## Create indexes
-  If a query searches multiple fields, create a compound index. 
db.posts.createIndex( { timestamp : 1 } )
---> optimze this query:  db.posts.find().sort( { timestamp : -1 } )
- Limit the number of query results: db.posts.find().sort( { timestamp : -1 } ).limit(10)
[limit](https://docs.mongodb.com/manual/reference/method/cursor.limit/#cursor.limit)
- Use [projections](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/#read-operations-projection) to return only necessary data
db.posts.find( {}, { timestamp : 1 , title : 1 , author : 1 , abstract : 1} ).sort( { timestamp : -1 } )
- Use $hint to Select a Particular Index
-  $inc 
- Aggregation: Golden rule, always "match" first.
queryPlanner.winningPlan.stage displays COLLSCAN to indicate a collection scan.

Collection scans indicate that the mongod had to scan the entire collection document by document to identify the results. This is a generally expensive operation and can result in slow queries.

executionStats.nReturned displays 3 to indicate that the query matches and returns three documents.

executionStats.totalKeysExamined displays 0 to indicate that this is query is not using an index.

executionStats.totalDocsExamined displays 10 to indicate that MongoDB had to scan ten documents (i.e. all documents in the collection) to find the three matching documents.

queryPlanner.winningPlan.inputStage.stage displays IXSCAN to indicate index use.

- With compound indexes, the order of the fields matter.
the inequality operators $nin and $ne are not very selective since they often match a large portion of the index. As a result, in many cases, a $nin or $ne query with an index may perform no better than a $nin or $ne query that must scan all documents in a collection.

taking advantage of the creation of indexes may be counterproductive because:

By having more indexes, there are more plans that MongoDB can use to satisfy our query, and for that, the process to select the most efficient plan ends up taking longer.
The indexes at the same time give us performance in response time. Also they suppose a cost in memory, which is limited and, in case of surpassing, it will have to save the index in disk slowing down the query.

 implement indexes in the most frequent and selective queries. These queries are the best excluding or filtering documents

 In the query planner, the information to be emphasized is the “stage” and “inputStage”, every inputStage indicates the stage that was performed previously, being its possible values:

COLLSCAN For a query above all documents in a collection.
IXSCAN For a query using some index.
FETCH For retrieve documents.
SHARD_MERGE For merging results from shards.
As to the executionStats, the most important data is:

nReturned: Number of documents returned.
executionTimeMillis: Amount of time to perform the query.
totalKeysExamined: Number of examined keys.
totalDocsExamined: Number of examined documents.

#### Copy a collection
db.myoriginal.aggregate([ { $match: {} }, { $out: "mycopy" } ])

https://www.sitepoint.com/7-simple-speed-solutions-mongodb/
https://www.yudiz.com/mongodb-query-optimization-techniques/
Text Index:
If you need to search for text or array fields, then add text index.
Text indexes can include any field whose value is a string or an array of string elements.

db.users.createIndex( { comments: "text" } )
db.users.createIndex( { comments: "text" } )

for (var i = 0; i < 100000; i++) {

db.test.insert({"refID":"dc3cc674-4796-11e9-9c05-0242c0a81002","keyCompany":"company0","ref":{"refTypeID":{"$numberInt":"2"},"refTypeName":"Chi"},"invoices":[{"refDetailID":"dc3e6602-4796-11e9-9c05-0242c0a81002","discription":"Tạm ứng cho nhân viên","amountOC":{"$numberInt":"1000"},"amount":{"$numberInt":"1000"},"sortOrder":{"$numberInt":"1"},"status":{"$numberInt":"0"}},{"refDetailID":"dc3e99b6-4796-11e9-9c05-0242c0a81002","discription":"Chi khác","amountOC":{"$numberInt":"1000"},"amount":{"$numberInt":"1000"},"sortOrder":{"$numberInt":"1"},"status":{"$numberInt":"0"}},{"refDetailID":"dc3ebcc6-4796-11e9-9c05-0242c0a81002","discription":"Gửi tiền vào ngân hàng","amountOC":{"$numberInt":"1000"},"amount":{"$numberInt":"1000"},"sortOrder":{"$numberInt":"1"},"status":{"$numberInt":"0"}},{"refDetailID":"dc3ee14f-4796-11e9-9c05-0242c0a81002","discription":"Suất ăn trưa","amountOC":{"$numberInt":"1000"},"amount":{"$numberInt":"1000"},"sortOrder":{"$numberInt":"1"},"status":{"$numberInt":"0"}},{"refDetailID":"dc3f041d-4796-11e9-9c05-0242c0a81002","discription":"Chi phí đào tạo","amountOC":{"$numberInt":"1000"},"amount":{"$numberInt":"1000"},"sortOrder":{"$numberInt":"1"},"status":{"$numberInt":"0"}}],"refDate":{"$date":{"$numberLong":"1530576000000"}},"postedDate":{"$date":{"$numberLong":"1546473600000"}},"refNoFinance":"CT1","accountObjectID":"CTY THIENTAN","accountObjectName":"Công ty cổ phần Thiên Tân","accountObjectAddress":"2310 Láng Hạ, Đống Đa, Hà Nội","accountObjectContactName":"Nguyễn Hữu Thắng","journalMemo":"Lì xì Dev","description":"Mua thiết bị mới","documentInclude":"documentInclude1.doc","totalAmountOC":{"$numberInt":"2889"},"totalAmount":{"$numberInt":"0"},"editVersion":{"$date":{"$numberLong":"1541203200000"}},"refOrdef":{"$numberInt":"1"},"createdDate":{"$date":{"$numberLong":"1546473600000"}},"createdBy":"Nguyễn Văn Lâm","modifiedDate":{"$date":{"$numberLong":"1527984000000"}},"modifiedBy":"Nguyễn Đình Quân"})

}



### db.users.createIndex( { comments: "text" } )

AllowDiskUse in aggregate:
AllowDiskUse : true, aggregation operations can write data to the _tmp subdirectory in the Database Path directory. It is used to perform the large query on temp directory. For example

db.orders.aggregate(
    [
            { $match: { status: "A" } },
            { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
            { $sort: { total: -1 } }
    ],
    {
            allowDiskUse: true
    },
)
db.orders.aggregate(
    [
            { $match: { status: "A" } },
            { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
            { $sort: { total: -1 } }
    ],
    {
            allowDiskUse: true
    },
)

