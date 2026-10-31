# JNFAM Analysis Calendar · 분석 Task Calendar

분석 의뢰(접수 → 전처리 → 측정 → 데이터검토 → 결과발송)를 달력으로 관리하는 웹앱입니다.
고객 분석 의뢰서(`JNFAM Analysis Request Form .xlsx`)를 끌어다 놓으면 자동으로 읽어 등록합니다. 한국어 / English 전환 지원.

© 2025–2026 Young Tai Kang. All rights reserved. Unauthorized use, copying, modification, or distribution without the written permission of Young Tai Kang is prohibited.

---

## 1. GitHub에 올리기

1. GitHub에서 새 repository 생성 — 이름 예: `JNFAM-Analysis-Calendar` (Public)
2. **Add file → Upload files** 로 이 폴더의 파일을 **전부** 올리기
   - `index.html` · `firebase-config.js` · `database.rules.json` · `README.md` · `LICENSE` · `.nojekyll`
   - `.nojekyll`은 숨김 파일이라 탐색기에서 안 보일 수 있습니다. 안 올라가도 동작에는 문제 없습니다.
3. **Settings → Pages → Build and deployment**
   - Source: `Deploy from a branch` / Branch: `main` / 폴더: `/ (root)` → Save
4. 1~2분 뒤 주소: `https://yt9495.github.io/JNFAM-Analysis-Calendar/`

> ⚠️ `index.html`을 더블클릭해서 열면 동작하지 않습니다 (`firebase-config.js`를 못 읽음). 반드시 GitHub Pages 주소로 여세요.

## 2. Firebase 규칙에 `analysis` 경로 추가 (최초 1회)

데이터는 기존 Task Calendar와 **같은 프로젝트(`jnfam-task-plan`)의 `/analysis/` 아래에만** 저장됩니다. 생산 캘린더의 `tasks`·`patterns`와 섞이지 않습니다.

Firebase 콘솔 → Realtime Database → **규칙(Rules)** 에서, **기존 규칙은 그대로 두고** `"rules": { ... }` 안에 `analysis` 블록만 추가하세요.

```json
{
  "rules": {
    "tasks":    { ... 기존 그대로 ... },
    "patterns": { ... 기존 그대로 ... },

    "analysis": {
      ".read": true,
      ".write": true,
      "requests": { ".indexOn": ["dueDate", "plannedDate", "reqNo"] }
    }
  }
}
```

- `database.rules.json` 파일은 추가할 블록의 원본입니다. **규칙 전체를 이 파일로 덮어쓰면 기존 Task Calendar가 멈춥니다.**
- 기존 규칙이 최상위 `".read": true, ".write": true`(또는 날짜 만료 조건)로 되어 있다면 이미 허용된 상태입니다. 다만 만료 날짜가 있으면 그날 두 앱이 함께 멈추므로 날짜를 확인하세요.
- 저장 후 앱을 열어 상단 배지가 **실시간 동기화 중** 이면 정상입니다. "저장 실패 … analysis 경로 허용 필요" 메시지가 뜨면 규칙이 아직 반영되지 않은 것입니다.

## 3. 처음 설정 (앱의 ⚙ 설정 탭)

| 항목 | 설명 |
|---|---|
| 하루 측정 용량 | ICP-MS 하루 처리 가능 샘플 수. 달력의 `🧪 n/용량` 부하 표시 기준 (기본 20) |
| 결과 약속일 기본값 | 의뢰서에 결과 요청일이 없을 때 접수일 + N 영업일 |
| 담당 분석자 / 장비 | 쉼표로 구분. 입력 칸 자동완성에 사용 |

## 4. 사용 흐름

1. **📥 의뢰 등록** → 고객 의뢰서 .xlsx 끌어다 놓기 → 내용 확인, 접수일·측정 예정일·담당자 입력 → 저장
   - 의뢰번호 칸이 비어 있으면 `AN-YYMM-###` 자동 채번
   - 요청 부서는 의뢰서 안의 Dept Master 시트에서 공정·구매팀까지 자동 매칭
   - 결과 요청일 누락, Sample ID 중복, 미등록 부서, 기존 의뢰와 중복은 경고 표시
2. **📅 달력** → 의뢰 클릭 → 단계 버튼으로 진행 기록 (단계별 날짜 자동 기록, 결과발송 시 TAT 계산)
3. **📋 의뢰 목록** → 검색·필터, 평균 TAT·약속일 준수율, CSV(샘플 1건당 1행)
4. **🔁 정기 업무** → UPW 정기 측정, ICP-MS 점검, 교정·QC 등 반복 업무 등록

## 5. 파일 구성

| 파일 | 내용 |
|---|---|
| `index.html` | 앱 전체 (화면·로직·의뢰서 파서·한/영 문구) |
| `firebase-config.js` | Firebase 연결 정보 + 저장 경로(`DATA_ROOT = "analysis"`). 다른 프로젝트로 옮길 때 이 파일만 수정 |
| `database.rules.json` | Firebase 규칙에 추가할 `analysis` 블록 |
| `LICENSE` | 저작권 고지 |

## 참고

- 휴일: 미국 연방 + 조지아 주 휴일 표시 (Task Calendar와 동일). 조지아 주 2027년 공식 목록이 발표되면 `index.html`의 `GA_OFFICIAL`에 추가.
- 현재 로그인 없음 — 주소를 아는 사람은 누구나 읽고 쓸 수 있습니다. 고객 시료 정보가 쌓이면 로그인/권한 추가를 권장합니다.
- 언어 선택은 브라우저별로 기억됩니다. 저장되는 데이터(단계·종류)는 언어와 무관하게 동일합니다.
