// Global in-memory MRU stack
let mruStack = [];
// Flag to differentiate a user manually clicking a tab vs our extension switching tabs
let isSwitching = false;

// Attempt to load the state from storage or build a fresh one
async function loadStack() {
  const data = await chrome.storage.session.get('mruStack');
  
  if (data.mruStack && Array.isArray(data.mruStack) && data.mruStack.length > 0) {
    mruStack = data.mruStack;
    // Validate that tabs still exist
    const tabs = await chrome.tabs.query({});
    const validIds = new Set(tabs.map(t => t.id));
    mruStack = mruStack.filter(id => validIds.has(id));
    
    // Append any untracked tabs
    for (const tab of tabs) {
      if (!mruStack.includes(tab.id)) {
        if (tab.active) {
          mruStack.unshift(tab.id); // Put the active one first
        } else {
          mruStack.push(tab.id); // Put others at the bottom
        }
      }
    }
    await saveStack();
  } else {
    // If there is no stored session, initialize
    const tabs = await chrome.tabs.query({});
    const activeTabs = tabs.filter(t => t.active).map(t => t.id);
    const inactiveTabs = tabs.filter(t => !t.active).map(t => t.id);
    mruStack = [...activeTabs, ...inactiveTabs];
    await saveStack();
  }
}

// Persist the state across service worker restarts
async function saveStack() {
  await chrome.storage.session.set({ mruStack });
}

// Helper to move a tab ID to the front of the tracking stack
function moveToFront(tabId) {
  const index = mruStack.indexOf(tabId);
  if (index > -1) {
    mruStack.splice(index, 1);
  }
  mruStack.unshift(tabId);
}

// When the user changes tabs manually, update the MRU
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  if (isSwitching) return; // Prevent updating when the extension is switching
  
  await loadStack();
  moveToFront(activeInfo.tabId);
  await saveStack();
});

// When a tab is closed, remove it from the MRU stack
chrome.tabs.onRemoved.addListener(async (tabId) => {
  await loadStack();
  const index = mruStack.indexOf(tabId);
  if (index > -1) {
    mruStack.splice(index, 1);
    await saveStack();
  }
});

// Execute the final switch to window/tab
async function executeSwitch(tabId) {
  isSwitching = true;
  try {
    const tab = await chrome.tabs.get(tabId);
    if (tab) {
      if (tab.windowId) {
        await chrome.windows.update(tab.windowId, { focused: true });
      }
      await chrome.tabs.update(tabId, { active: true });
      await saveStack();
    }
  } catch (e) {
    console.error("Failed to switch tab:", e);
    // Prune the bad tab id
    const index = mruStack.indexOf(tabId);
    if (index > -1) {
      mruStack.splice(index, 1);
      await saveStack();
    }
  } finally {
    // Allow enough time for onActivated event to fire before re-enabling manual tracking
    setTimeout(() => {
      isSwitching = false;
    }, 150);
  }
}

// Process keyboard shortcut commands
chrome.commands.onCommand.addListener(async (command) => {
  await loadStack();
  if (mruStack.length < 2) return; // Need at least two tabs to switch

  if (command === "quick-switch") {
    // Switch between the topmost two tabs in the MRU
    const targetTabId = mruStack[1];
    moveToFront(targetTabId);
    await executeSwitch(targetTabId);
    
  } else if (command === "sequential-switch") {
    // Cycle forward: Top tab becomes the bottom tab. Switch to new top tab.
    const currentTabId = mruStack.shift();
    mruStack.push(currentTabId);
    const targetTabId = mruStack[0];
    await executeSwitch(targetTabId);
    
  } else if (command === "reverse-switch") {
    // Cycle back: Bottom tab becomes the top tab. Switch to it.
    const lastTabId = mruStack.pop();
    mruStack.unshift(lastTabId);
    const targetTabId = mruStack[0];
    await executeSwitch(targetTabId);
  }
});

// Initialize on execution
chrome.runtime.onStartup.addListener(loadStack);
chrome.runtime.onInstalled.addListener(loadStack);
loadStack();
