# Copilot Instructions for AI Agents

# Building modal component

# Component props
- title: The title of the modal
- content: The content to be displayed in the modal
- isOpen: A boolean indicating whether the modal is open
- onClose: A function to call when the modal is closed

# Component Slots
- default: The default slot for modal content
- header: The slot for the modal header
- footer: The slot for the modal footer

# Component Events
- close: Emitted when the modal is closed
- open: Emitted when the modal is opened
- beforeClose: Emitted before the modal is closed
- afterClose: Emitted after the modal is closed
- beforeOpen: Emitted before the modal is opened
- afterOpen: Emitted after the modal is opened

# Component Methods
- open: Opens the modal
- close: Closes the modal

# Dev note
- Use pinia for state management
- Ensure proper cleanup of event listeners
- Consider using teleport for modals
- Implement a11y best practices
- Provide a way to customize the modal's appearance and behavior
- Allow for dynamic content updates
- The combination should be pinia store, composable, and vue component. I want to be able to call method function via composable.
- Add support for multi-stack modals

Note: The modal component should be accessible and follow best practices for focus management.