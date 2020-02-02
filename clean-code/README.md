# clean-code
#### Naming
- Classes should have nouns or noun phrases like Customer, Account. Avoid words like Manager, Processor, Data, Info
- add context by using prefixes: addrFirstName, addrLastName, addrState --> these variables are part of a larger structures --> better to create a class named Address
#### Function
- functions should do one thing and do it well and do it only. If a function does only one those steps that are one level below the stated name of the function, then the function is doing one thing
- divide small function to reuse and override (custom)
- Make sure that the statements within our function are all at the same level of abstraction
    + Divide requirements into many small tasks (level1)
    + Each small task is divided into many other small tasks (level2)
    + ... (some_next_levels)
    + very simple tasks (function)
E.g: 
- To include the setups and teardowns, we include setups, then we include the testpage content, and then we include the teardowns
    + To include the setups, we include the suite setup, then we include the regular setup
        + To include the suite setup, we search the parent hierarchy and add an include statement
        + 
    + To include the testpage content
    + To include the teardowns
#### Function arguments
- the ideal number of arguments for a function is zero, next comes one, followed closely by two. Three arguments should be avoided. 
- should not pass a boolean into a function like flag arguments
E.g: render(isSuit) should be splitted into renderForSuite() and renderForSingleTest()
- argument objects: when a function seems to need more than 2 or 3 arguments, some of those arguments ought to be wrapped into a class of their own
E.g: Circle makeCircle(double x, double y, double radius)
     Circle makeCircle(Point center, double radius)
- checkPassword does not imply that it initialize the session --> should rename the function checkPasswordAndInitializeSession, thought that certainly violates "Do one thing"
- public void appendFooter(StringBuffer report) --> require double check --> change to report.appendFooter()

- uncrossIntegersUpTo(maxValue)

#### Comments
- create a function that says the same thing as the comment you want to write

// Check to see if the employee is eligible for full benefits
if ((employee.flags & HOURLY_FLAG) && (emploee.age > 65))

if (emploee.isEligibleForFullBenefits())

- A comment goes beyond just useful information about the implementation and provides the intent behind a decision
- Translate the meaning of some obscure arguement or return value into something that's readable

assertTrue(a.compareTo(a) == 0) // a == a

- warn other programmers about certain consequences

/ SimpleDateFormat is not thread safe,
// so we need to create each instance independently

- NCThanh-TODO comment explains why the function has a degenerate implementation and what that function's future should be
- Amplifiy the importance of something that may otherwise seem inconsequential
// the trim is real important. It removes the starting spaces that could cause the item to be recognized as another list
- Position Markers: // region Something /////////////////////////////
use them very sparingly and only when the benefit is significant