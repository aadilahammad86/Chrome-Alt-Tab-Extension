# 🛠️ Developer Walkthrough & Architecture

Welcome, builders! This document breaks down exactly how the MRU Tab Switcher operates under the hood so you can reliably audit its security and confidently contribute to the code.

## 🏗️ Architecture Overview

The extension is entirely headless, operating via a **Manifest V3 Background Service Worker**. There are no heavy popup HTML files, inject scripts, or option pages to bog down browser performance.

1. **`manifest.json`**: Explicitly maps our 3 shortcut commands and binds the worker.
2. **`background.js`**: The brains of the operation where our logic lives.
3. **`icon.png`**: The primary extension icon (128x128 pixels).

---

## 🔒 Zero Host Permissions (Privacy First)

A core tenet of this extension is **absolute privacy**. The `manifest.json` does NOT request `"<all_urls>"` or `"activeTab"`.

**We only request two native APIs:**
* `"tabs"`: To read tab IDs, window IDs, and set their active state to `true` when switching. We strictly cannot read DOM content or keystrokes on actual web pages.
* `"storage"`: Used exclusively for `chrome.storage.session` to persist MRU state across service worker lifecycles.

---

## 🧠 State Management: The MRU Stack

Chrome does not natively expose a historical "Most Recently Used" array that we can freely manipulate for complex cycling. We must carefully build and maintain our own sequence.

### 1. In-Memory Tracking Array
At the top of `background.js`, we maintain a global array:
```javascript
let mruStack = [];
```
* `mruStack[0]` is the currently active tab.
* `mruStack[1]` is the previous tab.
* `mruStack[n]` represents tabs further back in time.

### 2. Session Storage Persistence
Service workers in Manifest V3 are *ephemeral*—Chrome brutally puts them to sleep when idle to save RAM. If we only stored `mruStack` in standard global memory, our history array would randomly reset to empty multiple times a day.

* **The Fix**: We aggressively back up the stack to `chrome.storage.session`. 
* **Why Session Storage?**: This explicit memory layer persists silently across random service worker restarts, but fundamentally clears itself when the browser executable is completely closed. This behaves perfectly, since Chrome tab internal system IDs dynamically randomly change anyway upon a hard browser restart!

### 3. State Reconciliation on Wakeup
When the service worker wakes up (e.g., via `chrome.runtime.onStartup` or actively triggered by a keyboard command), it calls `loadStack()`. 
* It reads the array back from session storage.
* It verifies all IDs against a live `chrome.tabs.query({})` to deliberately prune any tabs the user might have rapidly closed while the worker was asleep.
* It safely appends any newly opened tabs that the worker missed while dormant.

---

## 🔄 Event Handling & The `isSwitching` Debounce Flag

Maintaining completely accurate history requires actively listening to `chrome.tabs.onActivated`.

### ⚠️ The Infinite Loop Problem 
When a user manually clicks a tab with their mouse, `chrome.tabs.onActivated` fires. We *want* to catch this and move that tab ID to the front of `mruStack`. 

However, when the user presses `Alt + W` and our extension programmatically changes the tab via `chrome.tabs.update()`, `onActivated` *also* simultaneously fires! If we processed that event identically to a manual computer click, we would accidentally instantly scramble the carefully cycled MRU sequence our code *just automatically built*.

### ✅ The Solution
We use a global semaphore flag: `isSwitching`.
```javascript
async function executeSwitch(tabId) {
  isSwitching = true; // 🔒 LOCK manual tracking

  // We focus the parent window first to handle multi-monitor setups effortlessly
  await chrome.windows.update(tab.windowId, { focused: true });
  await chrome.tabs.update(tabId, { active: true }); // Immediately triggers onActivated!

  // 🔓 UNLOCK manual tracking after the event has safely passed
  setTimeout(() => { isSwitching = false; }, 150); 
}
```
Because of this, our `onActivated` listener immediately `return`s out if `isSwitching` is true, elegantly filtering out our own robotic algorithmic switching actions! It's bulletproof.

---

## 🤝 Contributing

We welcome Pull Requests! As a completely open source project, we want users to take full control.
1. Fork the repo here on GitHub.
2. Make your modifications in `background.js` or `manifest.json`.
3. Load it locally in Chrome via **"Load unpacked"** to test.
4. Submit your PR for review!
