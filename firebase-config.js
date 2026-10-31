/*
  JNFAM Analysis Calendar — Firebase 설정
  © 2025–2026 Young Tai Kang. All rights reserved. Unauthorized use, copying, modification, or distribution without the written permission of Young Tai Kang is prohibited.

  · 기존 Task Calendar와 같은 Firebase 프로젝트(jnfam-task-plan)를 쓰되,
    분석 캘린더 데이터는 전부 DATA_ROOT("analysis") 아래에만 저장합니다.
      analysis/requests  — 분석 의뢰
      analysis/tasks     — 일반 업무
      analysis/patterns  — 정기 업무 패턴
      analysis/settings  — 설정(용량·분석자·장비)
    → 생산 Task Calendar의 tasks / patterns 와 섞이지 않습니다.
  · 나중에 별도 Firebase 프로젝트로 옮기려면 이 파일의 firebaseConfig만 바꾸면 됩니다.
*/
export const firebaseConfig = {
  apiKey:            "AIzaSyBkY5IGIPC0CsJB55hui7wqCffcCiS33NI",
  authDomain:        "jnfam-task-plan.firebaseapp.com",
  databaseURL:       "https://jnfam-task-plan-default-rtdb.firebaseio.com",
  projectId:         "jnfam-task-plan",
  storageBucket:     "jnfam-task-plan.firebasestorage.app",
  messagingSenderId: "76859256151",
  appId:             "1:76859256151:web:c056fd641305780908e212",
};

export const DATA_ROOT = "analysis";
