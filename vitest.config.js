import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        coverage: {
            include: ["calculator.js"],
            provider: "v8",
            reporter: ["text", "lcov", "cobertura"],
            reportsDirectory: "coverage",
        },
        outputFile: {
            junit: "test-results/junit.xml",
        },
        reporters: ["default", "junit"],
    },
});
