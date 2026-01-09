import { loginOptions } from "./config/load.options.js";
import loginScenario from "./scenarios/auth.login.js";

// IMPORTS OFICIAIS DO k6 (remotos)
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.4/index.js";

export const options = loginOptions;

export default function () {
    loginScenario();
}

// Gera relatórios JSON e HTML após o teste
export function handleSummary(data) {
    return {
        "performance/reports/login/login-summary.json": JSON.stringify(data, null, 2),
        "performance/reports/login/login-report.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
