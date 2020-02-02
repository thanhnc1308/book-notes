# Data Science

## Data crawling

1. Operation

- begin with "seed" urls
- fetch and parse them: extract urls and place them on a queue
- fetch each url on th frontier (queue) and repeat

* Problems:
- filter non-interested/interested pages (spam, spider traps)
- huge content --> prioritize for large crawls
- content freshness
- content duplication
- politeness: specify which parts of the site can be crawled (robots.txt). do not hit a server too often
- ??? What if not visited but in frontier already
- robust: don't crash if download fails or timeout. detect and break redirection loops
- determine file type to skip unwanted files
- exploitation (expected value can be predicted with a high confidence) vs exploration (search for new resource of relevant pages)

## Data cleaning

1. Why
- Incomplete (name = '') - missing value, human/hardware/software bugs
- Noisy (salary = -10k) - contain errors or outliers, typos errors
- Inconsistent from different data sources
- Duplicate

- Data munging

2. Data quality problems
- Value level
    + missing value: emplty '' or null
    + syntax violation: zipcode=27655-1875
    + spelling error or typos error: city='Hanio'
    + domain violation: age=240 age:(0;120)
- Value-set level:
    + synonyms: atribute takes different values but same meaning
    + homonyms: same word diff meanings
    + uniqueness violation: duplicate
    + intnegrity contraint violation: sum of percent attribute > 100
- Record level
    + intnegrity contraint violation: total price of a product is different from price plus taxes
- Relation level
    + functional dependency violation (2765-175, ‘Estoril’) and (2765-175, ‘Oeiras’)
    + approximate duplicates (1, André Fialho, 126ti4268) and (2, André Pereira Fialho,126ti4268)!
    + Integrity constraint violation: sum of salaries is superior to the max established
- Multiple tables level
    + Heterogeneous data representations: one table stores meters, another stores inches
    + synonyms, homonyms, approximate duplicates
    + referential integrity violation
    + Different granulari.es: same real world en.ty represented with diff. granularity levels

3. Methodology
- extract individual fields that are relevant
- standardize record fields
- correct data quality problems at value level: missing values, syntax
- correct data quality problems at value-set level and record level 
- correct data quality problems at relation level
- correct data quality problems at multiple relations level
- user feedback: solve instances of data quality problems not addressed by automatic methods
- measure effectiveness

4. Openrefine

5. Data integration: combine data from different sources to provide the user with a unified view
- problems: 
    ??? Users will be provided with homogeneous logical view of data physically distributed over heterogeneous data sources
    ??? All data has to be represented using the same abstrac4on principle (unified global data model and unified semantic)

- Manual integration: users directly interact with all relavent infomation systems and manually integrate selected data. Users have to deal with different user interfaces and query languages. Users need to have detailed knowledge on loca4on, logical data
representa4on, and data seman4cs.
- Common user interface: like web browser, search engines.Data from relevant informa=on systems is s=ll separately presented. Homogenization and integration of data yet has to be done by the
users
- Integration by application: access various data sources and return integrated results to the user. Practical for a small number of component systems. Applications become increasingly fat as the number of system interfaces and data formats to homogenize and integrate grows
- Integration by middle-ware: provides functionality used to solve aspects of the integration problem. Integration efforts are still needed in applications
- Uniform data access: unified global view of
physically distributed data, can be time consuming. Data access, homogenization, and integration have to be
done at runtime
- Common data storage: provides fast data access. 

* Examples
- __data warehouses__
    + Realize a common data storage approach
    + Data from several operational sources (OLTP) are extracted, transformed, and loaded (ETL) into a data warehouse
    + Analysis, such as OLAP, can be performed on cubes of integrated and aggregated data
- operational data store
    + a common data storage
    + A “warehouse with fresh data” is built by immediately propagating updates in local data sources to the data store
    + data is neither cleansed nor aggregated nor are data histories supported
- federated database systems: 
    + Achieve a uniform data access solution by logically integrating data from underlying local DBMS
    + a uniform user interface, enabling users and clients to store and retrieve data from multiple noncontiguous databases with a single query
- workflow management systems: Represent an integration-by-application approach. a uniform user interface, enabling users and clients to store
and retrieve data from multiple noncontiguous databases
with a single query
- __integration by web services: microservices. Performs integration through software components (web services) that support machine-to-machine interaction by XML-based messages. Depending on offered integration functionality either represent__

## Machine learning
- if the system reliably improves its performance P at task T, following experience E
