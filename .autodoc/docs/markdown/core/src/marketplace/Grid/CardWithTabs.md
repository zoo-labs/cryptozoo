[View code on GitHub](zoo-labs/zoo/blob/master/core/src/marketplace/Grid/CardWithTabs.tsx)

The `CardWithTabs` component is a reusable React component that renders a card with three tabs. The component takes in three props, `TabA`, `TabB`, and `TabC`, which are used to render the content of each tab. The component also takes in three optional props, `TabAName`, `TabBName`, and `TabCName`, which are used to set the names of each tab. If these props are not provided, the default names "My Wallet", "My Bids", and "My Auctions" are used.

The component uses the `useSelector` hook from the `react-redux` library to get the `zooBalance` value from the Redux store. It also uses the `useZoobalance` hook from the `state/zoo/hooks` module to fetch the `zooBalance` value from the server. The `useEffect` hook is used to call the `getZooBalance` function when the component mounts and whenever the `getZooBalance` function changes.

The component renders a header that displays the `zooBalance` value. The `zooBalance` value is formatted using the `toLocaleString` method to add commas and decimal places. The header also includes a gradient background and a row of three tabs. The active tab is highlighted with a black background, while the inactive tabs have a transparent background. When a tab is clicked, the `HandleChangeTab` function is called to update the `Tab` state variable, which determines which tab is active. The content of the active tab is rendered below the header.

This component can be used in the larger project to display a card with three tabs that allow the user to switch between different views of their wallet, bids, and auctions. The component can be customized by passing in different content for each tab and by setting the names of the tabs. Here is an example of how the `CardWithTabs` component can be used:

```
<CardWithTabs
  TabAName="My NFTs"
  TabBName="My Offers"
  TabCName="My Collections"
  TabA={<NFTList />}
  TabB={<OfferList />}
  TabC={<CollectionList />}
/>
```
## Questions: 
 1. What is the purpose of the `CardWithTabs` component?
- The `CardWithTabs` component is a reusable component that renders a tabbed interface with three tabs: "My Wallet", "My Bids", and "My Auctions". It also displays the user's wallet balance.

2. What is the purpose of the `useSelector` hook from the `react-redux` library?
- The `useSelector` hook is used to extract data from the Redux store state. In this case, it is used to get the `zooBalance` value from the `zoo` slice of the store.

3. What is the purpose of the `useZoobalance` hook from the `state/zoo/hooks` module?
- The `useZoobalance` hook is a custom hook that dispatches an action to fetch the user's `zooBalance` from an API endpoint and updates the `zoo` slice of the Redux store with the new value. It is used in the `useEffect` hook to fetch the balance when the component mounts.