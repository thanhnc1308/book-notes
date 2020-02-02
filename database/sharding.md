Sharded collections are partitioned and distributed across the shards in the cluster
Choose shard key:
 - frequency of value
 - cardinality of value
 - rate of change monotonically: A shard key on a value that increases or decreases monotonically is more likely to distribute inserts to a single shard within the cluster.


#Sharding: distribute data across multiple machines
-> support deployments with very large data sets and high throughput operations

#Problem: 
- capacity of single server
- high query rates

#System growth:
- Vertical scaling: 
    + increase capacity of single server: more powerful CPU, more RAM, storage
    + Dis: practical maximum for vertical scaling

- Horizontl scaling: 
    + divide system dataset and load over multiple servers
    + each machine handles a subset of overall workload
    + Dis: increase complexity in infrastructure and maintaince for the deployment

#Sharded Cluster
- shard: 
    + contains a subset of sharded data. can be deployed as a REPLICA SET
    + each shard as 3 member REPLICA SET
    + Each database in a sharded cluster has a primary shard that holds all the un-sharded collections for that database. Each database has its own primary shard. 
    + The primary shard has no relation to the primary in a replica set.
    + sh.status() primary shard, chunk distribution across the shards
    + Internal Authentication
- mongos: 
    + query router - interface between client apps and sharded cluster
    + one or more
    + multiple mongos routers supports high availability and scalability --> place a mongos on each app server ---> reduce network latency
    + Alternatively, you can place a mongos router on dedicated hosts. Large deployments benefit from this approach because it decouples the number of client application servers from the number of mongos instances. This gives greater control over the number of connections the mongod instances serve.
    + The mongos tracks what data is on which shard by caching the metadata from the config servers. The mongos uses the metadata to route operations from applications and clients to the mongod instances
    + A mongos instance routes a query to a cluster by:
Determining the list of shards that must receive the query.
Establishing a cursor on all targeted shards.
    + Targeted operation: use shard key value to locate the shard or subset of shards that satisfy the query document
    + broadcast operation: dont include the shard key --> query all shards. merge data and return result document.
- config servers: 
    + store metadata (list of chunks on every shard and the ranges that define the chunks --> route read and wirte operations to the correct shards) and configuration (Authentication such as Role-Based Access Control or internal authentication) settings for the cluster. must be deployed as REPLICA SET
    + as 3 member REPLICA SET --> improve consistency
    + Each sharded cluster must have its own config servers. Do not use the same config servers for different sharded clusters.
    + To deploy config servers as a replica set, the config servers must run the WiredTiger storage engine.
    + Restrictions: 0 arbiters, no delayed members, build indexes
    + Always back up the config database before doing any maintenance on the config server.
    + access config database: use config
    + The admin database and the config database exist on the config servers.
    + The config database contains the collections that contain the sharded cluster metadata. MongoDB writes data to the config database when the metadata changes, such as after a chunk migration or a chunk split.
    + MongoDB reads from the admin database for authentication and authorization data and other internal uses.
    + MongoDB reads from the config database when a mongos starts or after a change in the metadata, such as after a chunk migration. Shards also read chunk metadata from the config servers.
    + If the config server replica set loses its primary and cannot elect a primary, the cluster’s metadata becomes read only. You can still read and write data from the shards, but no chunk migration or chunk splits will occur until the replica set can elect a primary.

- distribute replica set members across 2-3 data centers --> if one down, data is still available to read
- CSRS: 3 data centers. or evenly distribute the data bearing members across the 2 data centers and store the reamining member (data bearing member or an arbiter to ensure odd number of members) in the cloud

#MongoDB shards data at the collection level, distributing the collection data across the shards in the cluster.

#Shard Keys
- To distribute the documents in a collection, MongoDB partitions the collection using the shard key. 
- shard key: All sharded collections must have an index that supports the shard key; i.e. the index can be an index on the shard key or a compound index where the shard key is a prefix of the index.indexed field or indexed compound fields that exist in every document in the collection
- Each range defines a non-overlapping range of shard key values and is associated with a chunk.
If the collection is not empty, you must create the index first before using sh.shardCollection().
- Shard Key Specification
To shard a collection, you must specify the target collection and the shard key to the sh.shardCollection() method
- The cardinality of a shard key determines the maximum number of chunks the balancer can create. This can reduce or remove the effectiveness of horizontal scaling in the cluster.
- if your data model requires sharding on a key that has low cardinality, consider using a compound index using a field that has higher relative cardinality.
- frequency of value of field
- The frequency and rate of change of the shard key also contributes to data distribution
- If the shard key value is always increasing, all new inserts are routed to the chunk with maxKey as the upper bound. If the shard key value is always decreasing, all new inserts are routed to the chunk with minKey as the lower bound. The shard containing that chunk becomes the bottleneck for write operations.
- The shard key consists of an immutable field or fields that exist in every document in the target collection.
- The choice of shard key cannot be changed after sharding. 
- A sharded collection can have only one shard key
- shard non-empty collection: collection must have an index that starts with the shard key
- empty collection: creates the index if collection does not already have an appropriate index for the specified shard key

???The choice of shard key affects the performance, efficiency, and scalability of a sharded cluster. A cluster with the best possible hardware and infrastructure can be bottlenecked by the choice of shard key. The choice of shard key and its backing index can also affect the sharding strategy that your cluster can use
sharding strategy? backing index? how to choose shard key?

#Chunks
- MongoDB partitions sharded data into chunks. 
???Difference between chunks and cluster
???Each chunk has an inclusive lower and exclusive upper range based on the shard key.

#Balancer and Even Chunk Distribution¶
???In an attempt to achieve an even distribution of chunks across all shards in the cluster, a balancer runs in the background to migrate chunks across the shards .

#Advantages
- Read/Write: Mongo  distributes the read and write workload across the shards in the sharded cluster
---> scaled horizontally across the cluster by adding more shards
?For queries that include the shard key or the prefix of a compound shard key, mongos can target the query at a specific shard or set of shards. These targeted operations are generally more efficient than broadcasting to every shard in the cluster.
- Storage capacity
- High availability

In production environments, individual shards should be deployed as replica sets, providing increased redundancy and availability.
A sharded cluster can continue to perform partial read / write operations even if one or more shards are unavailable

#Considerations Before Sharding¶
- choose shard key
- operational requirements and restrictions
- If queries do not include the shard key or the prefix of a compound shard key, mongos performs a broadcast operation, querying all shards in the sharded cluster. --> long running 

- Unsharded collections are stored on a primary shard. Each database has its own primary shard.

#Connect to a sharded cluster
You can connect to a mongos the same way you connect to a mongod, such as via the mongo shell or a MongoDB driver

Shard A: Collection 1 (sharded), Collection 2 (Unsharded)
Shard B: Collection 1

#Sharding strategy

- Hashed sharding:
    + compute a hash of value of a single field as the index value; this value is used as your shard key
    + Each chunk is then assigned a range based on the hashed shard key values.
    + MongoDB automatically computes the hashes when resolving queries using hashed indexes. Applications do not need to compute hashes.
    While a range of shard keys may be “close”, their hashed values are unlikely to be on the same chunk.
    + Adv: more even data distribution, especially in data sets where the shard key changes monotonically (increase or decrease - new inserts will be in maxKey or minKey).
    + Dis: hashed distribution means that ranged-based queries on the shard key are less likely to target a single shard, resulting in more cluster wide broadcast operations
    + The field you choose as your hashed shard key should have a good cardinality, or large number of different values. Hashed keys are ideal for shard keys with fields that change monotonically like ObjectId values or timestamps. A good example of this is the default _id field, assuming it only contains ObjectID values.
    + sh.shardCollection( "database.collection", { <field> : "hashed" } )
    
???Hashed vs ranged sharding

- Ranged sharding
    + dividing data into ranges based on the shard key values. 
    + Each chunk is then assigned a range based on the shard key values.
    + Adv: A range of shard keys whose values are “close” are more likely to reside on the same chunk. This allows for targeted operations as a mongos can route the operations to only the shards that contain the required data
    + The efficiency of ranged sharding depends on the shard key chosen
    + Large Shard Key Cardinality, Low Shard Key Frequency, Non-Monotonically Changing Shard Keys
    + sh.shardCollection( "database.collection", { <shard key> } )
#Zone

- based on shard key
- associate each zone with one or more shards in cluster 
- associate a shard with many zones

???Each zone covers one or more ranges of shard key values. Each range a zone covers is always inclusive of its lower boundary and exclusive of its upper boundary.

- must use fields contained in the shard key when defining a new range for a zone to cover. If using a compound shard key, the range must include the prefix of the shard key.
- can not change the shard key after sharding the collection ---> carefully consider the possibility of using zone sharding
- Adv: improve the locality of data for sharded cluster that span multiple data centers
Tip: set up zone and zone range before shard an empty collection

???Collations in Sharding


