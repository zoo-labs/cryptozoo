[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/convert/basisPointsToPercent.ts)

The code above is a function that converts a basis points value to a Percent object from the '@zoolabs/zdk' library. The purpose of this function is to provide a convenient way to convert a basis points value to a Percent object that can be used in other parts of the project. 

The function takes in a single argument, a number representing the basis points value to be converted. The function then creates a new Percent object using the JSBI.BigInt() method from the '@zoolabs/zdk' library. The first argument passed to the JSBI.BigInt() method is the basis points value, while the second argument is the value 10000, which represents the total number of basis points in a whole number. 

For example, if the function is called with the argument 500, it will return a Percent object representing 5%. This is because 500 basis points is equal to 5% of the total value. 

Here is an example of how this function could be used in the larger project:

```
import { basisPointsToPercent } from 'zoo'

const basisPointsValue = 250
const percentValue = basisPointsToPercent(basisPointsValue)

console.log(percentValue.toString()) // "2.5%"
```

In this example, the basisPointsToPercent() function is imported from the 'zoo' module. The function is then called with a basis points value of 250, which is equal to 2.5% of the total value. The resulting Percent object is stored in the variable percentValue, which can then be used in other parts of the project. Finally, the toString() method is called on the Percent object to convert it to a string representation of the percentage value. 

Overall, this function provides a simple and convenient way to convert basis points values to Percent objects in the '@zoolabs/zdk' library, which can be used in other parts of the project.
## Questions: 
 1. What is the purpose of the `@zoolabs/zdk` library and how is it being used in this code?
- The `@zoolabs/zdk` library is being imported to use the `JSBI` and `Percent` classes. Its purpose is not clear from this code alone and would require further investigation.

2. What is the expected input and output of the `basisPointsToPercent` function?
- The function takes in a number representing basis points and returns a new `Percent` object using the `JSBI` class to convert the basis points to a percentage.

3. Are there any potential errors or edge cases that need to be considered when using this function?
- It is not clear from this code if any error handling or input validation is being performed, so a smart developer may want to investigate and consider potential edge cases such as negative numbers or non-numeric inputs.