[View code on GitHub](zoo-labs/zoo/blob/master/core/src/functions/filtering.ts)

The code in this file provides functions for filtering and sorting tokens in a larger project called zoo. The file imports the Token and TokenInfo classes from the zdk and token-lists modules, respectively, as well as the isAddress function from a local validate module and the useMemo hook from the React library.

The createTokenFilterFunction function takes a search query string as input and returns a filter function that can be applied to a list of tokens. If the search query is an Ethereum address, the filter function checks whether the token's address matches the query. Otherwise, the function splits the search query into lowercase parts and checks whether each part is a substring of the token's name or symbol. The function returns true if the token matches all search query parts.

The filterTokens function takes a list of tokens and a search query string as input and returns a filtered list of tokens that match the search query. It uses the createTokenFilterFunction to create a filter function and applies it to the list of tokens.

The useSortedTokensByQuery function takes a list of tokens and a search query string as input and returns a sorted list of tokens that match the search query. It uses the useMemo hook to memoize the sorted list of tokens and avoid unnecessary re-renders. The function first checks whether the search query matches exactly one token symbol. If so, it returns a list of tokens that match the exact symbol. Otherwise, it sorts the tokens into three lists: exact matches, substring matches on symbol, and the rest. The function returns a concatenated list of these three lists, sorted in that order.

Overall, this file provides useful functions for filtering and sorting tokens in the larger zoo project. For example, the filterTokens function could be used to display a list of tokens that match a user's search query, while the useSortedTokensByQuery function could be used to display a sorted list of tokens that match the query. These functions could be used in various parts of the zoo project, such as a token search feature or a token list display.
## Questions: 
 1. What is the purpose of the `createTokenFilterFunction` function?
- The `createTokenFilterFunction` function creates a filter function that can be used to filter an array of tokens based on a search query.

2. What is the purpose of the `useSortedTokensByQuery` function?
- The `useSortedTokensByQuery` function sorts an array of tokens based on a search query, with exact matches first, followed by tokens with a symbol that starts with the search query, and then the rest of the tokens.

3. What is the purpose of the `alwaysTrue` function?
- The `alwaysTrue` function is a helper function that always returns `true`, and is used as a fallback filter function in case the search query is empty.