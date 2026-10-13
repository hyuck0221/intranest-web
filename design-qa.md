# IntraNest design and realtime verification

Date: 2026-10-02 (Asia/Seoul)

## Delivered behavior

- Navy/cobalt design across the web service, extension popup, and settings.
- Popup links are read-only. Link management uses the administrator page embedded inside the popup.
- Links and files have tabs. The upper-right Chat button opens chat inside the popup.
- File upload/download/delete, administrator actions, and connection settings stay inside the popup.
- Chat display names are configured in Settings → Chat profile, persisted locally, and used for subsequent messages. No name field remains in either chat screen.
- One WebSocket stays open across all views. Link/file mutations and chat propagate to other clients; reconnects reconcile snapshots, failed snapshots retry automatically, and chat snapshots merge incoming messages by ID.
- No refresh controls in the application UI.

## Verification

- Real Go server using isolated temporary data and port 44387, with test HTTP/WebSocket requests mapped from the normal 43187 port. The existing Docker service was not modified.
- Twelve browser integration checks: link add/update/delete across clients, multipart upload/download/delete, internal chat and unread badge, embedded administration, reconnect recovery, failed snapshot retry, and settings-based display names in both clients.
- Twelve checks against the packaged Manifest V3 extension in Chrome: storage, settings-based display names, real chat/WebSocket, file upload/download, internal deletion/cancel dialog, embedded administration/settings, no new browser pages, and packaged assets.
- 75 layout checks: 24 popup view/language/width combinations, 40 web workspace combinations, and 11 settings checks. Korean/English and widths 320–1280px. No horizontal overflow, missing translations, or JavaScript errors in these scenarios.
- Server integration tests cover both WebSocket endpoints, persistence before notifications, invalid mutation/upload suppression, link create/update/delete, chat, file transfer/deletion, settings and retention pruning. `go test -race ./...` and `go vet ./...` pass.
- Web build, extension package, JavaScript syntax, and whitespace checks pass.

## Limits and rollout

Native tests use a fixture for an already-approved host permission; Chrome's actual host permission dialog was not exercised. Large-file transfers were not load tested. Link/file notifications require deploying the matching server changes as well as updating the web app and extension. No deployment or production restart was performed.

## Evidence

Screenshots and JSON reports:
/Users/shimhyuck/.codex/visualizations/2026/10/02/01a0faf6-4201-75d0-bb43-dc5e6a191efa/intranest-redesign/

Current reports: realtime-results.json, native-live-results.json, final-layout-results.json. Screenshots use isolated test data.

## Density refresh verification · 2026-10-13

- Browser: headless installed Google Chrome through Playwright.
- Screens: landing, guide, connect, terms, privacy, connected workspace, extension popup and options.
- Widths: 320, 375, 414, 768px; desktop at 1440px. No horizontal document overflow.
- Guide: installer copy, English/Korean switching, native help disclosure verified.
- Workspace: API fixtures with 18 links; search filters results and all four tabs work.
- Popup: preview mode; links/files/chat switching and removed connection header verified.
- Screenshots inspected for desktop guide/workspace/landing, mobile workspace and popup. Corrected popup wordmark contrast after changing header surface.
- JavaScript checks, web build, workspace synchronization and extension packaging passed.
- Connected workspace uses mocked API responses; no production intranet server was contacted. Chrome extension permissions and actual installation are outside this visual check.

## File workflow verification · 2026-10-13

- Short Links/Files labels and removal of link search verified.
- File-name search is case-insensitive; no-results state and clearing search verified.
- Five selected files upload in one submission, with at most three requests in flight.
- Simulated partial server failure preserves only failed files. Retry uploads no successful file twice.
- Web API fixture and popup preview verified; 320/375/414/768px layouts have no document overflow.

## Dedicated upload screen verification · 2026-10-13
File history contains only search, history and a square floating upload action. The action opens a separate drop/selection screen. Browser checks cover selection queue, drag/drop, removing queued files, disabled empty submission, five-file upload, partial failure retry without duplicates, return to refreshed history, and 30-item popup queues at 320/375/400px with the submit button visible. API behavior checked with fixtures.

## Chat mutation verification · 2026-10-13
38px composer and square paper-plane send button; own messages align right. Isolated real Go server on port 43189, with separate web/Alice and popup/Bob browser contexts: anyone edits and deletes both own and other messages; both clients update through WebSocket without reload. Original author remains unchanged. Edit dialog draft survives incoming messages. Checked 320/375/414/768px widths. Server tests validate edit/delete persistence, validation, missing messages, and broadcasts to chat and general-event subscribers; race tests pass.
