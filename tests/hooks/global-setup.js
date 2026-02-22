import fs from "fs";
import path from "path";

export default async function globalSetup() {
    const root = process.cwd();

    const itemsToClean = [
        "allure-results",
        "allure-report",
        "playwright-report",
        "test-results",
        "index.html" // generated single file
    ];

    itemsToClean.forEach((item) => {
        const fullPath = path.join(root, item);

        if (fs.existsSync(fullPath)) {
            fs.rmSync(fullPath, { recursive: true, force: true });
            console.log(`🧹 Cleaned: ${item}`);
        }
    });

    console.log("✅ Pre-run cleanup done.");
}