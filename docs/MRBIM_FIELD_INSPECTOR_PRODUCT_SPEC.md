# MrBIM Field Inspector — Product Specification

## Product vision

MrBIM Field Inspector is a mobile-first BIM inspection application for engineers,
BIM coordinators, contractors, and site supervisors. It turns optimized IFC/GLB
models into a practical field workspace for reviewing elements, recording issues,
attaching evidence, and exporting professional reports.

The product is derived from Pascal Editor under the MIT License. Pascal copyright
and license notices must remain in all substantial copies. MrBIM branding and
product-specific functionality are independent additions.

## Primary user

A technical professional who needs to inspect a building or infrastructure model
from a phone or tablet without opening Revit or Navisworks.

## MVP scope

### 1. Project workspace

- Project list optimized for mobile screens.
- Project name, client, location, revision, and last synchronization date.
- Local-first project access.
- Clear offline/online status.

### 2. Model viewer

- Load an optimized GLB model and its property dataset.
- Touch orbit, pan, zoom, and first-person navigation.
- Select elements and inspect properties.
- Isolate, hide, and restore elements.
- Filter by level, category, and discipline.
- Distance and area measurements.

### 3. Field issues

Each issue contains:

- Unique identifier.
- Title and technical description.
- 3D pin and saved camera viewpoint.
- Linked model element and IFC GlobalId when available.
- Discipline.
- Priority: low, medium, high, critical.
- Status: open, under review, resolved, closed.
- Responsible party.
- Creation and target dates.
- Photographic evidence.
- Author and change history.

### 4. Reporting

- Issue list with filters.
- Model screenshot for each issue.
- Export to PDF and XLSX/CSV.
- Project summary by status, discipline, and priority.
- Traceable model revision in every report.

## Explicit exclusions from the MVP

- Full BIM authoring.
- Editing Revit-native files.
- Real-time multi-user collaboration.
- Automatic clash detection.
- Complete BCF exchange.
- Heavy IFC conversion on low-memory phones.
- Subscription billing.
- Augmented reality.

These may be considered after field validation.

## Mobile architecture

1. IFC conversion runs on a workstation or server.
2. The mobile client receives an optimized GLB plus indexed properties.
3. The viewer runs as a Progressive Web App.
4. Issues and attachments are stored locally first.
5. Synchronization is added after the offline workflow is stable.
6. The validated PWA is packaged with Capacitor for Android.

## Technical foundation

- Next.js / React / TypeScript.
- React Three Fiber and Three.js/WebGPU.
- Zustand for application state.
- IndexedDB for local projects and offline issues.
- Existing Pascal viewer, node, measurement, IFC, and export packages.
- Capacitor for the future Android shell.

## Performance targets

- Interactive phone controls without desktop-only hover dependencies.
- Initial MVP tested with optimized GLB files below 50 MB.
- Large models divided by discipline or level when necessary.
- Progressive asset loading and explicit memory cleanup.
- No confidential model upload without project authorization.

## Definition of MVP success

The MVP succeeds when a user can:

1. Install the PWA on an Android phone.
2. Open an approved demonstration model.
3. Select an element and read its properties.
4. Create a geo-referenced 3D issue.
5. Attach a site photograph.
6. Close and reopen the app without losing the issue.
7. Export a professional issue report.

## Commercial validation

The first commercial offer is not a generic app subscription. It is a BIM model
inspection service delivered with a private MrBIM project workspace. Subscription
pricing will only be designed after at least three real pilot projects.
