import { execSync } from "child_process";

export default async function globalTeardown() {
    try {
        console.log("📊 Generating Allure report...");

        // 1️⃣ Generate normal Allure report
        execSync("npm run allure:generate", { stdio: "inherit" });

        console.log("📦 Combining report into single HTML...");

        // 2️⃣ Combine into single HTML file
        execSync("npm run combineReport", { stdio: "inherit" });

        console.log("✅ Single HTML report created successfully.");

    } catch (error) {
        console.error("❌ Error during report generation:", error);
    }
}