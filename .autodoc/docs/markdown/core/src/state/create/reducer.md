[View code on GitHub](zoo-labs/zoo/blob/master/core/src/state/create/reducer.ts)

This code defines a Redux reducer for managing the state of a form used to create a new asset. The state is represented by an object of type `CreateState`, which has four properties: `independentField`, `typedValue`, `collateral`, and `asset`. The `independentField` property is an enum value indicating which field in the form is currently being edited independently of the other field. The `typedValue` property is a string representing the user's input in the currently active field. The `collateral` and `asset` properties are objects with a single property `currencyId`, which is a string representing the ID of the currency selected for that field.

The reducer handles four types of actions: `replaceCreateState`, `selectCurrency`, `switchCurrencies`, and `typeInput`. The `replaceCreateState` action is dispatched when the user submits the form, and its payload contains the values of all four form fields. The reducer updates the state to reflect these values. The `selectCurrency` action is dispatched when the user selects a currency from a dropdown menu in one of the form fields. The reducer updates the state to reflect the new currency selection. If the user selects the same currency for both fields, the reducer swaps the order of the fields. The `switchCurrencies` action is dispatched when the user clicks a button to swap the currencies between the two fields. The reducer updates the state to reflect this change. The `typeInput` action is dispatched when the user types a value into one of the form fields. The reducer updates the state to reflect the new value.

This reducer is used in conjunction with other reducers and middleware to manage the overall state of the application. For example, the state managed by this reducer might be used to populate a preview of the new asset on the screen, or to enable/disable a "submit" button based on whether all required fields have been filled out. Here is an example of how this reducer might be used in a React component:

```jsx
import { useDispatch, useSelector } from 'react-redux'
import { CreateState, selectCurrency, switchCurrencies, typeInput } from './zoo'

function CreateAssetForm() {
  const dispatch = useDispatch()
  const createAssetState = useSelector((state: { createAsset: CreateState }) => state.createAsset)

  function handleCurrencySelect(field: Field, currencyId: string) {
    dispatch(selectCurrency({ field, currencyId }))
  }

  function handleSwitchCurrencies() {
    dispatch(switchCurrencies())
  }

  function handleTypeInput(field: Field, typedValue: string) {
    dispatch(typeInput({ field, typedValue }))
  }

  return (
    <form>
      <label>
        Collateral:
        <CurrencyDropdown
          value={createAssetState.collateral.currencyId}
          onChange={(currencyId) => handleCurrencySelect(Field.COLLATERAL, currencyId)}
        />
      </label>
      <label>
        Asset:
        <CurrencyDropdown
          value={createAssetState.asset.currencyId}
          onChange={(currencyId) => handleCurrencySelect(Field.ASSET, currencyId)}
        />
      </label>
      <button onClick={handleSwitchCurrencies}>Switch</button>
      <input
        type="text"
        value={createAssetState.typedValue}
        onChange={(event) => handleTypeInput(createAssetState.independentField, event.target.value)}
      />
      <button type="submit">Create Asset</button>
    </form>
  )
}
```
## Questions: 
 1. What is the purpose of the `CreateState` interface and what fields does it contain?
- The `CreateState` interface defines the shape of the state object for the `zoo` project's create feature. It contains fields for `independentField`, `typedValue`, `collateral`, and `asset`, each with their own `currencyId` property.

2. What is the purpose of the `createReducer` function and how is it used in this code?
- The `createReducer` function is used to create a Redux reducer function for the `zoo` project's create feature. It takes an initial state object and a builder function that defines how the state should be updated in response to different actions.

3. What is the purpose of the `switchCurrencies` case in the reducer and what does it do?
- The `switchCurrencies` case in the reducer is used to handle the action of switching the `collateral` and `asset` currencies in the `zoo` project's create feature. It updates the state object by swapping the `currencyId` properties of the `collateral` and `asset` fields, and also updates the `independentField` property to reflect the new active field.