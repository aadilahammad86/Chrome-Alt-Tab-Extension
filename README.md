# 🚀 Chrome Alt Tab: MRU Switcher

Navigate your Chrome tabs blazingly fast using **Most Recently Used (MRU)** order—just like `Alt+Tab` on Windows or `Cmd+Tab` on Mac! 

This extension is completely **free and open-source**. Instead of charging users on the Chrome Web Store, we decided to host the code here publicly. Anyone can audit the privacy, read the code, and use it freely forever.

---

## 📖 User Walkthrough: How to Install

Since this extension is open-source and not hosted on the conventional Chrome Web Store, you will install it directly from your computer (called "sideloading"). **It takes less than 2 minutes!**

### Step 1: Download the Code
1. Click the green **"<> Code"** button near the top right of this repository page.
2. Select **"Download ZIP"**.
3. Extract (unzip) the downloaded file to a permanent folder on your computer (for example, `Documents/MRU-Tab-Switcher`).

### Step 2: Open Chrome's Extension Settings
1. Open Google Chrome.
2. Type `chrome://extensions/` into your URL bar and press **Enter**.
*(Alternatively: Click the puzzle piece icon 🧩 in the top right of Chrome -> Click "Manage Extensions").*

<p align="center">
  <a href="javascript:void(0)" onclick="window.open('chrome://extensions')" style="display:inline-flex;align-items:center;gap:10px;background:#1a1a1a;color:#ffffff;font-weight:700;font-size:15px;padding:12px 24px;border-radius:10px;text-decoration:none;border:1px solid #444;">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" fill="#fff"/><path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 3a3 3 0 0 1 2.6 1.5H12a4.5 4.5 0 0 0-4.5 4.5H5.1A7 7 0 0 1 12 5zm-7 7a7 7 0 0 1 .1-1h2.4A4.5 4.5 0 0 0 12 16.5v2.4A7 7 0 0 1 5 12zm7 7a7 7 0 0 1-1.9-.3l1.2-2.1a4.5 4.5 0 0 0 5.2-2.1h2.4A7 7 0 0 1 12 19zm4.5-6a4.5 4.5 0 0 0-1.9-3.7l1.2-2.1A7 7 0 0 1 19 12h-2.5z" fill="#4285F4"/></svg>
    Open chrome://extensions
  </a>
</p>

> **📋 Can't click the button?** Manually copy and paste this into your Chrome address bar:
> ```
> chrome://extensions
> ```

### Step 3: Enable Developer Mode

<div style="background:#fff8e1;border-left:5px solid #f59e0b;border-radius:8px;padding:14px 18px;margin:12px 0;font-size:15px;">
  👉 Once on the Extensions page, flip the <strong>Developer Mode</strong> toggle in the <strong>top-right corner</strong> to enable it. The toggle will turn <strong style="color:#1a73e8;">blue</strong> when it's on.
</div>

1. Look at the top right corner of the Extensions page.
2. You will see a toggle switch labeled **Developer mode**. 
3. Click it so it turns **ON** (the switch will turn blue).

### Step 4: Load the Extension
1. Once Developer mode is on, a **"Load unpacked"** button will appear in the top left. Click it!
2. A file browser window will open. Select the folder where you extracted the ZIP file earlier. *(Make sure you select the exact folder that contains the `manifest.json` file).*
3. **Done!** 🎉 The extension is now active. You will see "MRU Tab Switcher" in your extensions list.

---

## ⌨️ How to Use (Keyboard Shortcuts)

By default, the following keyboard shortcuts are active immediately. *(Note: Mac users use the same keys natively!)*

* 🔄 **`Alt + W` — Quick Switch (Toggle)** 
  Jump back and forth between your **two** most recently used tabs. This is perfect for when you are referencing two documents at once and need to constantly flip between them.
* ⏭️ **`Alt + S` — Sequential Switch** 
  Cycle forward through your entire tab history.
* ⏮️ **`Alt + Shift + S` — Reverse Switch** 
  Cycle backward through your tab history.

### Want to change the shortcuts? 
No problem at all! Chrome lets you remap them globally.
1. Go to `chrome://extensions/shortcuts` in your browser.
2. Scroll down to **"MRU Tab Switcher"**.
3. Click the pencil icon next to any command and record your preferred shortcut!

---

## 🌐 GitHub Pages Website
This repository is configured to easily host a free landing page via GitHub Pages. By enabling GitHub pages in your repo settings, this exact README will automatically render as a beautiful, professional website!

---

## 💻 For Developers & Contributors

Want to understand how this works under the hood, verify its privacy, or contribute new features? 

Check out our completely transparent **[Developer Guide (DEVELOPER.md)](DEVELOPER.md)** for a detailed walkthrough of the Manifest V3 architecture, zero-permission policy, and session storage logic.