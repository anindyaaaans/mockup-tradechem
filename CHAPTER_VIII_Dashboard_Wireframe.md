# CHAPTER VIII
## Dashboard / Wireframe

The dashboard is the operational surface of the TradeChem Order Management System. Every status transition defined in Chapter IV, every permission boundary established in Chapter V, and every notification event specified in Chapter VII must be made visible and actionable through the user interface. A well-structured dashboard does not merely display data; it presents the right information to the right role at the right moment, and surfaces the precise action that the system expects from that role. This chapter presents the UI design for three interfaces that together cover the full operational scope of the TradeChem OMS: the Order Detail Page, the Order Tracking Dashboard, and the Agent Monitoring Interface.

Each screen is designed with role-awareness at its core. The TradeChem OMS serves five distinct roles as defined in Chapter V: Buyer, Supplier, Agent, Logistics Partner, and Platform Admin. The interface a user sees must reflect only the fields, documents, and actions that their role is permitted to access. A buyer should never see a supplier's internal readiness notes. A logistics partner should not be able to modify commercial terms. An agent must have visibility across all parties but must also carry clear accountability for escalation and coordination actions. The designs below enforce these boundaries visually and functionally.

The three interfaces are presented in sequence, from the most granular view (a single order) to the broadest view (all active orders under agent supervision). This mirrors the natural workflow of the OMS: a buyer opens an order to check status; a logistics coordinator checks tracking position and flags; an agent opens the monitoring interface to manage all active exceptions simultaneously.

---

## 8.1 Order Detail Page

The Order Detail Page is the primary interface for any stakeholder who needs to understand or act on a specific order. It is accessed by navigating to a unique Order ID, which is generated at the moment of RFQ conversion as defined in Chapter III. Every field displayed on this page maps directly to a data element established in the order creation process or updated through a subsequent workflow event.

### 8.1.1 Purpose and Design Rationale

The Order Detail Page serves as the single source of truth for a given order. All parties — buyer, supplier, agent, and logistics partner — view the same underlying data, but each role sees a different set of available actions. This role-conditional action panel is the primary mechanism through which the permission matrix defined in Chapter V is enforced at the interface level.

The page is divided into six functional zones: the order header, the status timeline, the order summary panel, the parties panel, the document checklist, and the activity log. A persistent sidebar on the right displays the role-specific action panel, the logistics summary, the commercial terms, and the payment milestone tracker.

### 8.1.2 Role Indicator

Because the OMS is accessed by multiple roles, the page includes a visible role indicator at the top of the screen. In the live system, this indicator is populated automatically from the authenticated user's session. In the mockup, a role switcher allows demonstration of how the interface changes between Buyer, Supplier, and Agent views. This switcher does not appear in the production system; it exists only for review and presentation purposes.

### 8.1.3 Order Header

The order header displays the Order ID (e.g., TC-ORD-2026-04817), the linked RFQ reference (e.g., TC-RFQ-2026-03201), the order creation timestamp, and the current status badge. A document alert is displayed prominently in the header if any required documents are missing or pending, directly reflecting the document validation rules established in Chapter VI under the Document Management System integration. This alert banner is visible to all roles and is not dismissible until the outstanding documents are resolved.

### 8.1.4 Status Timeline

The status timeline renders all eight primary statuses defined in Chapter IV as a horizontal sequence of labeled nodes. Completed statuses are filled in green with a checkmark icon. The active status is highlighted in blue. Future statuses remain unfilled. Each completed node displays the timestamp at which that status was entered, providing a visual audit trail of the order's progression.

The eight statuses displayed are: Order Created, Confirmed, Processing, Shipping, In Transit, Customs/Clearance, Delivered, and Completed. This sequence is derived directly from the Status Definition Table in Chapter IV. The timeline makes it immediately clear to any stakeholder where the order currently stands without requiring them to read a text field or submit a query.

### 8.1.5 Order Summary Panel

The order summary panel displays all locked commercial terms as defined during RFQ conversion. These fields are read-only for all roles except Platform Admin, reflecting the principle established in Chapter II that commercial terms must be locked once the order is confirmed. The fields displayed are: product name, HS code, quantity, packaging type, unit price, total order value, Incoterms, and payment terms.

The inclusion of the HS code is significant. This field drives the compliance check in the Compliance Module integration defined in Chapter VI, which determines the required documentation list for the specific product and destination country. Displaying it on the Order Detail Page ensures that all parties can verify the classification that governs their documentation obligations.

### 8.1.6 Parties Panel

The parties panel displays all four assigned stakeholders: the Buyer, the Supplier, the assigned Trade Agent, and the Logistics Partner. Each party card shows the organization name, the contact person, and the country or role affiliation. The card corresponding to the currently logged-in role is highlighted with a green border, providing immediate orientation for the user.

This panel reflects the stakeholder assignment function defined in Chapter V, where the Agent role is responsible for assigning logistics partners and coordinating among all parties. The logistics partner card, once assigned, displays the carrier name and vessel reference, which links directly to the Order Tracking Dashboard described in section 8.2.

### 8.1.7 Document Checklist

The document checklist is one of the most operationally critical elements of the Order Detail Page. It displays every required document for the specific order, along with the upload status of each: Uploaded, Pending, or Missing. The document list is populated based on the product category and destination country, sourced from the Compliance Module as defined in the Integration Map in Chapter VI.

Each document row displays the document name, whether it is mandatory or conditional, the upload status badge, the uploading party, and the upload date if applicable. For documents that are missing or pending, a visible Upload button appears for users with upload permission — specifically the Supplier and Agent roles as defined in Chapter V. Buyer users see the document list in read-only mode with no upload controls.

The standard document set for a chemical trade order includes: Purchase Order (PO), Sales Contract or Proforma Invoice, Certificate of Analysis (COA), Packing List, Bill of Lading (BOL), Material Safety Data Sheet (MSDS), Export License, Customs Declaration Form, and Insurance Certificate where applicable. This list corresponds directly to the document management requirements defined in Chapter VI under the Document Management System integration.

### 8.1.8 Role-Specific Action Panel

The action panel changes entirely based on the logged-in role, enforcing the permission matrix from Chapter V. The following actions are available per role:

**Buyer:** Confirm Delivery Receipt (active only when status is Delivered), Raise Dispute, Message Agent.

**Supplier:** Upload Documents, Confirm Dispatch (active when goods are ready for handover), Flag Unable to Fulfill (triggers escalation to Agent as defined in Chapter VII section 7.4).

**Agent:** Validate Documents, Assign Logistics Partner, Escalate Exception, Override Status (with full audit trail as required by Chapter V).

This conditional rendering ensures that no role can access actions outside their permitted scope. The Override Status action for the Agent role generates an automatic audit log entry, consistent with the audit requirements specified in the Role Permission Matrix.

### 8.1.9 Payment Milestone Tracker

The payment tracker in the sidebar displays each payment milestone defined in the commercial terms, along with the current payment status sourced from the Finance Module integration specified in Chapter VI. For a typical CIF order with 30% advance and 70% at BL, the tracker shows two rows: the advance milestone marked as Paid once the Finance Module confirms escrow receipt, and the balance milestone marked as Pending until the BOL is uploaded and delivery is confirmed. This direct link between document status and payment release reflects the finance integration data flow defined in Chapter VI.

### 8.1.10 Activity Log

The activity log at the bottom of the page records every event and action associated with the order in reverse chronological order. Each entry includes the acting party, the timestamp, and a plain language description of the event. Log entries are generated automatically by the system for status transitions, document uploads, and notification events, and may also be generated manually by agents recording coordination actions. The activity log functions as the human-readable audit trail that complements the system-level audit log maintained by the Platform Admin.

---

## 8.2 Order Tracking Dashboard

The Order Tracking Dashboard provides real-time visibility into the physical movement of a shipment from its origin port to the destination. It is accessible to all stakeholders but is most actively used by the Buyer, Agent, and Logistics Partner. This dashboard corresponds directly to the In Transit and Customs/Clearance stages of the status lifecycle defined in Chapter IV, and to the Logistics Module integration defined in Chapter VI, which provides real-time tracking data, estimated delivery dates, and last-mile delivery confirmation.

### 8.2.1 Purpose and Design Rationale

Once goods are dispatched and a Bill of Lading is issued, the primary concern of all stakeholders shifts from document compliance to physical delivery. The Order Tracking Dashboard gives every party a single view of where the shipment is, when it is expected to arrive, and whether any exceptions have been raised during transit. The dashboard makes passive monitoring automatic, so that agents and buyers do not need to contact the carrier directly to obtain status updates.

### 8.2.2 Delay Alert Banner

The delay alert banner is the highest-priority element on the tracking dashboard. It appears at the top of the page whenever the logistics system detects a deviation from the scheduled route or ETA. The banner displays the reason for the delay, the original ETA, and the revised ETA, and is colour-coded in amber to indicate an active exception that requires stakeholder awareness.

This banner corresponds to the Delay Detected communication event defined in Chapter VII section 7.1.6. When the banner is active, the system has already sent a high-priority notification to the Buyer, Agent, and Logistics Partner via dashboard, email, and WhatsApp Business. The banner serves as the persistent in-platform reference for that notification, ensuring that users who access the dashboard after the initial alert can still see the full context of the delay.

### 8.2.3 Key Performance Indicators

Four KPI cards appear below the delay banner, summarising the most critical real-time data points for a shipment in transit. The cards display: Current Position (last reported coordinates and location name), Revised ETA (with a delta indicator showing the number of days ahead or behind original schedule), Vessel Speed and Heading, and Carrier Name and Vessel.

These data points are sourced from the Logistics Module as defined in the Integration Map in Chapter VI. The Logistics Module provides real-time tracking updates at each checkpoint, which the OMS displays without transformation. The delta indicator on the ETA card is calculated by the OMS by comparing the revised ETA provided by the Logistics Module against the original delivery date locked at order confirmation.

### 8.2.4 Route Progress Visualiser

The route progress visualiser displays the shipment's journey as a sequence of five geographic nodes: origin port, intermediate waypoints, current position, and destination port. Each node is represented by a labelled icon. Completed segments of the route are rendered in green. The current position is represented by a pulsing blue indicator. Remaining segments are rendered in grey.

Below the route visualiser, three summary fields display the number of days since departure, the estimated remaining distance and transit time, and the revised ETA. These fields provide at-a-glance context for stakeholders assessing whether the shipment is on track without needing to read the detailed checkpoint history.

### 8.2.5 Tracking Checkpoint History

The checkpoint history panel displays every recorded event in the shipment's journey as a vertical timeline. Each entry includes the event description, the location, and the timestamp. Completed checkpoints are marked with green filled circles. The active checkpoint is marked with a blue pulsing indicator. Exception events — such as route deviations or customs holds — are marked with amber warning icons and include an explanatory note.

This timeline corresponds to the status update data provided by the Logistics Partner role as defined in Chapter V, which requires logistics partners to update shipment status at each checkpoint and upload tracking proof. The audit value of this timeline is significant: in the event of a dispute over delivery timing or cargo condition, the checkpoint history provides a timestamped record of where the goods were at every stage of their journey.

### 8.2.6 Carrier Details Panel

The carrier details panel in the right sidebar displays all logistical identifiers associated with the shipment: carrier name, vessel name, IMO number, voyage number, tracking number, and Bill of Lading number. These fields are populated from the Logistics Module integration and are read-only for all roles. A direct link to the carrier's external tracking portal is provided for users who require additional detail beyond what the TradeChem OMS displays.

### 8.2.7 Cargo Details Panel

The cargo details panel displays the container number, temperature requirements, hazard classification, and seal status of the cargo. The hazard classification field is sourced from the Compliance Module integration defined in Chapter VI and reflects the Dangerous Goods classification assigned to the product during order creation. For chemical products classified under any of the nine IMDG hazard classes, this field is mandatory and visible to all roles to ensure that all parties handling the cargo are aware of the relevant safety requirements.

### 8.2.8 Active Alerts

A dedicated alerts section in the sidebar aggregates all active system notifications relevant to the current shipment. These include delay flags, pending document alerts sourced from the Document Management System integration, and compliance confirmations. This section ensures that stakeholders using the tracking dashboard have full situational awareness without needing to navigate to a separate notification panel.

---

## 8.3 Agent Monitoring Interface

The Agent Monitoring Interface is the operational command centre for Trade Agents responsible for coordinating active orders within the TradeChem platform. Unlike the Order Detail Page and Order Tracking Dashboard, which are focused on a single order, the monitoring interface provides a portfolio-level view across all active orders simultaneously. This interface is designed specifically for the Agent role as defined in Chapter V, which requires agents to view all orders, manage exceptions, trigger escalations, and coordinate among all parties.

### 8.3.1 Purpose and Design Rationale

At any given time, a Trade Agent may be coordinating between five and twenty active orders simultaneously, each at a different stage of the lifecycle and each with its own exception state. Without a consolidated view, agents must navigate individually to each order to assess status, causing delays in exception detection and response. The monitoring interface solves this by surfacing all orders, exception flags, overdue actions, and escalation items in a single screen.

The design of this interface is directly motivated by the operational requirements of the Agent role: they must see all orders, identify exceptions faster than any individual order view would allow, and take coordinated action across multiple orders from a single screen. Every element of this interface corresponds to a data point, permission rule, or workflow event already defined in Chapters III through VII.

### 8.3.2 Agent Identity Panel and Critical Alert Indicator

The interface header displays the authenticated agent's name and role, confirming their identity and the scope of their permissions. If any orders in their portfolio carry a Critical priority flag — defined as orders with an escalation SLA of six hours or less remaining — a red pulsing alert badge appears in the header with the count of critical items. This ensures that the most time-sensitive exceptions are never hidden below the fold or obscured by routine updates.

### 8.3.3 KPI Summary Cards

Four KPI cards at the top of the monitoring interface provide an immediate portfolio overview. The cards display: Active Orders (total count of orders not in Completed status), Exception Flags (count of orders carrying any exception type, broken down by missing documents and delays), Overdue Actions (count of orders where an action has not been completed within the designated SLA window), and Escalation Queue (count of open escalation cases, with a sub-indicator for critical priority items).

These KPIs are derived directly from the order status data, document checklist data, and SLA timer data maintained by the OMS. They update in real time as the underlying data changes, ensuring that the agent's view of their portfolio is always current.

### 8.3.4 Escalation Queue

The escalation queue is presented as a permanently visible panel below the KPI cards. It displays all open escalation cases in the agent's portfolio, sorted by priority and SLA remaining time. Each escalation entry displays the escalation case ID, the linked Order ID, the issue description, the party who raised the escalation, the current handler, the timestamp of escalation, and a countdown showing the SLA time remaining.

For critical escalations — those with fewer than six hours of SLA remaining — the entry is highlighted in red. For high-priority escalations, the highlight is amber. Each entry includes a Take Action button that navigates directly to the relevant order or opens the escalation resolution workflow, and a Contact button that initiates a message thread with the relevant party.

The escalation queue reflects the escalation protocol defined in Chapter VII section 7.4, which specifies SLA windows ranging from 24 to 72 hours depending on event type, and which designates the Agent as the first escalation recipient for supplier confirmation failures, document upload failures, and delivery confirmation failures.

### 8.3.5 Active Orders Table

The active orders table displays all orders in the agent's portfolio that have not yet reached Completed status. Each row in the table contains: a priority indicator dot (colour-coded by priority level), the Order ID, the product name and supplier, the buyer name, the total order value, the current status badge, the exception flag badge, the document completeness indicator, and the SLA hours remaining.

The priority indicator is derived from the combination of exception type and SLA proximity. Orders with an escalated exception and fewer than six hours of SLA remaining are marked Critical and rendered with a red row background. Orders with overdue actions but no escalation are marked High and rendered with an amber background. All other active orders use standard white background rendering.

Four quick action icons appear at the right of each row: View (navigates to the Order Detail Page), Flag (adds or updates an exception flag for the order), and a context menu providing additional actions including escalation, status override with audit log, and direct messaging to any party.

### 8.3.6 Tab Navigation

The active orders table is filterable through four tabs: All Orders, Exceptions, Overdue, and Escalations. The All Orders tab displays the full active portfolio. The Exceptions tab filters to orders carrying any exception flag. The Overdue tab filters to orders where an action has exceeded its SLA window. The Escalations tab replaces the table with a full-width escalation management view, showing expanded detail for each escalation case including the sequential steps taken and pending, the handler at each step, and resolution controls.

The exception types displayed in the table correspond directly to the four exception scenarios defined in Chapter IX: Delivery Delay, Missing Documents, Dispute, and Escalated. Each exception type is rendered with a distinct colour badge to allow rapid visual differentiation.

### 8.3.7 Overdue Action Detail Panel

When the Overdue tab is active, an additional detail panel appears below the filtered table, listing the specific overdue action for each flagged order in plain language. This narrative description is generated by the system from the combination of the current order status, the pending required action, and the elapsed SLA time. For example, an order in Processing status where the supplier has not uploaded the COA within 48 hours would generate the entry: *Supplier COA and MSDS upload pending since confirmation.* This plain language description reduces cognitive load for the agent by eliminating the need to cross-reference the status definition table during exception handling.

### 8.3.8 Portfolio Summary Metrics

At the bottom of the monitoring interface, three summary metric cards display portfolio-level performance indicators: Total Order Value across all active orders, Average Days to Resolution based on the trailing 30 days, and SLA Compliance Rate for the current month. These metrics are not operational action items but serve as a continuous feedback mechanism for agent performance and platform health. They correspond to the performance data that the Platform Admin role, as defined in Chapter V, is responsible for monitoring and reporting.

---

## 8.4 Design Consistency and System Integration

All three interfaces share a consistent design language and are built on the same component library used throughout the TradeChem platform. Visual hierarchy, colour semantics, and interaction patterns are uniform across all screens: green is used for confirmed or completed states, amber for warnings and pending exceptions, red for critical flags and missing items, and blue for active or in-progress states. This consistency reduces the learning curve for users who access multiple interfaces within the same session and ensures that stakeholders who collaborate across roles — such as an agent and a buyer reviewing the same order — are working from the same visual vocabulary.

Each interface communicates in real time with the OMS backend through the data flows defined in the Integration Map in Chapter VI. The Order Detail Page queries the Document Management System, Finance Module, and Logistics Module. The Order Tracking Dashboard queries the Logistics Module exclusively. The Agent Monitoring Interface aggregates data from all integrated systems simultaneously. No interface displays cached or static data; all fields reflect the current state of the order as stored in the OMS database.

The dashboard designs presented in this chapter operationalise the entire preceding body of work in this report. The status timeline on the Order Detail Page makes Chapter IV visible. The role-specific action panel enforces Chapter V. The document checklist links to Chapter VI. The delay banner surfaces Chapter VII. The escalation queue in the monitoring interface anticipates Chapter IX. Every element has a source, and every interaction has a rule. The interface is not decorative. It is the point at which the system becomes usable.
