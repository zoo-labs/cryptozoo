[View code on GitHub](zoo-labs/zoo/blob/master/core/src/features/analytics/Pairs/PairList.tsx)

This code defines a React component called `PairList` that renders a table of data about trading pairs. The component takes two props: `pairs`, an array of objects representing trading pairs, and `type`, a string that determines which columns are displayed in the table. The `pairs` prop is an array of objects, each of which contains information about a trading pair, including the tokens being traded, the address of the pair's contract, and various trading statistics such as liquidity and volume. 

The `PairList` component uses the `Table` component from `../../../components/Table` to render the data in a tabular format. The `Table` component takes three props: `columns`, an array of objects that define the columns of the table; `data`, an array of objects that represent the rows of the table; and `defaultSortBy`, an object that specifies the default sorting order of the table. 

The `columns` prop is defined based on the `type` prop. If `type` is `'all'`, the table displays all available columns, including the trading pair's name, total value locked (TVL), annual percentage yield (APY), daily and weekly trading volume, and daily and weekly trading fees. If `type` is `'gainers'` or `'losers'`, the table displays a subset of these columns, along with additional columns showing the daily and weekly change in liquidity and trading volume for each pair. 

The `PairList` component also defines a helper function called `PairListName`, which takes a `pair` object as a prop and renders the name of the trading pair using the `DoubleCurrencyLogo` component from `../../../components/DoubleLogo`. The `PairList` component uses this function to render the trading pair's name in the first column of the table. 

The `PairList` component also defines a helper function called `getApy`, which calculates the annual percentage yield (APY) for a given trading pair based on its trading volume and liquidity. This function is used to calculate the APY column of the table. 

Overall, this code provides a flexible and reusable component for displaying data about trading pairs in a tabular format. By allowing the user to specify which columns to display based on the `type` prop, the component can be easily customized to fit different use cases.
## Questions: 
 1. What is the purpose of the `PairList` component and what props does it expect?
- The `PairList` component is used to display a table of pairs with their TVL, volume, fees, and APY. It expects an array of pairs and a type prop that can be set to 'all', 'gainers', or 'losers'.
2. What is the `PairListName` component used for and what props does it expect?
- The `PairListName` component is used to display the name of a pair with its logos. It expects a pair prop that contains token0 and token1 objects with id and symbol properties.
3. How is the APY calculated and formatted in the table?
- The APY is calculated using the `getApy` function, which takes in the volume and liquidity of a pair and returns an APY value. If the APY is greater than 1000, it returns '>10,000%'. The APY is then formatted using the `formatPercent` function.