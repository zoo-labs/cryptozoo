[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/styling.ts)

The `classNames` function is a utility function that takes in any number of string arguments and returns a single string that concatenates all the non-empty string arguments with a space in between. This function is useful for dynamically generating class names for HTML elements based on certain conditions or states.

For example, if we have a button element that should have a different class name depending on whether it is disabled or not, we can use the `classNames` function to generate the appropriate class name:

```javascript
const isDisabled = true;
const buttonClass = classNames('button', { 'button--disabled': isDisabled });
// buttonClass will be 'button button--disabled' if isDisabled is true
```

In this example, we pass in two string arguments to `classNames`: `'button'` and `'button--disabled'`. We also pass in an object with a single key-value pair: `'button--disabled': isDisabled`. This means that if `isDisabled` is truthy (in this case, it is `true`), the `'button--disabled'` string will be included in the final output.

The `classNames` function is a simple but powerful utility that can help keep our code DRY (Don't Repeat Yourself) by allowing us to generate class names dynamically based on various conditions. It can be used in any part of the project where we need to generate class names for HTML elements.
## Questions: 
 1. What is the purpose of this function?
   This function takes in any number of strings as arguments and returns a single string that concatenates all the non-empty strings with a space in between.

2. What is the significance of the spread operator (...) before the classes parameter?
   The spread operator allows the function to accept any number of arguments as an array, which can then be manipulated using array methods like filter and join.

3. What does the filter method do in this function?
   The filter method removes any empty or falsy values from the array of classes before joining them together with a space.