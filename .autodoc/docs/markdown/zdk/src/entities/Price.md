[View code on GitHub](zoo-labs/zoo/blob/master/zdk/src/entities/Price.ts)

The `Price` class in the `zoo` project is used to represent the price of a currency pair. It extends the `Fraction` class and has three properties: `baseCurrency`, `quoteCurrency`, and `scalar`. The `baseCurrency` and `quoteCurrency` properties represent the two currencies in the currency pair, while the `scalar` property is used to adjust the raw fraction with respect to the decimals of the `baseCurrency` and `quoteCurrency`.

The `Price` class has a constructor that takes either the `baseCurrency` and `quoteCurrency` amounts or an object containing the `baseAmount` and `quoteAmount` properties. The constructor calculates the `denominator` and `numerator` of the `Fraction` using the provided amounts and sets the `baseCurrency`, `quoteCurrency`, and `scalar` properties.

The `Price` class has three methods: `invert()`, `multiply()`, and `quote()`. The `invert()` method returns a new `Price` object with the `baseCurrency` and `quoteCurrency` properties swapped. The `multiply()` method multiplies the `Price` object with another `Price` object and returns a new `Price` object. The `quote()` method takes a `CurrencyAmount` object representing the `baseCurrency` amount and returns a `CurrencyAmount` object representing the corresponding `quoteCurrency` amount.

The `Price` class also has two private methods: `adjustedForDecimals` and `toSignificant()`. The `adjustedForDecimals` method returns the `Price` object multiplied by the `scalar` property. The `toSignificant()` method returns a string representation of the `Price` object with a specified number of significant digits.

Overall, the `Price` class is an important part of the `zoo` project as it is used to represent the price of a currency pair and perform calculations on it. For example, it can be used to calculate the price of a token in another token, or to calculate the value of a trade. Here is an example of how the `Price` class can be used:

```
import { Price } from 'zoo'

const price = new Price(tokenA, tokenB, 100, 200) // create a new price object
const invertedPrice = price.invert() // invert the price object
const multipliedPrice = price.multiply(anotherPrice) // multiply the price object with another price object
const quotedAmount = price.quote(baseAmount) // get the quote amount for a given base amount
const significantPrice = price.toSignificant(4) // get the price with 4 significant digits
const fixedPrice = price.toFixed(2) // get the price with 2 decimal places
```
## Questions: 
 1. What is the purpose of the `Price` class and how is it used in the `zoo` project?
- The `Price` class is used to represent the price of a currency pair in a decentralized exchange. It takes in two currency types, a numerator and denominator, and constructs a price based on the ratio of the two. It also has methods for inverting the price, multiplying it with another price, and quoting a currency amount against the price.

2. What is the significance of the `scalar` property in the `Price` class?
- The `scalar` property is used to adjust the raw fraction of the price with respect to the decimals of the base and quote currencies. It is a fraction that represents the ratio of the base currency's decimals to the quote currency's decimals, and is used to scale the numerator and denominator of the price accordingly.

3. What is the purpose of the `toSignificant` and `toFixed` methods in the `Price` class?
- The `toSignificant` method returns a string representation of the price with a specified number of significant digits, while the `toFixed` method returns a string representation of the price with a specified number of decimal places. Both methods use the `adjustedForDecimals` property to format the price based on the decimals of the base and quote currencies.