# Monolithic
- Easy to package into one file
- Easy to deploy with small projects and teams

# Scale
- Vertical scaling
- Horizontal scaling

# Microservices
- loosely coupled
- Each services can use different technology
- Each service runs on its own instance

## Scale
- Functional scaling
- Team scaling

??? Microservice of Bizweb

## Problems
- __Nhất quán databases among every services__
- __Different services run on different host, server and version ussualy change__
- Authentication and access specifier
- Testing
- Monitoring and logging behavior services
- Communication
- Configuration

## Principles
1. Database per service
- Database of service A only can be accessed by service A
- Each service has its own database
- Transaction of a service is only related to database of that service
??? Using saga instead of 2PC --> nhat quan data

2. API Gateway
- the only address to access
3. Client-side discovery, Server-side discovery

4. Messaging, Remote Procedure Invocation