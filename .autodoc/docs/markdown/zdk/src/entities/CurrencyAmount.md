[View code on GitHub](zoo-labs/zoo/blob/master/zdk/src/entities/CurrencyAmount.ts)

The code defines a class called `CurrencyAmount` that extends another class called `Fraction`. The purpose of this class is to represent an amount of a particular currency, which is specified by the `currency` property. The amount is represented as a fraction, with a numerator and denominator. The `decimalScale` property is used to convert the fraction to a decimal representation, based on the number of decimal places specified by the `currency` object.

The class provides several methods for performing arithmetic operations on `CurrencyAmount` objects, such as `add`, `subtract`, `multiply`, and `divide`. These methods return new `CurrencyAmount` objects that represent the result of the operation. There are also methods for converting the `CurrencyAmount` object to a string representation, such as `toSignificant`, `toFixed`, and `toExact`.

The `fromRawAmount` and `fromFractionalAmount` static methods are used to create new `CurrencyAmount` objects from raw amounts or fractional amounts, respectively. These methods return new `CurrencyAmount` objects that represent the specified amount of the specified currency.

The `wrapped` property returns a new `CurrencyAmount` object that represents the same amount of the wrapped token, if the currency is a token. If the currency is not a token, the `wrapped` property returns a new `CurrencyAmount` object that represents the same amount of the wrapped token of the currency.

The `serialize` method returns a string representation of the `CurrencyAmount` object, which includes the address of the wrapped token and the exact amount of the currency.

This class is likely used throughout the larger project to represent amounts of various currencies, and to perform arithmetic operations on those amounts. It is also likely used to convert between different representations of currency amounts, such as fractions and decimals.
## Questions: 
 1. What is the purpose of the `CurrencyAmount` class?
- The `CurrencyAmount` class represents an amount of a specific currency, with methods for performing arithmetic operations and formatting the amount.

2. What is the difference between `fromRawAmount` and `fromFractionalAmount` methods?
- The `fromRawAmount` method creates a `CurrencyAmount` instance from a raw amount of tokens or ether, while the `fromFractionalAmount` method creates an instance from a fractional amount with a specified numerator and denominator.

3. What is the purpose of the `wrapped` property?
- The `wrapped` property returns a `CurrencyAmount` instance with the same amount but wrapped in a `Token` currency, if the original currency is not already a token.