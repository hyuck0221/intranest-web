const messages = {
  en: {
    "chat.edit": "Edit message",
    "chat.delete": "Delete message",
    "chat.deleteConfirm": "Delete this message?",
    "chat.save": "Save changes",
    "chat.cancel": "Cancel",

    "files.uploadTitle": "Upload files",
    "files.drop": "Drag files here or click to select",
    "files.queue": "Selected files",
    "files.removeSelected": "Remove selected file",
    "files.back": "Back to files",

    "files.search": "Search files",
    "files.noResults": "No matching files.",
    "files.selected": "{count} files selected",
    "files.uploading": "Uploading {done} / {total}…",
    "files.batchDone": "Uploaded: {count}.",
    "files.batchFailed": "{done} uploaded, {failed} failed. Retry the remaining files.",

    'settings.profile': 'Chat profile', 'settings.displayName': 'Display name', 'settings.namePlaceholder': 'Teammate', 'settings.nameHelp': 'This name appears on new messages you send.', 'settings.saveName': 'Save name', 'settings.nameSaved': 'Display name saved.', 'settings.nameRequired': 'Enter a display name.',
    'welcome.title': 'A place for your team.', 'welcome.body': 'Everyday links, useful files, and conversations. Together on your own network.', 'workspace.team': 'Team workspace', 'workspace.linksBody': 'The destinations your team comes back to. All in one place.', 'workspace.filesBody': 'Keep the documents your team needs close at hand.', 'links.search': 'Search shared links', 'links.noResults': 'No matching links. Try another search.', 'preview.example': 'Example workspace',
    'nav.features': 'Inside the nest', 'nav.guides': 'Guides', 'nav.admin': 'Open workspace', 'lang.switch': '한', 'lang.switchLabel': 'Switch to Korean',
    'hero.eyebrow': 'A SHARED SPACE FOR YOUR INTRANET',
    'hero.title': 'Your team. One shared space.',
    'hero.body': 'Keep links, files, and conversations together on a computer your team controls.',
    'hero.start': 'Get started', 'hero.explore': 'See what’s inside', 'hero.note': 'Your server. Your network. Your team.',
    'preview.title': 'Links', 'preview.online': 'Connected', 'preview.office': 'Main office',
    'preview.wiki': 'Team handbook', 'preview.drive': 'Shared drive', 'preview.project': 'Project board',
    'why.title': 'A small home for shared work.',
    'why.body': 'IntraNest runs on a computer inside your intranet. Your team connects directly to that address when it needs something.',
    'why.server': 'Runs on your computer', 'why.network': 'Stays on your network', 'why.control': 'Managed by your team',
    'features.chat': 'Conversations', 'features.chat.body': 'Talk together in real time. New teammates can catch up on the retained history.',
    'features.files': 'Files', 'features.files.body': 'Keep useful documents on the host PC, ready for everyone with access.',
    'features.links': 'Quick links', 'features.links.body': 'Put the team’s everyday destinations one click away in the browser.',
    'steps.title': 'Ready in a few steps.', 'steps.one': 'Start a server', 'steps.one.body': 'Install it on a computer inside your intranet.',
    'steps.two': 'Connect once', 'steps.two.body': 'Enter the server address in Admin or the extension.',
    'steps.three': 'Share together', 'steps.three.body': 'Add the links, files, and conversations your team needs.',
    'downloads.title': 'Choose your IntraNest download.', 'downloads.body': 'Start with the server on your intranet PC, then add the Chrome extension for quick access.',
    'downloads.server': 'Server releases', 'downloads.extension': 'Chrome extension releases', 'downloads.guide': 'Read the setup guide',
    'footer.terms': 'Terms of use', 'footer.privacy': 'Privacy', 'footer.github': 'GitHub',
    'admin.tag': 'YOUR INTRANEST', 'admin.title': 'Connect to your team.',
    'admin.body': 'Enter the server address to connect directly to your IntraNest.',
    'admin.address': 'Server address', 'admin.address.placeholder': '192.168.1.40',
    'admin.name': 'Your display name', 'admin.name.placeholder': 'Team member',
    'admin.permissionDenied': 'Allow Chrome to access this server, then try again.', 'admin.connect': 'Check and connect', 'admin.checking': 'Checking server…',
    'admin.local': 'The server address stays in this browser.',
    'admin.online': 'Connected', 'admin.edit': 'Change connection', 'admin.disconnect': 'Disconnect',
    'admin.lna': 'If Chrome asks to connect to your local network, allow access for this IntraNest site.',
    'admin.badAddress': 'Enter only the server host name or IP address. Do not include a protocol or port.',
    'admin.unavailable': 'Could not reach the server. Check the host computer, network access, and local network permission for this site.',
    'admin.incompatible': 'This server uses an API version this web app does not support yet.',
    'admin.generic': 'Could not connect. Check the server address and try again.',
    'tab.links': 'Links', 'tab.chat': 'Chat', 'tab.files': 'Files', 'tab.settings': 'Settings',
    'links.title': 'Links', 'links.add': 'Add link', 'links.empty': 'No links yet.',
    'links.titleLabel': 'Title', 'links.urlLabel': 'Link address', 'links.save': 'Save link', 'links.cancel': 'Cancel',
    'links.delete': 'Delete', 'links.open': 'Open link', 'links.saved': 'Link added.', 'links.deleted': 'Link deleted.',
    'chat.title': 'Team chat', 'chat.empty': 'No messages yet.', 'chat.name': 'Name shown in chat',
    'chat.placeholder': 'Write a message…', 'chat.send': 'Send', 'chat.realtime': 'Live', 'chat.older': 'Load older messages',
    'files.title': 'Files', 'files.choose': 'Choose files', 'files.upload': 'Upload file',
    'files.empty': 'No files yet.', 'files.download': 'Download', 'files.delete': 'Delete file',
    'files.uploaded': 'File uploaded.', 'files.limit': 'The server defaults to 100 MiB per file and 10 GiB total.',
    'files.tooLarge': 'This file exceeds the server’s per-file limit.', 'files.storageFull': 'The server’s shared file storage limit has been reached.',
    'settings.title': 'Server settings', 'settings.retention': 'Chat history retention',
    'settings.days': 'days', 'settings.save': 'Save settings', 'settings.saved': 'Settings saved.',
    'live.live': 'Live', 'live.connecting': 'Connecting…', 'live.reconnecting': 'Reconnecting…', 'common.retry': 'Try again', 'common.loading': 'Loading…', 'common.removeConfirm': 'Remove this item?',
    'guide.title': 'Set up your IntraNest', 'guide.intro': "Three steps to your team workspace. Start with Docker running on an intranet PC.",
    'guide.server': "1. Start the server", 'guide.server.body': "Run this command on the server PC with Docker running. Keep the PC on and allow TCP port 43187.",
    'guide.network': "Use your team network", 'guide.network.body': "There is no sign-in. Anyone who can reach the server can manage its content. Keep port 43187 on a trusted network, off the public internet.",
    'guide.connect': "2. Connect your browser", 'guide.connect.body': "Open the workspace. Enter the server IP or host name and your display name. HTTPS is checked first, then HTTP; port 43187 is added automatically.",
    'guide.extension': "3. Add the extension", 'guide.extension.body': "Download and extract the release. In chrome://extensions, enable Developer mode → Load unpacked → select the extracted folder. Enter the same server address.",
    'guide.update': 'Update the extension', 'guide.update.body': "Download the new ZIP, extract it over the original extension folder, then reload it in chrome://extensions. Keep the folder path to preserve your settings.",
    'guide.trouble': 'If the connection does not work', 'guide.trouble.body': 'Check that the host PC and browser are on a network that can reach each other, the server is running, TCP port 43187 is open, and the address contains only a host name or IP address. If the health URL opens directly but Admin cannot connect, allow local network access for this site in browser site settings, then reload.',
    'legal.updated': 'Updated October 1, 2026',
    'terms.title': 'Terms of use', 'terms.intro': 'These terms describe the current use of IntraNest, a self-hosted tool for teams.',
    'terms.scope': 'Use within your team', 'terms.scope.body': 'Your organization controls the network where the server runs. IntraNest has no sign-in or access key; anyone who can reach the server can manage shared content.',
    'terms.host': 'Your server and content', 'terms.host.body': 'The server host controls network access, availability, backups, updates, file-size limits, and chat retention. Anyone who can reach the server can read, add, and delete links, files, and chat messages.',
    'terms.use': 'Responsible use', 'terms.use.body': 'Do not use IntraNest to break the law, disrupt another system, or share content without permission. Follow your organization’s policies and the software license that accompanies your copy. Chat names are entered by senders and are not verified accounts.',
    'terms.risk': 'Availability', 'terms.risk.body': 'IntraNest is provided as self-hosted software. The project maintainer does not operate your intranet server or promise that it will be available, backed up, or free of errors.',
    'privacy.title': 'Privacy', 'privacy.intro': 'IntraNest is designed to keep team content on the server computer you choose.',
    'privacy.website': 'This website', 'privacy.website.body': 'The landing page and guide are static files. They do not collect analytics or send the server address to the project maintainer.',
    'privacy.browser': 'Your browser', 'privacy.browser.body': 'Admin saves the server address in this browser’s local storage. The extension stores its configured server in Chrome extension storage so it can reconnect. You can remove the saved address in Admin or the extension settings.',
    'privacy.server': 'Your server', 'privacy.server.body': 'The server stores shared links, chat messages, uploaded files, and the chat-retention setting on its data folder. Chat history is removed after the configured number of days. Anyone who can reach the server can manage its shared content.',
    'privacy.github': 'Release checks', 'privacy.github.body': 'The extension can contact api.github.com to check for a public release. GitHub receives the request and may process its network metadata under GitHub’s own privacy terms. No team content is sent in this request.',
    'privacy.contact': 'Questions', 'privacy.contact.body': 'For project questions, use the public GitHub project page.',
    "guide.before": "Before you start",
    "guide.prerequisites": "Docker running. A server PC your team can reach. Chrome for the extension.",
    "guide.command": "Terminal · macOS / Linux / WSL / Git Bash",
    "guide.copy": "Copy",
    "guide.copied": "Command copied.",
    "guide.copyFailed": "Select the command and copy it manually.",
    "guide.helpLink": "Need help connecting?",
    "guide.help": "Help & updates",
    "guide.checkNetwork": "Check that your browser can reach the server PC.",
    "guide.checkServer": "Keep Docker and the server running; allow TCP 43187.",
    "guide.checkAddress": "Enter only the IP address or host name, without a port or path.",
    "guide.checkPermission": "Allow local network access in browser site settings, then reload.",
  },
  ko: {
    "chat.edit": "메시지 수정",
    "chat.delete": "메시지 삭제",
    "chat.deleteConfirm": "이 메시지를 삭제할까요?",
    "chat.save": "수정 저장",
    "chat.cancel": "취소",

    "files.uploadTitle": "파일 업로드",
    "files.drop": "파일을 드래그하거나 눌러서 선택하세요",
    "files.queue": "선택한 파일",
    "files.removeSelected": "선택한 파일 제거",
    "files.back": "파일 목록으로",

    "files.search": "파일 검색",
    "files.noResults": "검색 결과가 없습니다.",
    "files.selected": "파일 {count}개 선택됨",
    "files.uploading": "업로드 중 {done} / {total}…",
    "files.batchDone": "파일 {count}개를 업로드했습니다.",
    "files.batchFailed": "{done}개 업로드, {failed}개 실패. 남은 파일을 다시 시도하세요.",

    'settings.profile': '채팅 프로필', 'settings.displayName': '표시 이름', 'settings.namePlaceholder': '팀원', 'settings.nameHelp': '앞으로 보내는 채팅 메시지에 이 이름이 표시됩니다.', 'settings.saveName': '이름 저장', 'settings.nameSaved': '표시 이름을 저장했습니다.', 'settings.nameRequired': '표시 이름을 입력하세요.',
    'welcome.title': '우리 팀을 위한 공간.', 'welcome.body': '매일 쓰는 링크, 필요한 파일, 함께 나누는 대화. 우리 네트워크 안에 모아두세요.', 'workspace.team': '팀 워크스페이스', 'workspace.linksBody': '팀이 자주 찾는 사이트를 한곳에서 열고 공유하세요.', 'workspace.filesBody': '함께 쓰는 문서를 가까운 곳에 보관하세요.', 'links.search': '링크 검색', 'links.noResults': '검색 결과가 없습니다. 다른 검색어를 입력하세요.', 'preview.example': '워크스페이스 예시',
    'nav.features': '둥지 살펴보기', 'nav.guides': '이용 가이드', 'nav.admin': '워크스페이스 열기', 'lang.switch': 'E', 'lang.switchLabel': '영어로 변경',
    'hero.eyebrow': '인트라넷 팀을 위한 공유 공간',
    'hero.title': '우리 팀의 일, 하나의 공간에.',
    'hero.body': '팀이 관리하는 PC 한 곳에 링크와 파일, 대화를 모아 보관합니다.',
    'hero.start': '시작 가이드', 'hero.explore': '기능 살펴보기', 'hero.note': '내 서버. 내 네트워크. 우리 팀.',
    'preview.title': '링크', 'preview.online': '연결됨', 'preview.office': '메인 사무실',
    'preview.wiki': '팀 핸드북', 'preview.drive': '공유 드라이브', 'preview.project': '프로젝트 보드',
    'why.title': '팀 공유 자료를 위한 작은 둥지.',
    'why.body': 'IntraNest는 인트라넷 안의 PC에서 동작합니다. 팀원은 필요한 순간 그 주소로 직접 연결합니다.',
    'why.server': '내 PC에서 동작', 'why.network': '네트워크 안에 보관', 'why.control': '팀이 직접 관리',
    'features.chat': '대화', 'features.chat.body': '실시간으로 이야기하고, 나중에 접속한 팀원도 보관 기간 내 기록을 확인합니다.',
    'features.files': '파일 공유', 'features.files.body': '팀이 함께 쓸 자료를 서버 PC에 보관하고 접근 권한이 있는 사람이 이용합니다.',
    'features.links': '바로가기', 'features.links.body': '팀에서 자주 쓰는 사이트를 브라우저에서 한 번에 엽니다.',
    'steps.title': '간단하게 시작하세요.', 'steps.one': '서버 시작', 'steps.one.body': '인트라넷 안의 PC에 서버를 설치합니다.',
    'steps.two': '주소 연결', 'steps.two.body': '관리자 페이지나 확장 프로그램에 서버 주소를 입력합니다.',
    'steps.three': '함께 공유', 'steps.three.body': '팀에 필요한 링크와 파일, 대화를 추가합니다.',
    'downloads.title': 'IntraNest를 내려받으세요.', 'downloads.body': '먼저 인트라넷 PC에 서버를 설치한 뒤 빠른 이용을 위해 Chrome 확장 프로그램을 추가하세요.',
    'downloads.server': '서버 다운로드', 'downloads.extension': 'Chrome 확장 프로그램', 'downloads.guide': '설치 가이드 보기',
    'footer.terms': '이용약관', 'footer.privacy': '개인정보 처리방침', 'footer.github': 'GitHub',
    'admin.tag': '내 IntraNest', 'admin.title': '우리 팀에 연결하세요.',
    'admin.body': '인트라넷 서버 주소를 입력해 IntraNest에 직접 연결하세요.',
    'admin.address': '서버 주소', 'admin.address.placeholder': '192.168.1.40',
    'admin.name': '표시 이름', 'admin.name.placeholder': '팀원',
    'admin.permissionDenied': 'Chrome에서 서버 접근 권한을 허용한 뒤 다시 연결하세요.', 'admin.connect': '연결 확인', 'admin.checking': '서버 확인 중…',
    'admin.local': '서버 주소는 이 브라우저에 저장됩니다.',
    'admin.online': '연결됨', 'admin.edit': '연결 변경', 'admin.disconnect': '연결 해제',
    'admin.lna': 'Chrome이 로컬 네트워크 연결 권한을 요청하면 이 IntraNest 사이트의 접근을 허용하세요.',
    'admin.badAddress': '서버의 호스트 이름이나 IP 주소만 입력하세요. http://, https://와 포트는 입력하지 않습니다.',
    'admin.unavailable': '서버에 연결할 수 없습니다. 서버 PC와 네트워크 연결, 이 사이트의 로컬 네트워크 권한을 확인하세요.',
    'admin.incompatible': '이 서버의 API 버전은 현재 웹 앱에서 지원하지 않습니다.',
    'admin.generic': '연결하지 못했습니다. 서버 주소를 확인한 뒤 다시 시도하세요.',
    'tab.links': '링크', 'tab.chat': '채팅', 'tab.files': '파일', 'tab.settings': '설정',
    'links.title': '링크', 'links.add': '링크 추가', 'links.empty': '아직 링크가 없습니다.',
    'links.titleLabel': '제목', 'links.urlLabel': '링크 주소', 'links.save': '링크 저장', 'links.cancel': '취소',
    'links.delete': '삭제', 'links.open': '링크 열기', 'links.saved': '링크를 추가했습니다.', 'links.deleted': '링크를 삭제했습니다.',
    'chat.title': '팀 채팅', 'chat.empty': '아직 메시지가 없습니다.', 'chat.name': '채팅에 표시할 이름',
    'chat.placeholder': '메시지를 입력하세요…', 'chat.send': '보내기', 'chat.realtime': '실시간', 'chat.older': '이전 기록 보기',
    'files.title': '파일', 'files.choose': '파일 선택', 'files.upload': '파일 업로드',
    'files.empty': '아직 파일이 없습니다.', 'files.download': '다운로드', 'files.delete': '파일 삭제',
    'files.uploaded': '파일을 업로드했습니다.', 'files.limit': '서버 기본 제한은 파일 하나당 100 MiB, 전체 10 GiB입니다.',
    'files.tooLarge': '파일 하나의 서버 용량 제한을 초과했습니다.', 'files.storageFull': '서버의 전체 파일 저장 공간이 가득 찼습니다.',
    'settings.title': '서버 설정', 'settings.retention': '채팅 기록 보관 기간',
    'settings.days': '일', 'settings.save': '설정 저장', 'settings.saved': '설정을 저장했습니다.',
    'live.live': '실시간 연결', 'live.connecting': '연결 중…', 'live.reconnecting': '다시 연결 중…', 'common.retry': '다시 시도', 'common.loading': '불러오는 중…', 'common.removeConfirm': '이 항목을 삭제할까요?',
    'guide.title': 'IntraNest 설치하기', 'guide.intro': "서버 설치부터 확장 프로그램까지, 3단계면 준비됩니다. 인트라넷 PC에서 Docker를 먼저 실행하세요.",
    'guide.server': "1. 서버 시작", 'guide.server.body': "Docker가 실행 중인 서버 PC에서 아래 명령을 실행하세요. PC 전원을 켜 두고 TCP 43187 포트를 허용하세요.",
    'guide.network': "팀 네트워크에서 사용", 'guide.network.body': "로그인 없이 서버에 연결할 수 있는 누구나 콘텐츠를 관리할 수 있습니다. 43187 포트는 신뢰할 수 있는 내부 네트워크에서만 열고 공용 인터넷에 노출하지 마세요.",
    'guide.connect': "2. 브라우저 연결", 'guide.connect.body': "워크스페이스에서 서버 IP 또는 호스트 이름과 표시 이름을 입력하세요. HTTPS를 먼저 확인한 뒤 HTTP를 시도하며, 43187 포트는 자동으로 추가됩니다.",
    'guide.extension': "3. 확장 프로그램 추가", 'guide.extension.body': "릴리스를 내려받아 압축을 풀고, chrome://extensions에서 개발자 모드 → 압축해제된 확장 프로그램 로드 → 폴더 선택 순서로 진행하세요. 같은 서버 주소를 입력하면 끝입니다.",
    'guide.update': '확장 프로그램 업데이트', 'guide.update.body': '새 GitHub 릴리스를 찾으면 확장 프로그램이 업데이트 다운로드 또는 다음에 하기를 표시합니다. ZIP 파일을 처음 불러온 폴더에 덮어쓰고 경로를 유지한 다음 chrome://extensions에서 새로고침을 선택하세요. 해당 확장 프로그램 폴더의 연결 설정은 유지됩니다.',
    'guide.trouble': '연결되지 않을 때', 'guide.trouble.body': '호스트 PC와 브라우저가 서로 연결할 수 있는 네트워크인지, 서버가 실행 중인지, TCP 43187 포트가 열려 있는지, 주소에 호스트 이름이나 IP 주소만 입력했는지 확인하세요. health 주소는 직접 열리는데 관리자 페이지에서 연결할 수 없다면, 이 사이트의 브라우저 설정에서 로컬 네트워크 접근을 허용하고 새로고침하세요.',
    'legal.updated': '2026년 10월 1일 업데이트',
    'terms.title': '이용약관', 'terms.intro': '이 약관은 팀이 직접 설치해 사용하는 IntraNest의 기본 이용 원칙을 설명합니다.',
    'terms.scope': '팀 내부에서 이용', 'terms.scope.body': '조직은 서버가 실행되는 네트워크를 관리합니다. 로그인이나 접근 키가 없으며 서버에 연결할 수 있는 사람은 공유 자료를 관리할 수 있습니다.',
    'terms.host': '서버와 콘텐츠 관리', 'terms.host.body': '서버 호스트가 네트워크 접근, 가용성, 백업, 업데이트, 파일 크기, 채팅 보관 기간을 관리합니다. 서버에 연결할 수 있는 사람은 링크·파일·채팅을 읽고 추가하고 삭제할 수 있습니다.',
    'terms.use': '책임 있는 이용', 'terms.use.body': '법률을 위반하거나 타 시스템을 방해하거나 권한이 없는 콘텐츠를 공유하지 마세요. 조직 정책과 설치된 소프트웨어에 동봉된 라이선스를 따르세요. 채팅 이름은 작성자가 입력하며 인증된 계정이 아닙니다.',
    'terms.risk': '서비스 가용성', 'terms.risk.body': 'IntraNest는 직접 설치하는 소프트웨어입니다. 프로젝트 관리자는 사용자의 인트라넷 서버를 운영하지 않으며 서버의 가용성, 백업, 오류 없음을 보장하지 않습니다.',
    'privacy.title': '개인정보 처리방침', 'privacy.intro': 'IntraNest는 팀 콘텐츠를 사용자가 선택한 서버 PC에 보관하도록 설계되었습니다.',
    'privacy.website': '웹 사이트', 'privacy.website.body': '소개와 가이드 페이지는 정적 파일입니다. 분석 도구를 사용하지 않으며 서버 주소를 프로젝트 관리자에게 전송하지 않습니다.',
    'privacy.browser': '사용자 브라우저', 'privacy.browser.body': '관리자 페이지는 서버 주소를 이 브라우저의 로컬 스토리지에 저장합니다. 확장 프로그램은 다시 연결할 수 있도록 서버 주소를 Chrome 확장 프로그램 저장소에 저장합니다. 관리자 페이지나 확장 프로그램 설정에서 삭제할 수 있습니다.',
    'privacy.server': '사용자 서버', 'privacy.server.body': '서버는 링크, 채팅 메시지, 업로드 파일, 채팅 보관 설정을 지정된 데이터 폴더에 저장합니다. 채팅은 설정된 기간이 지나면 삭제됩니다. 서버에 연결할 수 있는 사람은 공유 자료를 관리할 수 있습니다.',
    'privacy.github': '릴리스 확인', 'privacy.github.body': '확장 프로그램은 공개 릴리스를 확인하기 위해 api.github.com에 연결할 수 있습니다. GitHub는 요청과 네트워크 정보를 자체 개인정보 정책에 따라 처리할 수 있습니다. 이 요청에 팀 콘텐츠는 포함되지 않습니다.',
    'privacy.contact': '문의', 'privacy.contact.body': '프로젝트 문의는 공개 GitHub 프로젝트 페이지를 이용하세요.',
    "guide.before": "시작 전 준비",
    "guide.prerequisites": "실행 중인 Docker, 팀에서 접근할 수 있는 서버 PC, 확장 프로그램을 사용할 Chrome을 준비하세요.",
    "guide.command": "터미널 · macOS / Linux / WSL / Git Bash",
    "guide.copy": "복사",
    "guide.copied": "설치 명령을 복사했습니다.",
    "guide.copyFailed": "설치 명령을 선택해 직접 복사하세요.",
    "guide.helpLink": "연결에 도움이 필요한가요?",
    "guide.help": "도움말과 업데이트",
    "guide.checkNetwork": "브라우저에서 서버 PC에 접근할 수 있는지 확인하세요.",
    "guide.checkServer": "Docker와 서버를 실행하고 TCP 43187 포트를 허용하세요.",
    "guide.checkAddress": "포트나 경로 없이 IP 주소 또는 호스트 이름만 입력하세요.",
    "guide.checkPermission": "브라우저 사이트 설정에서 로컬 네트워크 접근을 허용한 뒤 새로고침하세요.",
  }
};

export function language() {
  const saved = localStorage.getItem('intranest-language');
  return saved === 'ko' || saved === 'en' ? saved : (navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en');
}

export function t(key) {
  const lang = language();
  return messages[lang]?.[key] ?? messages.en[key] ?? key;
}

export function applyLanguage() {
  const lang = language();
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((element) => element.setAttribute('aria-label', t(element.dataset.i18nAria)));
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  const button = document.querySelector('[data-language-toggle]');
  if (button) {
    button.textContent = t('lang.switch');
    button.setAttribute('aria-label', t('lang.switchLabel'));
  }
}

export function toggleLanguage() {
  localStorage.setItem('intranest-language', language() === 'ko' ? 'en' : 'ko');
  applyLanguage();
}

export const SERVER_PORT = 43187;

function badAddressError() {
  const error = new Error('bad_address');
  error.code = 'bad_address';
  return error;
}

export function normalizeServerAddress(raw) {
  const value = String(raw || '').trim();
  if (!value || /[\s\\/?#@]/.test(value) || /^[a-z][a-z\d+.-]*:\/\//i.test(value)) throw badAddressError();
  try {
    let parsed;
    if (value.startsWith('[')) {
      parsed = new URL('http://' + value);
      if (!parsed.hostname.includes(':') || parsed.port || parsed.pathname !== '/') throw badAddressError();
      return parsed.host;
    }
    if (value.includes(':')) {
      parsed = new URL('http://[' + value + ']');
      if (!parsed.hostname.includes(':') || parsed.pathname !== '/') throw badAddressError();
      return parsed.host;
    }
    parsed = new URL('http://' + value);
    if (!parsed.hostname || parsed.port || parsed.pathname !== '/') throw badAddressError();
    return parsed.hostname;
  } catch (error) {
    if (error?.code === 'bad_address') throw error;
    throw badAddressError();
  }
}

export function serverAddressForInput(raw) {
  const value = String(raw || '').trim();
  if (!value) return '';
  try {
    const parsed = new URL(value);
    if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname || parsed.username || parsed.password) throw badAddressError();
    return normalizeServerAddress(parsed.hostname);
  } catch (error) {
    if (error?.code === 'bad_address') throw error;
    return normalizeServerAddress(value);
  }
}

export class ApiError extends Error {
  constructor(status, code, message) {
    super(message || code || 'request_failed');
    this.status = status;
    this.code = code;
  }
}

export async function apiRequest(server, route, options = {}) {
  const { timeout: timeoutMs, ...requestOptions } = options;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs || 10000);
  const headers = new Headers(options.headers || {});
  const body = options.body;
  if (body && !(body instanceof FormData) && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  try {
    const response = await fetch(server + '/api/v2' + route, {
      ...requestOptions,
      body,
      headers,
      signal: controller.signal,
      mode: 'cors',
      cache: 'no-store',
      credentials: 'omit',
      targetAddressSpace: 'local'
    });
    if (response.status === 204) return null;
    const payload = await response.json().catch(() => null);
    if (!response.ok) throw new ApiError(response.status, payload?.error, payload?.message);
    return payload;
  } finally {
    clearTimeout(timeout);
  }
}

export async function checkServer(server) {
  const health = await apiRequest(server, '/health', { timeout: 5000 });
  if (health?.status !== 'ok' || String(health.apiVersion) !== '2') throw new ApiError(200, 'api_version', t('admin.incompatible'));
  return health;
}

export async function connectServer(address) {
  const host = normalizeServerAddress(address);
  let lastError;
  for (const protocol of ['https:', 'http:']) {
    const server = `${protocol}//${host}:${SERVER_PORT}`;
    try {
      await checkServer(server);
      return server;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error('server_unavailable');
}

export function displayError(error) {
  if (error?.code === 'bad_address') return t('admin.badAddress');
  if (error?.code === 'api_version') return t('admin.incompatible');
  if (error?.code === 'file_too_large') return t('files.tooLarge');
  if (error?.code === 'storage_limit_reached') return t('files.storageFull');
  if (error?.name === 'AbortError' || error instanceof TypeError) return t('admin.unavailable');
  return error?.message || t('admin.generic');
}

export function formatDate(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat(language() === 'ko' ? 'ko-KR' : 'en', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export function safeText(value) {
  return String(value ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim();
}

// Native validation also exposes the field state to assistive technology.
document.addEventListener('invalid', (event) => {
  if (event.target.matches('input, textarea')) event.target.setAttribute('aria-invalid', 'true');
}, true);
document.addEventListener('input', (event) => {
  if (event.target.matches('input, textarea')) event.target.removeAttribute('aria-invalid');
});
