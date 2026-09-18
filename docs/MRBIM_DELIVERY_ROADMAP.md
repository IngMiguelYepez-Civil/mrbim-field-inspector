# MrBIM Field Inspector — Delivery Roadmap

## Phase 0 — Repository foundation

- [x] Preserve Pascal MIT license and upstream fork relationship.
- [x] Rename the repository to `mrbim-field-inspector`.
- [x] Create isolated development branch `feature/mrbim-mobile-mvp`.
- [x] Define the mobile MVP and commercial validation rules.
- [ ] Record the upstream version used as the first MrBIM baseline.
- [ ] Establish branch protection and pull-request review workflow.

## Phase 1 — Mobile PWA shell

- [ ] Add MrBIM name, colors, icons, and attribution screen.
- [ ] Add web app manifest and installable PWA metadata.
- [ ] Add service-worker strategy for the shell and approved local assets.
- [ ] Audit the existing mobile layout at common Android viewport sizes.
- [ ] Replace hover-only interactions with touch-accessible controls.
- [ ] Add project list and recent-project home screen.
- [ ] Add offline and synchronization indicators.

### Acceptance test

The app installs from Chrome on Android, launches full-screen, and allows a user
to open a demonstration project without encountering desktop-only navigation.

## Phase 2 — Mobile model review

- [ ] Define the optimized GLB plus properties package.
- [ ] Add mobile model loading and progress feedback.
- [ ] Add element selection and property panel.
- [ ] Add level/category/discipline filters.
- [ ] Validate measurement tools on touch devices.
- [ ] Add isolate, hide, show-all, and saved viewpoints.
- [ ] Add memory safeguards and large-model warnings.

### Acceptance test

A phone can open the demonstration model, select an element, read its properties,
filter the view, and create a reliable measurement.

## Phase 3 — Field issues

- [ ] Define the issue data schema.
- [ ] Add 3D pin placement.
- [ ] Save camera viewpoint and linked model element.
- [ ] Add status, priority, discipline, responsible party, and dates.
- [ ] Capture photographs with explicit user permission.
- [ ] Store issues and evidence locally in IndexedDB.
- [ ] Add issue history and validation rules.

### Acceptance test

An issue and its photograph survive closing and reopening the application and
remain linked to the correct model viewpoint and element.

## Phase 4 — Professional reports

- [ ] Create issue list and filters.
- [ ] Generate model screenshots for report evidence.
- [ ] Export CSV/XLSX.
- [ ] Generate branded PDF report.
- [ ] Include project/model revision and issue traceability.
- [ ] Add dashboard by status, discipline, and priority.

## Phase 5 — Pilot project

- [ ] Select a non-confidential demonstration model.
- [ ] Run one controlled field inspection.
- [ ] Record device model, file size, load time, and failures.
- [ ] Collect user feedback.
- [ ] Fix blocking usability and data-loss problems.
- [ ] Decide whether cloud synchronization is justified.

## Phase 6 — Android and Google Play

- [ ] Wrap the validated PWA with Capacitor.
- [ ] Define Android application ID.
- [ ] Generate adaptive launcher icon and splash screen.
- [ ] Configure camera, file, and network permissions minimally.
- [ ] Produce signed Android App Bundle (AAB).
- [ ] Prepare privacy policy and data-safety disclosures.
- [ ] Prepare screenshots, description, support contact, and store listing.
- [ ] Complete closed testing before production release.

## Release rule

Google Play packaging starts only after the PWA passes the field-issue persistence
test. Store publication must not be used as a substitute for product validation.
