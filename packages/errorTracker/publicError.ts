import { PublicErrorReport } from "../types"
export const PublicErrorInit = {
  timestamp: Date.now(),
  page: window.location.href,
  userAgent: navigator.userAgent,

} as PublicErrorReport
