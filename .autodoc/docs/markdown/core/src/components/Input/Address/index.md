[View code on GitHub](zoo-labs/zoo/blob/master/core/src/components/Input/Address/index.tsx)

The `AddressInput` component is a React functional component that renders an input field for a user to enter a wallet address or ENS name. It is part of a larger project called `zoo`. 

The component takes in several props, including `value`, `onUserInput`, `placeholder`, `className`, `align`, and `fontSize`. The `value` prop is the current value of the input field, while `onUserInput` is a callback function that is called whenever the user types into the input field. The `placeholder` prop is the text that is displayed in the input field when it is empty. The `className` prop is a string of CSS classes that are applied to the input field. The `align` prop specifies whether the text in the input field should be aligned to the left or right. The `fontSize` prop specifies the font size of the text in the input field.

The component uses the `useENS` hook to resolve the ENS name entered by the user into an Ethereum address. The `enforcer` function is called whenever the user types into the input field. It checks that the input is a number between 0 and 100 and calls the `onUserInput` callback with the input if it passes the check.

The component renders an `input` element with various props and styles. The `value` prop is set to the `value` prop passed into the component. The `onChange` prop is set to the `enforcer` function. The `inputMode`, `title`, `autoComplete`, `autoCorrect`, `autoCapitalize`, and `spellCheck` props are set to various values to provide a good user experience. The `placeholder` prop is set to the `placeholder` prop passed into the component. The `pattern` prop is set to a regular expression that matches Ethereum addresses. The `className` prop is set to a combination of the `className` prop passed into the component and some additional classes based on the `align` prop. The `style` prop is set to an object with a `fontSize` property based on the `fontSize` prop.

The `AddressInput` component is exported as the default export of the module.
## Questions: 
 1. What is the purpose of the `useENS` hook being imported from `../../../hooks/useENS`?
- The `useENS` hook is used to retrieve the ENS name and address of the value passed to the `AddressInput` component.

2. What is the purpose of the `enforcer` function?
- The `enforcer` function is used to validate and enforce input restrictions on the `AddressInput` component. It checks if the input is a number less than or equal to 100 and passes it to the `onUserInput` function.

3. What is the purpose of the `align` prop being passed to the `AddressInput` component?
- The `align` prop is used to specify the alignment of the text in the input field, either "right" or "left".