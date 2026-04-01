# 🚀 Chrome Alt-Tab: MRU Switcher

A powerful, privacy-first Chrome extension that brings the native **Most Recently Used (MRU)** tab switching experience (likened to Windows `Alt+Tab` or macOS `Cmd+Tab`) to your browser.

## 📖 Table of Contents
- [Features](#-features)
- [Installation](#-installation-developer-mode)
- [Usage (Keyboard Shortcuts)](#-usage-keyboard-shortcuts)
- [Customization](#-customization)
  - [How to Update Extension Icon](#how-to-update-extension-icon)
- [Troubleshooting](#-troubleshooting)
  - [Environment PATH Reloading](#environment-path-reloading)
- [Privacy & Security](#-privacy--security)
- [Architecture & Development](#-architecture--development)
- [License](#-license)

---

## ✨ Features
- **MRU Switching**: Cycle through tabs based on their last active time rather than their linear order in the tab bar.
- **Service Worker Context**: Built using Manifest V3 for maximum performance and security.
- **Zero-Latency Persistence**: Maintains history state even when the background process is suspended by the browser.
- **Privacy Core**: No tracking, no data collection, and minimal permission requirements.

## 📥 Installation (Developer Mode)

Since this extension is optimized for direct control and privacy, we recommend "sideloading" it using the "Load Unpacked" feature:

1. **Download the source**: Clone this repository or download the ZIP file and extract it.
2. **Open Extensions**: Enter `chrome://extensions/` in your browser.
3. **Enable Developer Mode**: Flip the toggle in the top-right corner.
4. **Load**: Click **Load unpacked** and select the folder containing `manifest.json`.

## ⌨️ Usage (Keyboard Shortcuts)

| Shortcut | Command | Action |
| :--- | :--- | :--- |
| `Alt + W` | **Quick Switch** | Toggle between your 2 most recent tabs instantly. |
| `Alt + S` | **Sequential Switch** | Cycle forward through your tab history. |
| `Alt + Shift + S` | **Reverse Switch** | Cycle backward through your tab history. |

> [!TIP]
> You can remap these keys globally at `chrome://extensions/shortcuts`.

## 🎨 Customization

### How to Update Extension Icon

To brand or update the visual identity of your extension, follow these standard steps:

1. **Image Preparation**: Create a new icon image. Recommended dimensions are **128x128 pixels**.
2. **Replacement**: Save your new icon as `icon.png` in the project root directory, overwriting the existing file.
3. **Manifest Configuration**: Ensure that `manifest.json` correctly points to your file. By default, it is configured as follows:
   ```json
   "icons": {
     "128": "icon.png"
   },
   "action": {
     "default_icon": "icon.png"
   }
   ```
4. **Apply Changes**: Go to `chrome://extensions/` and click the **Reload** icon on the extension card to refresh the assets.

## 🔧 Troubleshooting

### Environment PATH Reloading

If you are developing for this extension or using related CLI tools and find that updates to your system `PATH` are not reflecting in your current terminal session (PowerShell), run the following command to force a refresh of the environment variables without restarting your shell:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" +
            [System.Environment]::GetEnvironmentVariable("Path", "User")
```

---

## 🔒 Privacy & Security
This extension follows a **Zero Host Permission** policy. We ONLY request access to:
- `tabs`: To allow switching between IDs.
- `storage`: Only for `chrome.storage.session` to maintain state across worker restarts.

We cannot read page content, track your browsing history, or exfiltrate any data.

## 💻 Architecture & Development
For a deep dive into the technical implementation, state reconciliation logic, and Manifest V3 specifics, please refer to our **[Developer Walkthrough (DEVELOPER.md)](DEVELOPER.md)**.

## 📜 License
Distributed under the **MIT License**. See `LICENSE` for more information.
