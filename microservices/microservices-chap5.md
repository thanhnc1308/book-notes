# Transactions and queries in microservices
- Monolithic apps rely on transactions to guarantee consistency and isolation (a single database, framworks that support for starting, committing or rollling back transactional operations)
- Microservice: Each service is responsible for a specific capability
- __Decentralized data ownership also makes retrieving data more complex --> need to build application-level mechanisms to maintain overall data consistency__
- Queries that previously used database-level joins now require calls to multiple services
- Interactions between services (cross-service process) might fail, causing business processes to halt, leaving your system in an inconsistent state
--> use sagas to coordinate complex transactions across multiple services
## Consistency in a distributed application
- an inconsistent state: stock is reserved, an order is cre-
ated, but you haven’t charged the customer

1. Why not use distributed transactions?
- Need to design a system that achieves transactional guarantees across multiple services
??? a confirmation system like blockchain?
- __2-phase commit (2PC) protocol: use a transaction manager to split operations across multiple resources into two phases: prepare and commit__
    - In the prepare phase, the transaction manager instructs resources to prepare their relevant action. (return success or failure state)
    - In the commit phase, the transaction manager instructs
resources to commit or abort the prepared action.
- 2PC implies synchronicity of communication between the transaction manager and resources. If a resource is unavailable, the transaction can’t be committed and
must roll back. This in turn increases the volume of retries and decreases the availability of the overall system. To support asynchronous service interactions, you would
need to support 2PC with services and the messaging layer between them, limiting your technical choices.
- In a microservice application, availability is the product of all microservices involved in processing a given action. Because no service is 100% reliable, __involving more services lessens overall reliability, increasing the probability of failure__
- Violate service autonomy principle
- a distributed transaction places a lock on the resources under transactionto ensure isolation. This makes it inappropriate for long-running operations, as it increases the risk of contention and deadlock
## Event-based communication
- synchronous approach: the orders service orchestrates the behavior of other services, invoking a sequence of steps until the order is placed to the market. If any steps fail, the orders service is responsible for initiating rollback action with other services, such as reversing the charge. In this approach, the orders service takes on substantial responsibility
---> tightly couple and limit the independence and increasing the difficulty of making future changes.

## Events and choreography
- Each service subscribes to events that interest it to know when it must perform some work
- Events allow you to take an optimistic approach to availability. For example, if the fees service were down, the orders service would still be able to create orders. When the fees service came back online, it could continue processing a backlog of events. You can extend this to rollback: if the fees service fails to charge because of insufficient funds, it could emit a ChargeFailed event, which other services would then consume to cancel order placement.
- choreographed: each service reacts to events, acting independently
without knowledge of the overall outcome of the process


## Sagas Pattern
- A saga is a coordinated series of local transactions; a previous step triggers each step in the saga
- As with distributed transactions, locking in long-lived transactions reduces availability — a saga solves this as a sequence ofinterleaved, individual transactions
- ensure that the system ultimately reaches a consistent state, even if individual transactions fail
- uncertainty — an interaction across multiple services may not have a guaranteed outcome
- In a distributed transaction, you manage uncertainty using
locks on data; without transactions, you manage uncertainty through semantically appropriate workflows that confirm, cancel, or compensate for actions as they occur
- Coffee Buying: Order, Pay, Prepare, Deliver. Some steps may go wrong but eventually customer will get the coffee
- compensating actions in sagas to undo previous operations and return
your system to a more consistent state. The system isn’t guaranteed to be returned to the original state; the appropriate actions depend on business semantics
1. Choreographed sagas
- each action, Tx , is performed in response to another, but without an overall conductor or orchestrator
- __previous action emits an event and some next actions consume it__
- Each of these tasks might fail — in which case, your application should roll back to a sane, consistent state. Each of your tasks has a compensating action __triggered by events__. Event Fail --> rollback. Event Success --> Continue
- For example, imagine that placing the order to market fails. The market service will cancel the order by emitting an event — OrderFailed — that each other service involved in this saga consumes. When receiving the event, each service will act appropriately: the orders service will cancel the customer’s order; the transaction service will cancel the stock reservation; and the fees service will reverse the fee charged
- This form of rollback is intended to make the system semantically, not mathematically consistent. Your system on rollback of an operation may not be able to return to the exact same initial state. Imagine one of the tasks executed on calculating the fees was sending out an email. You can’t unsend an email, so you’d instead send another one acknowledging the error and saying the amount that the fees service had charged was deposited back to the account.
#### Pros
- participating services don’t need to explicitly know about each other, which ensures they’re loosely coupled
#### Cons
- make validation challenging, spreading those rules across multiple distinct services
- increases the complexity of state management: each service needs to reflect distinct states in the processing of an order. For example, the orders service must track whether an order has been created, placed, canceled, rejected
- difficult to know how far along a process is - introduces cyclic dependencies between services: the orders service emits events that the market service consumes, but, in turn, it also consumes events that the market service emits.
--> when opting for an asynchronous communication style, you must invest
in monitoring and tracing to be able to follow the execution flow of your system
2. Orchestrated sagas
- a service takes on the role of orchestrator (or coordinator): __a process that executes and tracks the outcome of a saga across multiple services__. An orchestrator might be an independent service — recall the verb-oriented services from chapter 4 — or a capability of an existing service
-The sole responsibility of the orchestrator is to manage the execution of the saga. It may interact with participants in the saga via asynchronous events or request/response messages. Most importantly, it should track the state of execution for each stage in theprocess; this is sometimes called the saga log. 
- __the orders service tracks the execution of each substep in the process of placing an order. orchestrator also could track the outcome of actions 1 and 2__
- __coordinator as a state machine: a series of states and transitions between those states. Each response from a  ollaborator triggers a state change, moving the orchestrator toward the saga outcome__
#### Pros
- __Centralizing the saga’s sequencing logic in a single service__ makes it significantly easier to reason about the outcome and progress of that saga
- simplify individual services, reducing the complexity of states they need to manage, because that logic moves to the coordinator
#### Cons
- run the risk of moving too much logic to the coordinator. At worst, this makes the other services anemic wrappers for data storage
--> __for building long-running interactions__
- Some advocate peer-to-peer choreography???

3. Interwoven sagas
- Unlike ACID transactions, sagas aren’t isolated. The result of each local transaction is immediately visible to other transactions affecting that entity. This visibility means that a given entity might get simultaneously involved in multiple, concurrent sagas
- Sagas can be interrupted by other sagas: For now, imagine that a customer placed an order by accident and wanted to cancel it. If they issued their request before the order was placed to market, the order placement saga would still be in progress, and this new instruction would potentially need to interrupt it
- handling interwoven sagas
#### Short - circuiting
You could prevent the new saga from being initiated while the order is still within another saga. For example, the customer couldn't cancel the order until after the market service attempted to place it to the market
#### Locking
- use locks to control access to an entity. Different sagas that want to change the state of the entity would wait to obtain the lock. 
- place a reservation — or lock — on a stock balance to ensure that a
customer can’t sell a holding twice if it’s involved in an active order.
--> lead to deadlocks if multiple sagas block each other trying to access the lock, requiring you to implement deadlock monitoring and timeouts to make sure the system doesn’t grind to a halt.
#### Interruption
- choose to interrupt the actions taking place. 
- For example, you could update the order status to “failed.” When receiving a message to send an order to market, the market gateway could revalidate the latest order status to ensure the order was still valid to send, and in this case it would see a “failed” status
---> increases the complexity of business logic but avoids the risk of deadlocks.

## Consistency pattern
- sagas rely heavily on compensating actions
- two patterns for dealing with failure: 
    + compensating actions (refund my coffee payment): perform an action that undoes prior actions
    + retries (try to make the coffee again): retry until success or timeout
    + Ignore: do nothing in the event of errors (if overall data set is large)
    + restart: reset to the original state and start again
    + tentative operation: perform a tentative operateion and confirm or cancel later

## Event sourcing
- event sourcing pattern: rather than publishing events about entity state, you represent state entirely as a sequence of events that have happened to an object
