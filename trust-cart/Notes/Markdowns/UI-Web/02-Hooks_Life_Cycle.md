# React Functional Components: Lifecycle Management with Hooks

### Core Concept

* In **React functional components**, lifecycle behavior is managed using **Hooks**.
* The primary Hook for lifecycle-related behavior is **`useEffect`**.
* Hooks allow you to **“hook into” React features** such as:

  * State
  * Side effects
* Hooks **replace traditional class-based lifecycle methods**, such as:

  * `componentDidMount`
  * `componentDidUpdate`
  * `componentWillUnmount`

---

## Component Lifecycle Phases (Still the Same)

Even with functional components, the lifecycle still consists of **three main phases**:

1. **Mounting**
2. **Updating**
3. **Unmounting**

---

## The `useEffect` Hook

### 🔹 Purpose

* `useEffect` is the **primary tool** for handling **side effects** in functional components.
* These side effects map directly to the **lifecycle phases**.

### 🔹 Arguments

`useEffect` takes **two arguments**:

1. A **function** containing the effect logic
2. An **optional dependency array**

---

## Lifecycle Phases with `useEffect`

---

### 1️⃣ Mounting (Component Appears on Screen)

* The effect runs **after the first render**.

```javascript
useEffect(() => {
  // Code to run once after initial render
  // (e.g., data fetching, setting up subscriptions)
}, []); // Empty dependency array means it runs only once
```

---

### 2️⃣ Updating (Component Re-renders)

* Happens when:

  * State changes
  * Props change
* Behavior:

  * By default, the effect runs **after every re-render**
  * With dependencies, it runs **only when specified values change**

```javascript
useEffect(() => {
  // Code to run after render, including updates
}, [propName, stateVariable]); // Runs only if values in the array change
```

---

### 3️⃣ Unmounting (Component Removed from the DOM)

* The effect function can **return a cleanup function**.
* This cleanup runs:

  * Just before the component unmounts
  * Also before the effect runs again due to updates

```javascript
useEffect(() => {
  // Setup code (e.g., add event listener, open subscription)
  return () => {
    // Cleanup code (e.g., remove event listener, close subscription)
  };
}, []);
```

---

## Other Relevant Hooks

While `useEffect` covers the main lifecycle events, **other hooks** also interact with a component’s existence and performance.

---

### 🔹 `useState`

* Manages **local component state**
* When state changes:

  * The component **re-renders**

---

### 🔹 `useLayoutEffect`

* A version of `useEffect` that:

  * Runs **synchronously**
  * Runs **after all DOM mutations**
  * Runs **before the browser paints the screen**
* Useful for:

  * Measuring DOM nodes
* Less common than `useEffect`

---

### 🔹 `useCallback` and `useMemo`

* **Performance optimization hooks**
* Used to:

  * Prevent unnecessary re-renders
  * Prevent unnecessary recalculations
* Similar in purpose to:

  * `shouldComponentUpdate` in class components

---

### 🔹 `useRef`

* Used to store **mutable values** that:

  * Persist across renders
  * Do **not** cause a re-render
* Often used for:

  * Direct DOM access

---

### ✅ Final Summary

* Functional components manage lifecycle using **Hooks**
* `useEffect` replaces class-based lifecycle methods
* Lifecycle phases remain:

  * Mounting
  * Updating
  * Unmounting
* Additional hooks help manage:

  * State
  * Performance
  * DOM access



---


</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>
</br>

---


# Example Usage from `01-File-Upload.md` file



Perfect question — this is one of the most important **React fundamentals**, and once it clicks, a lot of React suddenly feels “clean”.

I’ll explain this **from zero**, no assumptions.

---

## 0️⃣ What `useEffect` *is*, conceptually

`useEffect` lets you say:

> “After React finishes rendering, run this code.
> And when something changes or the component goes away, clean up after yourself.”

It has **two phases**:

1. **Effect phase** → run your logic
2. **Cleanup phase** → undo that logic *before the next effect* or *on unmount*

---

## 1️⃣ Your code (rewritten plainly)

```ts
useEffect(() => {
  if (!files) return;
  if (!files.length) return;

  const url = URL.createObjectURL(files[0]);
  setPreviewUrl(url);

  return () => {
    URL.revokeObjectURL(url);
  };
}, [files]);
```

Let’s break this line by line.

---

## 2️⃣ When does this effect run?

Because of this part:

```ts
}, [files]);
```

React runs this effect:

* ✅ **After the component mounts**
* ✅ **Every time `files` changes**
* ❌ NOT on every render

So timeline-wise:

```
Render → Effect runs
files changes → Render → Effect runs again
Component unmounts → Cleanup runs
```

---

## 3️⃣ What happens when the effect runs?

### Step 1: Guard clauses

```ts
if (!files) return;
if (!files.length) return;
```

This means:

* If no files exist → do nothing
* If the array is empty → do nothing

⚠️ **Important**
Returning early **does NOT register a cleanup**.
Cleanup only exists if you return a function.

---

### Step 2: Create a blob URL

```ts
const url = URL.createObjectURL(files[0]);
```

This:

* Takes a `File` object (binary data)
* Creates a **temporary browser-only URL**
* Example:

  ```
  blob:http://localhost:3000/8a1c...
  ```

This URL:

* Lives in **browser memory**
* Is NOT garbage-collected automatically
* MUST be manually released ❗

---

### Step 3: Save it to state

```ts
setPreviewUrl(url);
```

This causes:

* A re-render
* Your `<img src={previewUrl} />` to work

---

## 4️⃣ What is the cleanup function?

```ts
return () => {
  URL.revokeObjectURL(url);
};
```

This function tells React:

> “Before you run this effect again, or before you destroy this component — run this.”

### Cleanup runs in **two cases**

1. **Before the effect runs again**
2. **When the component unmounts**

---

## 5️⃣ The exact lifecycle (step-by-step)

Let’s simulate real behavior.

### 🟢 First file selected

```
files = [fileA]

Render
→ useEffect runs
→ createObjectURL(fileA) → urlA
→ setPreviewUrl(urlA)
```

No cleanup yet.

---

### 🔵 User selects a different file

```
files = [fileB]

React does:
1. Run CLEANUP from previous effect
   → revokeObjectURL(urlA)

2. Run EFFECT again
   → createObjectURL(fileB) → urlB
   → setPreviewUrl(urlB)
```

🔥 **This prevents memory leaks**

---

### 🔴 Component unmounts (navigate away)

```
Component removed from DOM

React:
→ run cleanup
→ revokeObjectURL(urlB)
```

Browser memory is now clean.

---

## 6️⃣ Why cleanup is REQUIRED here

If you **don’t** do this:

```ts
URL.revokeObjectURL(url);
```

You get:

* Hidden memory leaks
* Increasing RAM usage
* Browser tab slowing down
* Especially bad with large files

Blob URLs **never auto-expire**.

---

## 7️⃣ Mental model (remember this)

Think of `useEffect` like this:

```ts
useEffect(() => {
  // set something up

  return () => {
    // undo what you set up
  };
}, [dependency]);
```

| Setup          | Cleanup         |
| -------------- | --------------- |
| Event listener | Remove listener |
| Timer          | Clear timer     |
| WebSocket      | Close socket    |
| Object URL     | Revoke URL      |
| Subscription   | Unsubscribe     |

---

## 8️⃣ Why the cleanup captures `url`

This part is subtle but important:

```ts
const url = ...
return () => {
  URL.revokeObjectURL(url);
};
```

JavaScript **closures** mean:

* Each effect run has its **own `url`**
* Cleanup revokes the *correct* one
* No race conditions

---

## 9️⃣ Common beginner mistake 🚨

❌ This is WRONG:

```ts
useEffect(() => {
  const url = URL.createObjectURL(files[0]);
  setPreviewUrl(url);

  URL.revokeObjectURL(url); // ❌ revokes immediately
}, [files]);
```

You revoke the URL **before React even uses it**.

---

## 10️⃣ One-sentence summary

> `useEffect` cleanup is React’s way of letting you undo side effects *before the next run or when the component disappears*, and here it prevents blob URLs from leaking memory.

---

If you want next:

* I can explain **why returning nothing vs returning a function matters**
* Or draw a **timeline diagram**
* Or compare this to `componentDidMount / componentWillUnmount`

Just tell me 👍
