[View code on GitHub](zoo-labs/zoo/blob/master/core/src/modals/SearchModal/ManageTokens.tsx)

The `ManageTokens` component is a React component that is responsible for managing custom tokens in the Zoo project. It imports several components and hooks from other files in the project, including `RowBetween`, `RowFixed`, `useRemoveUserAddedToken`, `useUserAddedTokens`, `CurrencyLogo`, `CurrencyModalView`, `ExternalLink`, `ExternalLinkIcon`, `ImportRow`, `Token`, `Trash`, `getExplorerLink`, `isAddress`, `useActiveWeb3React`, and `useToken`.

The component takes two props: `setModalView` and `setImportToken`. `setModalView` is a function that sets the view of the currency modal, and `setImportToken` is a function that sets the token to be imported.

The component renders a search input field that allows users to search for custom tokens by address or symbol. It also displays a list of all custom tokens that have been added by the user, along with the option to remove them. The list is generated using the `userAddedTokens` hook, which retrieves all custom tokens stored locally in the user's browser. The `removeToken` function is used to remove a token from the list when the user clicks on the trash icon next to it.

The component also provides a tip at the bottom of the page, informing users that custom tokens are stored locally in their browser.

Overall, the `ManageTokens` component is an important part of the Zoo project, as it allows users to manage their custom tokens and provides a user-friendly interface for doing so. It is likely used in conjunction with other components and features of the project, such as the currency modal and token import functionality.
## Questions: 
 1. What is the purpose of the `ManageTokens` component?
- The `ManageTokens` component manages the display and removal of custom tokens stored locally in the user's browser.

2. What external libraries or components are being used in this code?
- The code imports several components from the `../../components` directory, as well as the `Token` type from the `@zoolabs/zdk` library and the `Trash` icon from the `react-feather` library.

3. What is the significance of the `useMemo` hook in this code?
- The `useMemo` hook is used to memoize the `tokenList` variable, which is an array of JSX elements representing the user's custom tokens. This can improve performance by preventing unnecessary re-renders of this component when other parts of the application change.