C. Information & Feedback Displays
These components are crucial for communication between the system and the user. They present information, convey status updates, and provide feedback on user actions or system events.

1.  **Alerts (Notification Banner, System Message):** Non-intrusive notifications for brief, important messages, often indicating success, warning, error, or general information. Typically styled as a colored bar or box (e.g., green for success, red for error) with an icon and text, and may be dismissible.

2.  **Toasts / Snackbars (Growl Notification):** Small, temporary messages that appear briefly (usually at the bottom or top of the screen) to provide quick feedback that doesn't require user interaction and auto-dismisses. Often used for action confirmations like "Item saved."

3.  **Modals / Dialogs (Dialog Box, Popup Window - use with caution):** Overlay windows that demand user interaction before returning to the main content flow. Used for critical information, decisions, or focused tasks (e.g., confirmation prompts, short forms). The background is typically dimmed to emphasize the modal.

4.  **Popovers (Pop-up - ambiguous, Flyout):** Transient, contextual views triggered by user interaction with a specific element. They provide related information or options without the disruption of a modal and are often dismissed by clicking outside.

5.  **Tooltips (Hint, Infotip):** Small, non-interactive text boxes that appear on hover or focus over a UI element, providing brief labels, descriptions, or clarifications for that element.

6.  **Progress Indicators (Loading Bar, Loading Spinner, Activity Indicator, Preloader):** Visual cues indicating that a process is ongoing, managing user expectations during waits.
    * **Progress Bar:** A horizontal bar that fills to show percentage completion (determinate) or animates to show activity (indeterminate).
    * **Spinner/Loader:** An animated rotating or pulsating graphic indicating an indeterminate wait time.
    * **Skeleton Screen:** A placeholder UI that mimics the structure and layout of the content being loaded, improving perceived performance.

7.  **Badges / Chips (Tag, Label):** Small elements displaying status, attributes, counts, or short pieces of information. Badges are typically for display (e.g., notification counts, "New" label), while Chips can be interactive (e.g., for filter selections, removable tags).

8.  **Banners (Site Alert, Announcement Bar):** Prominent, often persistent informational or promotional messages, typically displayed at the top of a page. More persistent and prominent than alerts or toasts (e.g., site-wide announcements, cookie consent).

9.  **Toolbars (Action Bar, Control Bar):** Collections of buttons, icons, or controls grouped together, providing quick access to actions relevant to the current context or view (e.g., text editor formatting tools, table actions).
