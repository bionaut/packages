# React Modal Hub

The React Modal Hub is a library designed to manage modals easily in your React application. It provides a simple hook and context to help you handle modals with minimal boilerplate. It also ensures type safety for your modal props and allows modals to be easily opened, closed, and configured from anywhere in your application.

[Storybook DEMO](https://bionaut.github.io/toolbelt/?path=/story/modalhub--modal-hub-story)


## Installation

```sh
npm install react-modal-hub
```

## Usage

First, wrap your application with the `ModalHubProvider`:

```jsx
import { ModalHubProvider } from 'react-modal-hub'

function App() {
  return (
    <ModalHubProvider>
      <App />
    </ModalHubProvider>
  )
}
```

To create a modal, first define a component that takes `onClose` as a prop:

```jsx
import { ModalHubProps } from 'react-modal-hub'

interface MyModalProps extends ModalHubProps {
  title: string;
}

function MyModal({ title, onClose }: MyModalProps) {
  // render your modal here
  // call onClose when you want to close the modal
}
```

Then, use the `useModalHub` hook to control your modal:

```jsx
import { useModalHub } from 'react-modal-hub'

function ComponentThatOpensModal() {
  const myModal = useModalHub(MyModal, { title: 'Default title' })

  return <button onClick={myModal.open}>Open MyModal</button>
}
```

The `useModalHub` hook returns an object with the following methods and properties:

- `open`: A function that opens the modal.
- `close`: A function that closes the modal.
- `isOpen`: A boolean that indicates if the modal is open.
- `openWithProps`: A function that opens the modal with the provided props.

`openWithProps` allows you to open the modal with different props:

```jsx
myModal.openWithProps({ title: 'Overridden title' })
```

## Example

Please check the `modal-hub-story.tsx` file for a complete example on how to use this library.
