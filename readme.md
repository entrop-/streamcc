## note from developer: 

* provided json is invalid so application crashes (as it should), error is cached and thrown. i could provide validation but task description clearly stated data would be valid so I think app works as demanded. all json data until error is saved into output. 
* `index.js` should contain bootstrap only and mechanism should be in module, but i believe if its simple enough, abstractions should be cut down to minimum. also im lazy.
* i hate using global variables (for counting average friend count), but (see second point above). also there is no scope and changing prototypes to add them would be a little bit of overkill.
* there are no tests. nor docker. i could add it on demand but i really dont want to.
* `.ndjson` file insilde `input` catalog contains smaller part of an input file for development purposes. theres a "broken" json line inside too.
* it took me about 6 hours to complete including about an hour of actual typing. it took me a month to sit down and do it, for which please accept my apology.  


# original task description:

The main focus of this task is processing big amounts of data. You are provided with an example dataset which needs transforming.

## input

The input data is in the provided `data.ndjson.gz` file. It contains personal records of a million of users. The format is newline delimited json, that is each line is a valid json object.

## expected output

The data needs to be transformed into a CSV file.

## things to consider

- If you have trouble transforming all the user data, provide as many properties of each user as you can
- Try to process all the data in one go
- The age property is wrong, try to correct it based on the birthday property if you can
- If you can, try to provide a summary after processing containing the avarage number of friends each user has
- Try to avoid blocking the event loop