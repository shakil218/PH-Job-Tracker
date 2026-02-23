# DOM & JavaScript Concepts

This README.md file explains important JavaScript DOM concepts in my own words with clear explanations.

---

## 1️. Difference Between getElementById, getElementsByClassName, querySelector, and querySelectorAll
**getElementById()**: selects one element by its unique id and returns a single element.
**getElementsByClassName()**: selects elements by class name and returns a live HTMLCollection.
**querySelector()**: selects the first matching element using CSS selector syntax.
**querySelectorAll()**: selects all matching elements using CSS selector syntax and returns a static NodeList.

## 2. How do you create and insert a new element into the DOM?
To create and insert a new element into the DOM, first use **document.createElement()** to create the element. Then add content or attributes to it. Finally, insert it into the page using methods like **appendChild()**, **append()**, or **prepend()**.

## 3. What is Event Bubbling? And how does it work?
Event Bubbling is a process where an event starts from the target element and propagates upward through its parent elements in the DOM hierarchy.

## 4. What is Event Delegation in JavaScript? Why is it useful?
Event Delegation is a technique where a parent element handles events for its children. It is useful because it improves performance, works for dynamically added elements, and reduces code repetition.

## 5. What is the difference between preventDefault() and stopPropagation() methods?
**preventDefault()** stops the browser’s default action, and **stopPropagation()** stops the event from bubbling up the DOM.
