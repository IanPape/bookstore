### Conceptual Exercise

Answer the following questions below:

- What is React? When and why would you use it?
React is a JavaScript library for building user interfaces. It's useful for creating dynamic web applications because it efficiently updates and renders only the components that change.

-What is Babel?
Babel is a JavaScript compiler that lets you use next-generation JavaScript, by transforming it into a backwards compatible version. It's great for using new features in old browsers.

-What is JSX?
JSX is a syntax extension for JavaScript that looks similar to XML or HTML. It's used in React to describe what the UI should look like.

-How is a Component created in React?
A component in React is created by defining a class or a function that returns a React element, typically using JSX.

-What are some difference between state and props?
State is internal and controlled by the component itself, while props are external and controlled by whatever renders the component.

-What does "downward data flow" refer to in React?
It means that data flows from parent components down to child components through props, which helps keep the component hierarchy clean and understandable.

-What is a controlled component?
A controlled component is one where React controls the input elements, like forms, and handles their values via state.

-What is an uncontrolled component?
An uncontrolled component works like traditional HTML form inputs, where the form data is handled by the DOM itself, not by React state.

-What is the purpose of the key prop when rendering a list of components?
The key prop helps React identify which items in a list have changed, are added, or are removed, which helps in efficiently updating the UI.

-Why is using an array index a poor choice for a key prop when rendering a list of components?
Using an array index can lead to performance issues and bugs in updates because it might not uniquely identify a list item if the order changes or if items are added or removed.

-Describe useEffect. What use cases is it used for in React components?
useEffect is a hook that manages side-effects in functional components, like fetching data, setting up a subscription, or manually changing the DOM.

-What does useRef do? Does a change to a ref value cause a rerender of a component?
useRef returns a mutable ref object whose .current property is initialized with the passed argument. Changing a ref does not cause a component to rerender.

-When would you use a ref? When wouldn't you use one?
You'd use a ref for managing focus, reading values, or storing a mutable reference that doesn't cause rerenders. Avoid using refs for things that should cause a render when they change, like data that impacts the UI directly.

-What is a custom hook in React? When would you want to write one?
A custom hook is a function that uses other hooks to encapsulate reusable logic. You'd write one to share logic between different components or to keep your components tidy.