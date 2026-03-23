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
