strive to craft effective
you’re fatigued from outages
applications built using microservices are made up of loosely coupled, autonomous services
building services that do one thing well
has striking implications for
# What is a mircoservice application?
- __A microservice application is a collection of autonomous services, each of which does one thing well, that work together to perform more intricate operations__
- These services collaborate with each other through
technology-agnostic messaging protocols, either point-to-point or asynchronously
- easier to maintain and more malleable in the face of change.
???__Cohesion is the degree to which elements of a certain module belong together, whereas coupling is the degree to which one element knows about the inner workings of another__
- In monolithic app, design for these properties at a class, module,
or library level
- In a microservice application, you aim instead to attain these proper-
ties at the level of independently deployable units of functionality. A single microservice should be highly cohesive: it should be responsible for some __single capability__ within an application.
- the less that each service knows about the inner workings of other
services --> easy to make changes
### Characteristics
- Each microservice is responsible for a single capability
- A microservice owns its data store, if it has one --> reduces coupling between services because other services can only access data they don’t own through the interface that a service provides
- Microservices themselves, not the messaging mechanism that connects them nor another piece of software, are responsible for choreography and collaboration  — the sequencing of messages and actions to perform some useful activity
- Each microservice can be deployed independently
- A microservice is replaceable
- Building services along the lines of single capabilities places natural bounds on size and responsibility
- Autonomy allows you to develop, deploy, and scale services independently.
- Developing small, autonomous services can reduce friction in the development of long-running complex systems
- By delivering cohesive and independent pieces of functionality, you can build a system that’s malleable and resilient in the face of change, helping you to deliver sustainable business impact with reduced risk.
####
- microservices are responsible for coordinating actions in a system is the crucial difference between this approach and traditional service-oriented architectures (SOAs)
### Key principles (read more)
#### Autonomy
#### Resilience
#### Transparency
#### Automation
#### Alignment

### Challenge
- Scoping and identifying microservices requires substantial domain knowledge.
- The right boundaries and contracts between services are difficult to identify and, once you’ve established them, can be time-consuming to change.
- Microservices are distributed systems and therefore require different assumptions to be made about state, consistency, and network reliability.
- By distributing system components across networks, and increasing technical heterogeneity, microservices introduce new modes of failure.
- It’s more challenging to understand and verify what should happen in normal operation

#### Scoping microservices requires domain knowledge
__responsible for a single capability__
- refactor across multiple distinct codebases
- migrate data from one service’s database to anothe
- identified implicit dependencies between services, which could
lead to errors or incompatibility on deployment
#### Maintaining contracts between services
__independent of the implementation of other services (autonomy)__
- expose a contract  — analogous to an interface in object-oriented design defining the messages it expects to receive and respond with
- Complete  — Defines the full scope of an interaction
- Succinct  — Takes in no more information than is necessary, so that consumers can construct messages within reasonable bounds
- Predictable  — Accurately reflects the real behavior of any implementation
#### Distributed systems
The network is reliable.
¡	 Latency is zero.
¡	 Bandwidth is infinite.
¡	 Transport cost is zero.
- application’s underlying state data is spread across a multitude of places — consistency becomes challenging
- __consider how a service might operate in an inconsistent state and how to roll back in the event of transaction failure__
#### Operation problems
__???__
- If something goes wrong and your user’s order isn’t placed, how would you determine where the fault occurred? --> monitor and logs center
- deploy a new version of a service without affecting order placement? --> k8s
- know which services were meant to be called
- test that this behavior is working correctly across multiple services
- What happens if a service is unavailable?
- Overload: Service instances become saturated with requests and fail to respond or pass timeout limits
- Downstream failure: Service dependencies may fail or respond slowly.
- Third party failure: Requests to third party dependencies may fail.
- Hardward failure: The hardware running the database or service instances
fails.
__Rather than eliminating risk, microservices move that cost to later in the lifecycle of your system: reducing friction in development but increasing the complexity of how you deploy, verify, and observe your application in operation__
### Microservice development lifecycle
#### Design
##### Scoping services
- model services based on the business capabilities they provide to an organization
##### Communication
- sync is easy async is highly decoupled and reduces risk of changes
##### Resiliency
- backing off in the event of errors, limiting request rates from poor collaborators, and dynamically finding healthy services
#### Deploy
- ensure consistency across services
    + Standardize microservice deployment artifacts --> use Docker container
    + Implement continuous delivery pipelines (produce software that they
can reliably release to production at any time) --> use K8s and Jenkins. Building a set of validations that your software has to pass through. At each
stage of your deployment process, you should be able to prove the correctness of your code. Automating the pipeline that delivers your code from commit to production
    + Deployment pipeline: Code commit --> [Build --> Unit test --> Package --> Integration test --> Acceptance  test] --> Production
#### Monitor
- proactively identify and refactor fragile implementation in your
system --> need to architect dependencies between services in ways that’ll allow for partial degradation. One service going down shouldn’t bring down the whole application 
- understand how your system is behaving: Collecting logs and metrics — and unifying them for analytical and alerting purposes