[View code on GitHub](zoo-labs/zoo/blob/master/lab/src/hooks/ContractReader.js)

## Code Explanation

The `useContractReader` function is a custom React hook that enables the user to read values from smart contracts and keep track of them in the local React states. The function takes in several parameters, including the `contracts` object, which contains the loaded contracts, the `contractName`, which specifies the name of the contract, the `functionName`, which specifies the name of the variable in the contract, and the `args` array, which contains the arguments required by the function.

The function also takes in a `pollTime` parameter, which specifies the time interval for updating the value. If no `pollTime` is specified, the function will update on every new block. The `formatter` parameter is an optional function that can be used to format the value returned by the contract function. The `onChange` parameter is a callback function that is called whenever the value changes.

The function uses the `useState` hook to create a state variable `value` that holds the current value of the contract variable. It also creates a state variable `tried` that is used to keep track of whether the function has been called at least once.

The function uses the `useEffect` hook to call the `onChange` function whenever the `value` changes. It also uses the `useOnBlock` and `usePoller` hooks to update the `value` at regular intervals. The `useOnBlock` hook is used to update the `value` whenever a new block is mined, while the `usePoller` hook is used to update the `value` at regular intervals specified by the `pollTime` parameter.

If the `tried` variable is false and the `contracts` object is not null, the function calls the `updateValue` function to update the `value` variable.

## Example Usage

```javascript
import useContractReader from "./useContractReader";

const MyComponent = ({ readContracts }) => {
  const purpose = useContractReader(readContracts, "MyContract", "purpose");
  return <div>{purpose}</div>;
};
```

In the above example, the `useContractReader` hook is used to read the value of the `purpose` variable from the `MyContract` contract. The `readContracts` object is passed as a parameter to the hook, which contains the loaded contracts. The `purpose` variable is then displayed in the component.
## Questions: 
 1. What is the purpose of this code?
   
   This code enables reading values from contracts and keeping track of them in local React states.

2. How can a developer use this code?
   
   A developer can use this code by calling the `useContractReader` function and passing in the necessary parameters such as `readContracts`, `contractName`, `functionName`, `args`, `pollTime`, `formatter`, and `onChange`.

3. What are the features of this code?
   
   The features of this code include providing `readContracts` by loading contracts, specifying the name of the contract and the variable in the contract to keep track of, passing an `args` array if the function requires, passing `pollTime` to specify the time interval for updates, and using a `formatter` to format the value returned by the contract function. Additionally, the `onChange` function can be used to trigger an action when the value changes.