CHAPTER VIII
Dashboard / Wireframe


The dashboard is the operational surface of the TradeChem Order Management System. Every status transition defined in Chapter IV, every permission boundary established in Chapter V, and every notification event specified in Chapter VII must be made visible and actionable through the user interface. A well-structured dashboard does not merely display data; it presents the right information to the right role at the right moment and surfaces the precise action the system expects from that role. This chapter presents the UI design for three interfaces that together cover the full operational scope of the TradeChem OMS: the Order Detail Page, the Order Tracking Dashboard, and the Agent Monitoring Interface (labeled Order Monitoring Interface in the platform).

Each screen is designed with role-awareness at its core. The interface a user sees must reflect only the fields, documents, and actions that their role is permitted to access. A buyer should not have access to document upload controls that belong to the supplier. A logistics partner should not be able to modify commercial terms. An agent must have visibility across all parties while also carrying clear accountability for escalation and coordination actions. The designs enforce these boundaries visually and functionally, derived directly from the Role Permission Matrix in Chapter V.

The three interfaces are presented in sequence, from the most granular view of a single order to the broadest portfolio-level view across all active orders. This mirrors the natural workflow of the OMS: a buyer opens a specific order to check status; a logistics coordinator checks shipment position and delay flags; an agent opens the monitoring interface to manage all active exceptions simultaneously.


8.1 Order Detail Page

The Order Detail Page is the primary interface for any stakeholder who needs to understand or act on a specific order. It is accessed by navigating to a unique Order ID, which is generated at the moment of RFQ conversion as defined in Chapter III. Every field displayed on this page maps directly to a data element established in the order creation process or updated through a subsequent workflow event.

8.1.1 Purpose and Layout

The Order Detail Page serves as the single source of truth for a given order. All parties, including buyer, supplier, agent, and logistics partner, view the same underlying data, but each role sees a different set of available actions. This role-conditional action panel is the primary mechanism through which the permission matrix from Chapter V is enforced at the interface level.

The page is organized into a two-column layout. The main column on the left spans two-thirds of the width and contains the Order Timeline, Order Summary, Parties, Document Checklist, and Activity Log. The right sidebar contains the Actions panel (which changes based on the logged-in role), the Shipment summary, the Commercial Terms summary, and the Payment Status tracker. A page header at the top displays the Order ID, a breadcrumb trail, a document alert banner, and the current status badge.

8.1.2 Role Switcher Banner

A dark green banner runs across the top of the page, above the header, labeled "OMS Mockup / Viewing as:" followed by three buttons: Buyer, Supplier, and Agent. Clicking a button switches the active role, which updates the Actions panel in the right sidebar and the document upload controls in the Document Checklist. The currently active role is indicated by a white filled button against the green background. This switcher is present only in the mockup for demonstration; in the production system, the role is determined by the authenticated user session.

8.1.3 Order Header

The page header displays the Order ID (for example, TC-ORD-2026-04817), the linked RFQ reference number (TC-RFQ-2026-03201), and the creation timestamp. On the right side of the header, two elements appear: a red document alert badge showing the count of documents that are missing or pending ("4 documents required" in the sample order), and a blue status badge showing the current order status ("Processing"). Both elements update as the order progresses.

8.1.4 Order Timeline

The Order Timeline is a horizontal sequence of eight circular nodes connected by a line. Each node represents one of the eight statuses defined in the Status Definition Table in Chapter IV: Order Created, Confirmed, Processing, Shipping, In Transit, Customs / Clearance, Delivered, and Completed. Statuses that have been completed are filled in dark green with a white checkmark icon. The currently active status is filled in blue. Future statuses remain unfilled with a grey border. Completed nodes display the date and time at which that status was entered, for example "28 May 09:14" beneath the Order Created node. The connecting line between nodes turns green for the segment between two completed statuses and remains grey for segments that have not yet been reached. This timeline allows any stakeholder to determine the current position of the order in the lifecycle at a glance.

8.1.5 Order Summary

The Order Summary panel displays the locked commercial terms in a two-column grid. The left column shows the product name, HS code, quantity and packaging type, and Incoterms. The right column shows the unit price, total order value (displayed in a larger bold green font to signal its importance), and payment terms. All fields in this panel are read-only for all roles except Platform Admin, reflecting the principle established in Chapter II that commercial terms must be locked once the order is confirmed. The HS code is displayed because it drives the document and compliance requirements sourced from the Compliance Module as described in the Integration Map in Chapter VI.

8.1.6 Parties

The Parties panel displays four cards arranged in a row: Buyer, Supplier, Trade Agent, and Logistics. Each card shows the organization name, the contact person name, and a small tag indicating country or affiliation. The card corresponding to the currently active role is highlighted with a green border and a light green background, giving the logged-in user immediate confirmation of which party they represent. The Logistics card displays the carrier name, vessel name, and the ETA as a tag.

8.1.7 Document Checklist

The Document Checklist is one of the most operationally critical sections of the Order Detail Page. It displays all nine required documents for the sample order, each row color-coded by status. Documents with "Uploaded" status have a green row background. Documents with "Pending" status have an amber row background. Documents with "Missing" status have a red row background. Each row shows the document name, a mandatory indicator (asterisk), the status badge, and when a document has been uploaded, the uploading party and upload date are shown in a smaller line below the document name. A download icon appears on uploaded documents.

For documents that are Pending or Missing, an "Upload" button appears on the right side of the row when the active role is Supplier or Agent. For the Buyer role, no upload button is shown, reflecting the permission rules in Chapter V. The counter above the checklist summarizes how many documents have been uploaded and how many are still outstanding.

The nine documents in the sample order are: Purchase Order (PO), Sales Contract / Proforma Invoice, Certificate of Analysis (COA), Packing List, Bill of Lading (BOL), Material Safety Data Sheet (MSDS), Export License, Customs Declaration Form, and Insurance Certificate. The Insurance Certificate is marked as optional (no asterisk); all others are mandatory. This list reflects the document requirements established in Chapter VI under the Document Management System integration.

8.1.8 Activity Log

The Activity Log records every event associated with the order as a reverse chronological feed. Each entry shows a circular icon on the left (blue for document events, purple for agent actions, grey for system events), the actor name in bold, the timestamp, and a plain language description of the event. The five entries in the sample order are: a supplier uploading the COA, an agent reviewing and approving the Proforma Invoice, a system entry confirming the 30% advance payment from the Finance Module, a buyer confirming terms and uploading the PO, and a system entry recording the original order creation from the RFQ. This log functions as the human-readable audit trail accessible to all roles.

8.1.9 Actions Panel (Role-Specific)

The Actions panel in the right sidebar is labeled "Actions" followed by the active role name in green. Its contents change entirely based on the selected role.

For the Buyer role, the panel shows two buttons: "Raise Dispute" (with a red flag icon) and "Message Agent". A third button, "Confirm Delivery Receipt" (with a green checkmark icon), appears only when the order status is Delivered. This matches the buyer's permitted actions in Chapter V.

For the Supplier role, the panel shows three buttons: "Upload Documents" (primary green button), "Confirm Dispatch", and "Flag Unable to Fulfill" (styled with a red border and red text to signal its severity). This matches the supplier's permitted actions in Chapter V.

For the Agent role, the panel shows four buttons: "Validate Documents" (primary green button), "Assign Logistics Partner", "Escalate Exception" (styled with an amber border), and "Override Status". The presence of Override Status reflects the agent's authority to force status transitions with a full audit trail as specified in Chapter V.

8.1.10 Shipment Sidebar

Below the Actions panel, the Shipment section in the sidebar displays the origin and destination of the order, followed by the carrier name, vessel name, and ETA. A link at the bottom labeled "View Tracking Dashboard" with an external link icon navigates the user to the Order Tracking Dashboard for this order (described in section 8.2).

8.1.11 Commercial Terms Sidebar

The Commercial Terms section shows three fields with icons: Payment terms (with a credit card icon), Delivery Deadline (with a calendar icon), and Incoterms (with a package icon). These fields are the same values shown in the Order Summary and serve as a quick reference without requiring the user to scroll up.

8.1.12 Payment Status Sidebar

The Payment Status section shows two rows corresponding to the two payment milestones defined in the commercial terms. For the sample order with 30% advance and 70% at Bill of Lading, the first row shows "Advance (30%)" for USD 34,920 with a green "Paid" badge. The second row shows "Balance (70%) at BL" for USD 81,480 with an amber "Pending" badge. These statuses are sourced from the Finance Module integration described in Chapter VI.


8.2 Order Tracking Dashboard

The Order Tracking Dashboard provides real-time visibility into the physical movement of a shipment from its origin port to the destination. It is accessible to all stakeholders. This dashboard corresponds to the In Transit and Customs/Clearance stages of the status lifecycle in Chapter IV and to the Logistics Module integration in Chapter VI, which provides real-time tracking updates, estimated delivery dates, and last-mile delivery confirmation.

8.2.1 Purpose and Layout

Once goods are dispatched and a Bill of Lading is issued, the primary concern of all stakeholders shifts from document compliance to physical delivery. The tracking dashboard gives every party a single view of where the shipment is, when it is expected to arrive, and whether any exceptions have been raised. The breadcrumb at the top reads "Orders > TC-ORD-2026-04817 > Shipment Tracking". The page title is "Shipment Tracking". The header also shows a "Last updated" timestamp with a refresh icon, and an "In Transit" status badge in blue.

The page is divided into two main areas. The upper area contains the Delay Alert Banner (when active) and the four KPI cards. Below that, the layout splits into a main column (two-thirds width) containing the Route Progress panel and the Tracking History panel, and a right sidebar containing the Carrier Details, Cargo Details, Ports, and Alerts panels.

8.2.2 Delay Alert Banner

When a delay is active, an amber banner spanning the full width of the page appears directly below the page header. It contains an alert triangle icon, a bold title stating "Active Delay Flag: ETA Revised by 2 Days", and the reason for the delay in smaller text about port congestion at Port Klang, Malaysia causing the vessel to be diverted from its scheduled route. Below the reason, two fields side by side show the Original ETA and the Revised ETA with their respective dates. This banner corresponds to the Delay Detected communication event in Chapter VII section 7.1.6. It remains visible for the duration of the delay so that users who access the dashboard after the initial notification can still see the full context.

8.2.3 KPI Cards

Four summary cards appear in a row below the delay banner. The first card, with a blue background, shows "Current Position" with "Malacca Strait" as the main value and the exact GPS coordinates as a subtitle. The second card, with an amber background, shows "Revised ETA" with the revised arrival date as the main value and "+2d delay" as the subtitle, shown in amber text. The third card, with a green background, shows "Vessel Speed" displaying "12.4 knots" with the heading "SW 218 degrees" as the subtitle. The fourth card, with a purple background, shows "Carrier" displaying "Samudera Shipping" with "MV Pacific Star" as the subtitle. These data points are sourced from the Logistics Module integration in Chapter VI.

8.2.4 Route Progress

The Route Progress panel shows the shipment journey as five nodes connected by a horizontal line. The five nodes from left to right are: Nanjing, CN (departed 3 Jun); South China Sea (5-6 Jun); Malacca Strait (Now, 9 Jun); Singapore Waters (Est. 11-12 Jun); and Tanjung Priok, ID (ETA 30 Jun). Completed nodes (the first two) are filled in dark green with white icons. The active node (Malacca Strait) is filled in blue and pulses to indicate the live position. The remaining nodes are unfilled with grey borders. The horizontal connecting line is split into a green section covering the completed portion (approximately 46 percent of the total length) and a grey section for the remainder. A blue circular icon with a truck symbol and a "NOW" label floats below the connecting line at the current position.

Below the route nodes, a three-column summary shows: "Departed" (6 days ago, 3 Jun 2026), "Est. Remaining" (approximately 21 days, approximately 4,400 nautical miles left), and "ETA" (the revised date, shown in amber with a "+2d revised" note).

8.2.5 Tracking History

The Tracking History panel shows a vertical timeline of eight checkpoint entries. Each entry has a status indicator dot on the left connected by a vertical line to the next entry. Completed entries use a solid green dot with a white checkmark. The active entry uses a solid blue pulsing dot. Exception entries (flagged events) use a solid amber dot. Pending future entries use an unfilled grey circle. A vertical connector line between two completed entries is rendered in a faded green; connectors leading to pending entries are grey.

The eight entries for the sample order are: Order Dispatched (goods loaded at Nanjing Port), Departed Origin Port, Passed Taiwan Strait, Route Deviation Detected (flagged entry with amber background and amber text noting that the vessel was rerouted due to Port Klang congestion and the ETA was revised), Current Position in the Strait of Malacca (active entry), Expected Arrival at Tanjung Priok, Customs Clearance, and Last-mile Delivery to Buyer. Exception entries receive an amber background highlight and display the explanatory note in amber text.

8.2.6 Carrier Details

The Carrier Details sidebar panel shows six rows in a label-value format: Carrier (Samudera Shipping Line), Vessel (MV Pacific Star), IMO Number (IMO 9812345), Voyage (SSQ-026W), Tracking No. (SSLA2026040817), and Bill of Lading (SSLA20260601PK). Below these rows is a text link labeled "Track on Samudera Portal" with an external link icon.

8.2.7 Cargo Details

The Cargo Details sidebar panel shows four rows, each with a colored icon: Container No. (SSLA4408172, green package icon), Temperature (Ambient, blue thermometer icon), Hazard Class (Class 8, Corrosive, red alert triangle icon), and Seal Status (Intact, green checkmark icon). An info icon button in the top-right corner of this panel provides access to additional technical detail.

8.2.8 Ports

The Ports sidebar panel shows two entries. The origin entry (grey circular icon with an anchor) displays "Origin Port", the port name Nanjing China, the port code CNNKG, and a green confirmation line "Departed 2026-06-03 06:40 CST". The destination entry (dark green circular icon with a map pin) displays "Destination Port", Tanjung Priok Jakarta, the port code IDJKT, the original ETA shown in grey with a strikethrough line, and the revised ETA shown in amber.

8.2.9 Alerts

The Alerts sidebar panel shows three alert entries, each with a colored background and icon. The first, in amber, warns that the ETA has been revised and the customs clearance timeline may shift. The second, in blue, notes that the packing list and BOL upload are still pending from the supplier. The third, in green, confirms that the COA has been validated by the agent and cargo integrity is confirmed. These alerts are drawn from the same notification events defined in Chapter VII and provide in-page situational awareness without requiring the user to navigate elsewhere.


8.3 Agent Monitoring Interface

The Agent Monitoring Interface, titled "Order Monitoring Interface" in the platform, is the operational command centre for Trade Agents coordinating active orders. Unlike the Order Detail Page and Order Tracking Dashboard, which focus on a single order, the monitoring interface provides a portfolio-level view across all active orders simultaneously. It is designed for the Agent role as defined in Chapter V, which requires agents to view all orders, manage exceptions, trigger escalations, and coordinate among all parties.

8.3.1 Purpose and Layout

At any given time, a Trade Agent may be coordinating between five and twenty active orders, each at a different lifecycle stage and each with its own exception state. Without a consolidated view, agents must navigate individually to each order to assess status, which delays exception detection and response. The monitoring interface surfaces all orders, exception flags, overdue actions, and escalation items in a single screen.

The page uses a dark green header section for the agent control area, followed by a light grey content area containing the four KPI cards, the Escalation Queue panel, the Active Orders section with its tab bar and table, and the three portfolio summary metric cards at the bottom.

8.3.2 Header

The header is rendered in dark green and contains two areas. On the left: a small "Agent Control Center" label with a shield icon in light green, the page title "Order Monitoring Interface" in bold white, and a subtitle "Real-time visibility across all active TradeChem orders" in lighter green. On the right: a red pulsing badge showing the count of critical orders (labeled "2 Critical" for the sample data), a white pill showing the agent identity "Marcus Tan, Agent" with a user icon, and a refresh button.

8.3.3 KPI Cards

Four cards are arranged in a row below the header. Each card has a colored left border to distinguish its category. The first card (blue left border) shows "Active Orders" with the count of orders not yet in Completed status (7 in the sample data) and the subtitle "currently in progress". The second card (amber left border) shows "Exception Flags" with the total exception count (5) and a breakdown subtitle showing the number of missing document cases and delay cases. The third card (red left border) shows "Overdue Actions" with the count of orders where an action has exceeded its SLA window (3) and the subtitle "require immediate attention". The fourth card (orange left border) shows "Escalation Queue" with the count of open escalation cases (3) and a subtitle showing how many are critical with SLA active.

8.3.4 Escalation Queue

The Escalation Queue is a permanently visible panel below the KPI cards, above the orders table. It always shows all open escalation cases regardless of which tab is selected in the orders table. The panel header shows "Escalation Queue" with a count badge and a "View all" link on the right.

Each escalation entry is separated by a divider line. Critical escalations have a faint red background. Each entry shows: a priority badge (CRITICAL in red or HIGH in amber), the escalation case ID in monospaced font, the linked Order ID in green, the issue title in bold, and below that the raising party, the current handler, and the timestamp in smaller grey text. Below those details, the progress steps are shown as small chip tags in grey. On the right side of each entry, a SLA countdown badge (for example "SLA: 2h 14m") and a "Take Action" button in dark green are displayed.

The three escalation cases in the sample data are: ESC-2026-0031 (Critical, customs declaration rejected due to incorrect HS code, current handler Platform Admin, SLA 2h 14m remaining); ESC-2026-0028 (High, quantity dispute with buyer claiming 2 MT short, handler Agent David, SLA 11h 52m remaining); ESC-2026-0024 (Critical, supplier non-responsive on missing documents, handler Agent Rachel, SLA 5h 38m remaining). These correspond to the escalation protocol defined in Chapter VII section 7.4.

8.3.5 Active Orders Table

The orders table is headed "Active Orders" with a live search bar on the right (placeholder "Search orders...") and a Filter button with a dropdown icon. Directly below the heading is a tab bar with four tabs: All Orders, Exceptions, Overdue, and Escalations, each showing a count badge.

The table has ten columns: P (priority dot), ORDER ID, PRODUCT (with supplier name in smaller grey text below), BUYER, VALUE, STATUS, EXCEPTION, DOCS, SLA, and a column of action icons. Priority dots are color-coded: red for Critical, amber for High, yellow for Medium, and green for Normal. Critical rows have a faint red background. Overdue non-critical rows have a faint amber background.

The STATUS column displays color-coded badge pills: grey for Order Created, blue for Confirmed, indigo for Processing, sky blue for Shipping, cyan for In Transit, purple for Customs/Clearance, teal for Delivered, and green for Completed.

The EXCEPTION column shows badge pills with icons: amber "Delay" with a clock icon, red "Missing Docs" with a document icon, pink "Dispute" with a flag icon, and orange "Escalated" with an arrow icon. For overdue orders, a red "OVERDUE" label with a clock icon appears below the exception badge.

The DOCS column shows either a red "X missing" label with the count for orders with outstanding documents, or a green "Complete" label with a checkmark for orders where all documents are uploaded.

The SLA column shows the hours remaining before the SLA expires. Values at or below 6 hours are shown in red. Values between 6 and 24 hours are shown in amber. Values above 24 hours are shown in grey.

The action column contains three icon buttons per row: an eye icon (view the Order Detail Page), a flag icon (mark or update an exception), and a three-dot menu icon for additional actions.

The eight orders in the sample data span statuses from Order Created through to Delivered and cover exception types including delay, missing documents, dispute, and escalated, as well as two orders with no exceptions.

8.3.6 Tab Behavior

The All Orders tab shows all active orders. The Exceptions tab filters to orders with any exception flag. The Overdue tab filters to orders where an action has exceeded its SLA window and additionally shows an "Overdue Action Details" panel below the filtered table, listing each overdue action in plain language (for example, "Packing list overdue by 2 days. Supplier has not responded.") with a red background and alert triangle icon. The Escalations tab replaces the table with an expanded card view of each escalation case, showing the priority badge, escalation ID, Order ID, issue title, raising party, current handler, timestamp, numbered progress steps, a "Resolve" button in dark green, and a "Contact" button with a border style.

8.3.7 Table Footer

The bottom of the orders table shows a grey footer bar with two pieces of information: the count of displayed rows out of the total active orders on the left, and the last refreshed timestamp on the right ("Last refreshed: 2026-06-09 11:22 SGT").

8.3.8 Portfolio Summary Metrics

Three cards at the bottom of the page display aggregate metrics for the agent's active portfolio. The first shows "Total Order Value (Active)" with USD 1,058,950 using a bar chart icon in dark green. The second shows "Avg. Days to Resolution (Last 30d)" with 6.4 days using a clock icon in blue. The third shows "SLA Compliance Rate (Jun 2026)" with 87.2 percent using a checkmark icon in green. These metrics serve as a continuous performance indicator visible at the bottom of every session on the monitoring interface.


8.4 Design Consistency and System Integration

All three interfaces share a consistent visual language across color, typography, spacing, and interaction patterns. Green indicates confirmed or completed states. Amber indicates warnings, pending items, or delays. Red indicates critical flags, missing items, or overdue actions. Blue indicates active or in-progress states. This color system is applied consistently across status badges, KPI card borders, checkpoint dots, document row backgrounds, priority dots, and escalation highlights, so that any stakeholder moving between screens does not need to relearn the visual grammar.

Each interface is directly connected to the backend data flows defined in the Integration Map in Chapter VI. The Order Detail Page draws from the Document Management System, Finance Module, and Logistics Module. The Order Tracking Dashboard draws exclusively from the Logistics Module. The Agent Monitoring Interface aggregates data from all connected systems simultaneously. No interface relies on static or cached data; all fields reflect the current state of the order.

The three designs together operationalize the full body of work in this report. The Order Timeline on the Order Detail Page makes the Status Definition Table from Chapter IV visible to every stakeholder. The role-specific action panel enforces the Role Permission Matrix from Chapter V. The Document Checklist connects to the Document Management System integration in Chapter VI. The Delay Alert Banner surfaces the communication event defined in Chapter VII. The Escalation Queue on the monitoring interface anticipates the exception scenarios to be defined in Chapter IX. Every visible element has a defined source in a preceding chapter, and every interactive control corresponds to a permission rule already established in this guideline.
