[View code on GitHub](zoo-labs/zoo/blob/master/ui/src/lib/numbers.ts)

The `zoo` project contains a module that provides functions for formatting Ethereum (ETH) values into human-readable formats. The module exports three functions: `formatBN`, `formatNumber`, and `toFixed`.

The `formatBN` function takes an ETH amount, a maximum number of decimal digits, and an optional number of decimals as arguments. It returns the ETH value as a string or `-` if the amount is `null` or `undefined`. The function first checks if the amount is `null` or `undefined` and returns `-` if it is. It then converts the amount to a number and formats it using the `Intl.NumberFormat` API. The function uses the `utils.formatUnits` function from the `ethers` library to convert the amount to a number if it is not already a number. The function also checks if the browser is Safari and applies a workaround for a bug in the `Intl.NumberFormat` API that affects the fraction part of the formatted value. The function returns the formatted value as a string.

The `formatNumber` function takes an ETH amount and a maximum number of decimal digits as arguments. It returns the ETH value as a string or `-` if the amount is `null` or `undefined`. The function uses the `Intl.NumberFormat` API to format the amount with the specified number of decimal digits. The function returns the formatted value as a string.

The `toFixed` function takes a number and a number of decimal digits as arguments. It returns the number as a string with the specified number of decimal digits. The function uses a regular expression to match the number of decimal digits and returns the matched value or the original number if no match is found.

These functions can be used in the `zoo` project or in other projects that require formatting of ETH values. For example, the `formatBN` function can be used to format ETH values in a user interface that displays ETH balances or transaction amounts. The `formatNumber` function can be used to format ETH values in a chart or graph that displays historical ETH prices. The `toFixed` function can be used to format ETH values in a smart contract that requires a fixed number of decimal digits.
## Questions: 
 1. What is the purpose of the `formatBN` function?
- The `formatBN` function is used to convert ETH values to human-readable formats with a specified number of decimal digits.

2. Why is there a check for Safari browser in the code?
- There is a check for Safari browser in the code because Safari has a few bugs with the fraction part of `formatToParts`, sometimes rounding when unnecessary and when the amount is in the thousands not properly representing the value in compact display. 

3. What is the purpose of the `truncateFractionAndFormat` function?
- The `truncateFractionAndFormat` function is used to truncate the fraction part of a number to a specified number of digits and format the number as a string. It is used in the `formatBN` function to format the parts of the number returned by `formatToParts`.