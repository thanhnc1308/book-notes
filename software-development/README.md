## Requirement Modeling
### Use case
- describes __a sequence of events__, performed by the software, that yields an __observable result__ of value to a particular __actor__ (- anything that interacts with the software)
### Actors 
- anything __interacts__ with the software and interchange info with the software
- can represent a human, a machine, or another software but __not a part of the software (external)__. The ones who use the software, get info or provide info, support and maintain the software or what other software use this software. A database that is external to software can be an actor
e.g:
Student --> Register for courses
Professor --> Submit grades
User --> input amount of transations

- Use case: describe the behavior that the use case upport, start with a verb and use a simple verb-noun combination. Will the actor CRUD data? Will the actor need to inform the software about external events or changes? Use cases are about the users' experience of your
system, instead of its internal workings
e.g: enter amount of money is not a use case as it is not a complete action. it should be withdraw money
- Use case must be triggered by an actor

#### Relation
- Between actors: generalization (inheritance), association
Commercial Customer --generalization--> Customer
- Between actor and use cases: association
- Between use cases: generalization, include, extend
    + Generalization: must use empty triagle symbol. child use case inherits the behavior and meaning of parent use case and can add or override
    + Include: seperated arrow. Base use case explicitly incorporates the behavior of another use case. The included use case never stands alone but is only instatiated as part of some larger base. e.g place order ---include ----> validate users. place order is base use case and can not stand alone
    + Extend: base use case implicitly incorporates the behavior of another use case. base use case may stand alone. e.g Place order <--extend----- Place rush order. Place order is base use case and can stand alone. 

### Use case specification
- Brief description: describe briefly the purpose of UC
- Flow of events: main flow and several alternative flow (regular variants - cancel transaction at any time, odd cases - clear input and submit, exceptional flows - invalid 3 times)

### Glossary
- Introduction: purpose of glossary
2. Definitions
2.1. Course
2.2. Course Offering

### Supplementary specification
- Functionality: list of the functional requirements that are general to many use case: system error logging, remote access
- Usability: requirement that relate to, or affect, the usability of the software: online help, window compliance
- Reliability: mean time between failure or defects
- Performance: response times
- Supportability: maintain

* Note:
- Actor: add Sites - send category list and in-stock list, 
- change name sales dept. to sales employee
- add login, logout, administrator
- overseas import sites: action view orders
- sale employee: create order, change state of order
- site: get data from site and auto update
- vietlish: 
- Kho: xem đơn hàng, nhập kho đơn hànga