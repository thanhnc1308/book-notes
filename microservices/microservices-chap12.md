Problems: 
- Microservices have multiple services that are executed on different physical machines
- Hard to gather data from a distributed system.
- A server can also crash and become unavailable
- No easy task to track down a request through your system (A request coming into the system will most likely flow through multiple pods (pods is containers) running on different physical machines, and you have no easy way to track down that request by accessing logs)

Requirements:
- Make sure you persist log data so it survives through service restarts and scaling
- Aggregate all log data from multiple services and instances of those services in a
central location
- Make the stored data usable, allowing for easy searches and further processing

Goals: 
- have an infrastructure or a single point that allows you to collect log data from all your services, aggregating it and allowing you to perform searches
- set up the tracing capability

Purposes:
- use the available data to audit, debug, or even gather new insights by processing it further
- use available information to collect the IP data stored in the logs and generate a visualization showing the most common geographic areas of your users.

Note: To effectively store and make your log data searchable, you first need to agree on a format the engineering team will use

Data to collect:
- Application logs
- Database logs 
- Network logs
- Performance data collected from the underlying operating system

12.2 Generate consistent, structured, human-readable logs

Useful infomation to include in log entries
- Timestamp:
    + to correlate data and order it appropriately
    + should be granular and verbose: use 4-digt years and best resolution available
    + each service should render its own timestamps in microseconds and include a time zone (GMT/UTC)
- Identifiers
    + should use unique identifiers: Request IDs, user IDs
    + to group data from different sources
- Source
    + identify the source of a given log entry for debugging
    + including host, class or module, function, filename
    + Add execution times on a given function call --> identify bottlenecks and potential performance issues
- Level or category
    + each log entry should contain a category: type of data or log level (ERROR , DEBUG , INFO , WARN)
    + to group data and automate the process of error reporting

Structure and Readability
- human-readable and machine-parseable data
- avoid binary encoding of data. use ID, file size of image instead of binary representation
- avoid multiline logs as lead to fragmentation while parsing them in log aggregation tools and easy to lose infomation
- use JSON to encode log entries. use a Python library logstash-formatter
- Logstash is a tool to collect, process, and forward events and log messages from multiple sources. It provides multiple plugins to configure data collecting. 
- Use V1 format specification: information about the source (host running the app), time taken to process the action, file name, function, module, line number emitting the log, timestamp UTC, message indicating the starting of the server, log level or category


