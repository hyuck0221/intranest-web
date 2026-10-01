const messages = {
  en: {
    'nav.features': 'Inside the nest', 'nav.guides': 'Guides', 'nav.admin': 'Open admin', 'lang.switch': '한국어',
    'hero.eyebrow': 'A SHARED SPACE FOR YOUR INTRANET',
    'hero.title': 'Your team’s work, close to home.',
    'hero.body': 'Keep links, files, and conversations together on a computer your team controls.',
    'hero.start': 'Get started', 'hero.explore': 'See what’s inside', 'hero.note': 'Your server. Your network. Your team.',
    'preview.title': 'Shared links', 'preview.online': 'Connected', 'preview.office': 'Main office',
    'preview.wiki': 'Team handbook', 'preview.drive': 'Shared drive', 'preview.project': 'Project board',
    'why.title': 'A small home for shared work.',
    'why.body': 'IntraNest runs on a computer inside your intranet. Your team connects directly to that address when it needs something.',
    'why.server': 'Runs on your computer', 'why.network': 'Stays on your network', 'why.control': 'Managed by your team',
    'features.chat': 'Conversations', 'features.chat.body': 'Talk together in real time. New teammates can catch up on the retained history.',
    'features.files': 'Shared files', 'features.files.body': 'Keep useful documents on the host PC, ready for everyone with access.',
    'features.links': 'Quick links', 'features.links.body': 'Put the team’s everyday destinations one click away in the browser.',
    'steps.title': 'Ready in a few steps.', 'steps.one': 'Start a server', 'steps.one.body': 'Install it on a computer inside your intranet.',
    'steps.two': 'Connect once', 'steps.two.body': 'Enter the server address and team access key in Admin or the extension.',
    'steps.three': 'Share together', 'steps.three.body': 'Add the links, files, and conversations your team needs.',
    'downloads.title': 'Choose your IntraNest download.', 'downloads.body': 'Start with the server on your intranet PC, then add the Chrome extension for quick access.',
    'downloads.server': 'Server releases', 'downloads.extension': 'Chrome extension releases', 'downloads.guide': 'Read the setup guide',
    'footer.terms': 'Terms of use', 'footer.privacy': 'Privacy', 'footer.github': 'GitHub',
    'admin.tag': 'YOUR INTRANEST', 'admin.title': 'Connect your nest.',
    'admin.body': 'Enter the intranet server address and team access key. The address is saved in this browser; the key stays in this tab session.',
    'admin.address': 'Server address', 'admin.address.placeholder': 'http://192.168.1.40:8080',
    'admin.key': 'Team access key', 'admin.key.placeholder': 'Paste the key from the server host',
    'admin.name': 'Your display name', 'admin.name.placeholder': 'Team member',
    'admin.connect': 'Check and connect', 'admin.checking': 'Checking server…',
    'admin.local': 'The address stays in this browser. The access key is kept for this tab session only.',
    'admin.online': 'Connected', 'admin.edit': 'Change connection', 'admin.disconnect': 'Disconnect',
    'admin.lna': 'If Chrome asks to connect to your local network, allow access for this IntraNest site.',
    'admin.badAddress': 'Enter a valid server address using http:// or https://.',
    'admin.unavailable': 'Could not reach the server. Check the address, port, network, and local network permission.',
    'admin.incompatible': 'This server uses an API version this web app does not support yet.',
    'admin.badKey': 'The server answered, but this access key was not accepted.',
    'admin.generic': 'Could not connect. Check the address and access key, then try again.',
    'tab.links': 'Links', 'tab.chat': 'Chat', 'tab.files': 'Files', 'tab.settings': 'Settings',
    'links.title': 'Shared links', 'links.add': 'Add link', 'links.empty': 'No shared links yet.',
    'links.titleLabel': 'Title', 'links.urlLabel': 'Link address', 'links.save': 'Save link', 'links.cancel': 'Cancel',
    'links.delete': 'Delete', 'links.open': 'Open link', 'links.saved': 'Link added.', 'links.deleted': 'Link deleted.',
    'chat.title': 'Team chat', 'chat.empty': 'Start the conversation.', 'chat.name': 'Name shown in chat',
    'chat.placeholder': 'Write a message…', 'chat.send': 'Send', 'chat.realtime': 'Live', 'chat.older': 'Load older messages',
    'files.title': 'Shared files', 'files.choose': 'Choose a file', 'files.upload': 'Upload file',
    'files.empty': 'No files shared yet.', 'files.download': 'Download', 'files.delete': 'Delete file',
    'files.uploaded': 'File uploaded.', 'files.limit': 'The server defaults to 100 MiB per file and 10 GiB total.',
    'files.tooLarge': 'This file exceeds the server’s per-file limit.', 'files.storageFull': 'The server’s shared file storage limit has been reached.',
    'settings.title': 'Server settings', 'settings.retention': 'Chat history retention',
    'settings.days': 'days', 'settings.save': 'Save settings', 'settings.saved': 'Settings saved.',
    'common.retry': 'Try again', 'common.loading': 'Loading…', 'common.removeConfirm': 'Remove this item?',
    'guide.title': 'Set up your IntraNest', 'guide.intro': 'Install the server on an intranet PC, connect your browser, then share links, files, and conversation with the team.',
    'guide.server': '1. Start the server', 'guide.server.body': 'Use Docker Compose or download a standalone release for Windows, macOS, or Linux. Keep the server PC on and allow TCP port 8080 on your intranet firewall.',
    'guide.key': '2. Find the team access key', 'guide.key.body': 'After first start, the server creates data/access.token. Share it with teammates using a trusted channel. Anyone with this shared key can manage all shared content.',
    'guide.connect': '3. Connect your browser', 'guide.connect.body': 'Open Admin, enter the server address such as http://192.168.1.40:8080 and the access key, then choose Check and connect. Chrome may ask the website to access your local network.',
    'guide.extension': '4. Install the extension', 'guide.extension.body': 'Download the latest release, extract it, and load the folder from chrome://extensions with Developer mode enabled. Open the extension, enter the same server address and key, then connect.',
    'guide.update': 'Update the extension', 'guide.update.body': 'When a newer GitHub release is available, the extension offers Download update or Later. Extract the ZIP over the same folder you originally loaded, keep its path unchanged, then choose Reload on chrome://extensions. Chrome keeps the settings for that extension folder.',
    'guide.trouble': 'If the connection does not work', 'guide.trouble.body': 'Check that the host PC and browser are on the same network, the server is running, the port is open, the address begins with http:// or https://, and the key matches. In Admin, allow Chrome’s local network prompt when it appears. The server must allow the exact web origin in INTRANEST_CORS_ORIGINS.',
    'legal.updated': 'Updated October 1, 2026',
    'terms.title': 'Terms of use', 'terms.intro': 'These terms describe the current use of IntraNest, a self-hosted tool for teams.',
    'terms.scope': 'Use within your team', 'terms.scope.body': 'Your organization chooses who can reach its server and who receives the shared access key. Only share information you are allowed to share with those people.',
    'terms.host': 'Your server and content', 'terms.host.body': 'The server host controls availability, backups, updates, file-size limits, and chat retention. Shared-key holders can read, add, and delete links, files, and chat messages.',
    'terms.use': 'Responsible use', 'terms.use.body': 'Do not use IntraNest to break the law, disrupt another system, or share content without permission. Follow your organization’s policies and the software license that accompanies your copy. Chat names are entered by senders and are not verified accounts.',
    'terms.risk': 'Availability', 'terms.risk.body': 'IntraNest is provided as self-hosted software. The project maintainer does not operate your intranet server or promise that it will be available, backed up, or free of errors.',
    'privacy.title': 'Privacy', 'privacy.intro': 'IntraNest is designed to keep team content on the server computer you choose.',
    'privacy.website': 'This website', 'privacy.website.body': 'The landing page and guide are static files. They do not collect analytics or send the server address or access key to the project maintainer.',
    'privacy.browser': 'Your browser', 'privacy.browser.body': 'Admin saves the server address in this browser’s local storage. The access key remains in the current tab session. The extension stores its configured server and key in Chrome extension storage so it can reconnect. You can remove them from Admin or the extension settings.',
    'privacy.server': 'Your server', 'privacy.server.body': 'The server stores shared links, chat messages, uploaded files, and the chat-retention setting on its data folder. Chat history is removed after the configured number of days. Your server administrator controls backups and who has the access key.',
    'privacy.github': 'Release checks', 'privacy.github.body': 'The extension can contact api.github.com to check for a public release. GitHub receives the request and may process its network metadata under GitHub’s own privacy terms. No team content is sent in this request.',
    'privacy.contact': 'Questions', 'privacy.contact.body': 'For project questions, use the public GitHub project page.'
  },
  ko: {
    'nav.features': '둥지 살펴보기', 'nav.guides': '이용 가이드', 'nav.admin': '관리자 열기', 'lang.switch': 'English',
    'hero.eyebrow': '인트라넷 팀을 위한 공유 공간',
    'hero.title': '팀의 일을 가까운 곳에 모으세요.',
    'hero.body': '팀이 관리하는 PC 한 곳에 링크와 파일, 대화를 모아 보관합니다.',
    'hero.start': '시작 가이드', 'hero.explore': '기능 살펴보기', 'hero.note': '내 서버. 내 네트워크. 우리 팀.',
    'preview.title': '공유 링크', 'preview.online': '연결됨', 'preview.office': '메인 사무실',
    'preview.wiki': '팀 핸드북', 'preview.drive': '공유 드라이브', 'preview.project': '프로젝트 보드',
    'why.title': '팀 공유 자료를 위한 작은 둥지.',
    'why.body': 'IntraNest는 인트라넷 안의 PC에서 동작합니다. 팀원은 필요한 순간 그 주소로 직접 연결합니다.',
    'why.server': '내 PC에서 동작', 'why.network': '네트워크 안에 보관', 'why.control': '팀이 직접 관리',
    'features.chat': '대화', 'features.chat.body': '실시간으로 이야기하고, 나중에 접속한 팀원도 보관 기간 내 기록을 확인합니다.',
    'features.files': '파일 공유', 'features.files.body': '팀이 함께 쓸 자료를 서버 PC에 보관하고 접근 권한이 있는 사람이 이용합니다.',
    'features.links': '바로가기', 'features.links.body': '팀에서 자주 쓰는 사이트를 브라우저에서 한 번에 엽니다.',
    'steps.title': '간단하게 시작하세요.', 'steps.one': '서버 시작', 'steps.one.body': '인트라넷 안의 PC에 서버를 설치합니다.',
    'steps.two': '주소 연결', 'steps.two.body': '관리자 페이지나 확장 프로그램에 서버 주소와 팀 접근 키를 입력합니다.',
    'steps.three': '함께 공유', 'steps.three.body': '팀에 필요한 링크와 파일, 대화를 추가합니다.',
    'downloads.title': 'IntraNest를 내려받으세요.', 'downloads.body': '먼저 인트라넷 PC에 서버를 설치한 뒤 빠른 이용을 위해 Chrome 확장 프로그램을 추가하세요.',
    'downloads.server': '서버 다운로드', 'downloads.extension': 'Chrome 확장 프로그램', 'downloads.guide': '설치 가이드 보기',
    'footer.terms': '이용약관', 'footer.privacy': '개인정보 처리방침', 'footer.github': 'GitHub',
    'admin.tag': '내 IntraNest', 'admin.title': '둥지에 연결하세요.',
    'admin.body': '인트라넷 서버 주소와 팀 접근 키를 입력하세요. 주소는 이 브라우저에 저장되고 접근 키는 현재 탭 세션에만 남습니다.',
    'admin.address': '서버 주소', 'admin.address.placeholder': 'http://192.168.1.40:8080',
    'admin.key': '팀 접근 키', 'admin.key.placeholder': '서버 PC에서 확인한 키를 붙여넣으세요',
    'admin.name': '표시 이름', 'admin.name.placeholder': '팀원',
    'admin.connect': '연결 확인', 'admin.checking': '서버 확인 중…',
    'admin.local': '주소는 이 브라우저에 저장됩니다. 접근 키는 현재 탭 세션에만 보관됩니다.',
    'admin.online': '연결됨', 'admin.edit': '연결 변경', 'admin.disconnect': '연결 해제',
    'admin.lna': 'Chrome이 로컬 네트워크 연결 권한을 요청하면 이 IntraNest 사이트의 접근을 허용하세요.',
    'admin.badAddress': 'http:// 또는 https://로 시작하는 올바른 서버 주소를 입력하세요.',
    'admin.unavailable': '서버에 연결할 수 없습니다. 주소와 포트, 네트워크, 로컬 네트워크 권한을 확인하세요.',
    'admin.incompatible': '이 서버의 API 버전은 현재 웹 앱에서 지원하지 않습니다.',
    'admin.badKey': '서버는 응답했지만 접근 키가 올바르지 않습니다.',
    'admin.generic': '연결하지 못했습니다. 주소와 접근 키를 확인한 뒤 다시 시도하세요.',
    'tab.links': '링크', 'tab.chat': '채팅', 'tab.files': '파일', 'tab.settings': '설정',
    'links.title': '공유 링크', 'links.add': '링크 추가', 'links.empty': '아직 공유 링크가 없습니다.',
    'links.titleLabel': '제목', 'links.urlLabel': '링크 주소', 'links.save': '링크 저장', 'links.cancel': '취소',
    'links.delete': '삭제', 'links.open': '링크 열기', 'links.saved': '링크를 추가했습니다.', 'links.deleted': '링크를 삭제했습니다.',
    'chat.title': '팀 채팅', 'chat.empty': '첫 대화를 시작해 보세요.', 'chat.name': '채팅에 표시할 이름',
    'chat.placeholder': '메시지를 입력하세요…', 'chat.send': '보내기', 'chat.realtime': '실시간', 'chat.older': '이전 기록 보기',
    'files.title': '공유 파일', 'files.choose': '파일 선택', 'files.upload': '파일 업로드',
    'files.empty': '아직 공유 파일이 없습니다.', 'files.download': '다운로드', 'files.delete': '파일 삭제',
    'files.uploaded': '파일을 업로드했습니다.', 'files.limit': '서버 기본 제한은 파일 하나당 100 MiB, 전체 10 GiB입니다.',
    'files.tooLarge': '파일 하나의 서버 용량 제한을 초과했습니다.', 'files.storageFull': '서버의 전체 파일 저장 공간이 가득 찼습니다.',
    'settings.title': '서버 설정', 'settings.retention': '채팅 기록 보관 기간',
    'settings.days': '일', 'settings.save': '설정 저장', 'settings.saved': '설정을 저장했습니다.',
    'common.retry': '다시 시도', 'common.loading': '불러오는 중…', 'common.removeConfirm': '이 항목을 삭제할까요?',
    'guide.title': 'IntraNest 설치하기', 'guide.intro': '인트라넷 PC에 서버를 설치하고 브라우저를 연결하면 팀에서 링크와 파일, 대화를 함께 사용할 수 있습니다.',
    'guide.server': '1. 서버 시작', 'guide.server.body': 'Docker Compose를 사용하거나 Windows, macOS, Linux용 단독 실행 파일을 내려받으세요. 서버 PC 전원을 켜 두고 인트라넷 방화벽에서 TCP 8080 포트를 허용합니다.',
    'guide.key': '2. 팀 접근 키 확인', 'guide.key.body': '처음 실행하면 서버가 data/access.token을 만듭니다. 신뢰할 수 있는 방법으로 팀원에게 전달하세요. 공용 키를 가진 사람은 모든 공유 자료를 관리할 수 있습니다.',
    'guide.connect': '3. 브라우저 연결', 'guide.connect.body': '관리자 페이지를 열고 http://192.168.1.40:8080과 같은 서버 주소 및 접근 키를 입력한 다음 연결을 확인하세요. Chrome이 웹 사이트의 로컬 네트워크 접근을 허용해 달라고 요청할 수 있습니다.',
    'guide.extension': '4. 확장 프로그램 설치', 'guide.extension.body': '최신 릴리스를 내려받아 압축을 풀고 chrome://extensions에서 개발자 모드를 켠 다음 폴더를 불러오세요. 확장 프로그램에서 같은 서버 주소와 키를 입력합니다.',
    'guide.update': '확장 프로그램 업데이트', 'guide.update.body': '새 GitHub 릴리스를 찾으면 확장 프로그램이 업데이트 다운로드 또는 다음에 하기를 표시합니다. ZIP 파일을 처음 불러온 폴더에 덮어쓰고 경로를 유지한 다음 chrome://extensions에서 새로고침을 선택하세요. 해당 확장 프로그램 폴더의 연결 설정은 유지됩니다.',
    'guide.trouble': '연결되지 않을 때', 'guide.trouble.body': '호스트 PC와 브라우저가 같은 네트워크에 있는지, 서버가 실행 중인지, 포트가 열려 있는지, 주소가 http:// 또는 https://로 시작하는지, 키가 맞는지 확인하세요. Chrome 로컬 네트워크 권한 요청을 허용하고 서버 INTRANEST_CORS_ORIGINS에 정확한 웹 origin을 설정하세요.',
    'legal.updated': '2026년 10월 1일 업데이트',
    'terms.title': '이용약관', 'terms.intro': '이 약관은 팀이 직접 설치해 사용하는 IntraNest의 기본 이용 원칙을 설명합니다.',
    'terms.scope': '팀 내부에서 이용', 'terms.scope.body': '서버에 접속할 사람과 팀 공용 접근 키를 전달할 사람은 조직이 결정합니다. 해당 팀원과 공유할 권한이 있는 정보만 올리세요.',
    'terms.host': '서버와 콘텐츠 관리', 'terms.host.body': '서버 호스트가 가용성, 백업, 업데이트, 파일 크기, 채팅 보관 기간을 관리합니다. 공용 키를 가진 사용자는 링크·파일·채팅을 읽고 추가하고 삭제할 수 있습니다.',
    'terms.use': '책임 있는 이용', 'terms.use.body': '법률을 위반하거나 타 시스템을 방해하거나 권한이 없는 콘텐츠를 공유하지 마세요. 조직 정책과 설치된 소프트웨어에 동봉된 라이선스를 따르세요. 채팅 이름은 작성자가 입력하며 인증된 계정이 아닙니다.',
    'terms.risk': '서비스 가용성', 'terms.risk.body': 'IntraNest는 직접 설치하는 소프트웨어입니다. 프로젝트 관리자는 사용자의 인트라넷 서버를 운영하지 않으며 서버의 가용성, 백업, 오류 없음을 보장하지 않습니다.',
    'privacy.title': '개인정보 처리방침', 'privacy.intro': 'IntraNest는 팀 콘텐츠를 사용자가 선택한 서버 PC에 보관하도록 설계되었습니다.',
    'privacy.website': '웹 사이트', 'privacy.website.body': '소개와 가이드 페이지는 정적 파일입니다. 분석 도구를 사용하지 않으며 서버 주소나 접근 키를 프로젝트 관리자에게 전송하지 않습니다.',
    'privacy.browser': '사용자 브라우저', 'privacy.browser.body': '관리자 페이지는 서버 주소를 이 브라우저의 로컬 스토리지에 저장합니다. 접근 키는 현재 탭 세션에 보관됩니다. 확장 프로그램은 다시 연결할 수 있도록 서버 주소와 키를 Chrome 확장 프로그램 저장소에 저장합니다. 관리자 페이지나 확장 프로그램 설정에서 삭제할 수 있습니다.',
    'privacy.server': '사용자 서버', 'privacy.server.body': '서버는 공유 링크, 채팅 메시지, 업로드 파일, 채팅 보관 설정을 지정된 데이터 폴더에 저장합니다. 채팅은 설정된 기간이 지나면 삭제됩니다. 백업과 키를 가진 사람의 관리는 서버 관리자의 책임입니다.',
    'privacy.github': '릴리스 확인', 'privacy.github.body': '확장 프로그램은 공개 릴리스를 확인하기 위해 api.github.com에 연결할 수 있습니다. GitHub는 요청과 네트워크 정보를 자체 개인정보 정책에 따라 처리할 수 있습니다. 이 요청에 팀 콘텐츠는 포함되지 않습니다.',
    'privacy.contact': '문의', 'privacy.contact.body': '프로젝트 문의는 공개 GitHub 프로젝트 페이지를 이용하세요.'
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
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  const button = document.querySelector('[data-language-toggle]');
  if (button) button.textContent = t('lang.switch');
}

export function toggleLanguage() {
  localStorage.setItem('intranest-language', language() === 'ko' ? 'en' : 'ko');
  applyLanguage();
}

export function normalizeServerAddress(raw) {
  let value = String(raw || '').trim();
  if (!value) throw new Error('bad_address');
  if (!/^https?:\/\//i.test(value)) value = 'http://' + value;
  let parsed;
  try { parsed = new URL(value); } catch { throw new Error('bad_address'); }
  if (!['http:', 'https:'].includes(parsed.protocol) || !parsed.hostname || parsed.username || parsed.password) {
    throw new Error('bad_address');
  }
  parsed.pathname = '/';
  parsed.search = '';
  parsed.hash = '';
  return parsed.origin.replace(/\/$/, '');
}

export class ApiError extends Error {
  constructor(status, code, message) {
    super(message || code || 'request_failed');
    this.status = status;
    this.code = code;
  }
}

export async function apiRequest(server, key, route, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeout || 10000);
  const headers = new Headers(options.headers || {});
  if (key) headers.set('Authorization', 'Bearer ' + key);
  const body = options.body;
  if (body && !(body instanceof FormData) && !headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  try {
    const response = await fetch(server + '/api/v1' + route, {
      ...options,
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

export async function checkServer(server, key) {
  const health = await apiRequest(server, '', '/health');
  if (health?.status !== 'ok' || String(health.apiVersion) !== '1') throw new ApiError(200, 'api_version', t('admin.incompatible'));
  if (key) await apiRequest(server, key, '/session');
  return health;
}

export function displayError(error) {
  if (error?.code === 'bad_address') return t('admin.badAddress');
  if (error?.code === 'api_version') return t('admin.incompatible');
  if (error?.code === 'file_too_large') return t('files.tooLarge');
  if (error?.code === 'storage_limit_reached') return t('files.storageFull');
  if (error?.status === 401) return t('admin.badKey');
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
