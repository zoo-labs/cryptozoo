[View code on GitHub](zoo-labs/zoo/blob/master/app/components/collections/filters/SelectedAttributes.tsx)

The `SelectedAttributes` component is responsible for rendering a list of selected attributes and providing functionality to remove them. It is used in the larger project to allow users to filter search results by attributes such as color, size, etc.

The component imports several utility functions from external modules, including `clearAllAttributes` and `removeParam` from `utils/router`, `useRouter` from `next/router`, and several UI components from `components/primitives`. It also imports `FontAwesomeIcon` and `faClose` from `@fortawesome/react-fontawesome` to display a close icon.

The component defines a `filters` state variable as an array of objects with `key` and `value` properties. It uses the `useEffect` hook to extract all queries of attribute type from the router query object and convert them into token format. If the query is an array, it loops through each value and pushes an object with the key and value to the `filters` array. If the query is not an array, it simply pushes an object with the key and value to the `filters` array. The `filters` state variable is then updated with the resulting array.

The component conditionally renders a `Flex` container with a `wrap` property set to "wrap" and an `align` property set to "center". Inside the container, it maps over the `filters` array and renders a `Button` component for each selected attribute. The `Button` component displays the attribute key and value, along with a close icon. When the close icon is clicked, the `removeParam` function is called to remove the attribute from the router query object.

If there are no selected attributes, the component returns `null`. If there are multiple selected attributes, it also renders a "Clear all" button that calls the `clearAllAttributes` function to remove all attribute queries from the router query object.

Example usage:
```jsx
import SelectedAttributes from 'components/SelectedAttributes'

function SearchResults() {
  return (
    <div>
      <SelectedAttributes />
      {/* Render search results */}
    </div>
  )
}
```
## Questions: 
 1. What is the purpose of the `SelectedAttributes` component?
- The `SelectedAttributes` component is used to display and allow the user to remove selected filters based on attribute type.

2. What is the `Attribute` type used for?
- The `Attribute` type is used to define an array of objects that contain a `key` and `value` property, which represent the attribute type and its corresponding value.

3. What is the purpose of the `clearAllAttributes` and `removeParam` functions?
- The `clearAllAttributes` function is used to remove all attribute filters from the URL query parameters, while the `removeParam` function is used to remove a specific attribute filter from the URL query parameters based on its key and value.