import { describe, expect, it } from "vitest";

import {
    appendNumber,
    appendOperator,
    clearExpression,
    evaluateExpression,
    undoExpression,
} from "../calculator.js";

describe("calculator expression helpers", () => {
    it("appends numbers and operators using the UI expression format", () => {
        let expression = "";

        expression = appendNumber(expression, "1");
        expression = appendNumber(expression, "2");
        expression = appendOperator(expression, "+");
        expression = appendNumber(expression, "3");

        expect(expression).toBe("12 + 3");
    });

    it("replaces the last operator when a new operator is selected", () => {
        const expression = appendOperator("12 + ", "-");

        expect(expression).toBe("12 - ");
    });

    it("clears and undoes expressions", () => {
        expect(clearExpression()).toBe("");
        expect(undoExpression("123")).toBe("12");
        expect(undoExpression("12 + ")).toBe("12");
    });
});

describe("evaluateExpression", () => {
    it("evaluates addition, subtraction, multiplication and division", () => {
        expect(evaluateExpression("8 + 2")).toBe(10);
        expect(evaluateExpression("8 - 2")).toBe(6);
        expect(evaluateExpression("8 * 2")).toBe(16);
        expect(evaluateExpression("8 / 2")).toBe(4);
    });

    it("respects multiplication and division precedence", () => {
        expect(evaluateExpression("2 + 3 * 4")).toBe(14);
        expect(evaluateExpression("20 - 8 / 2")).toBe(16);
    });

    it("continues from decimal and negative results", () => {
        expect(evaluateExpression("0.5 + 1")).toBe(1.5);
        expect(evaluateExpression("-3 + 5")).toBe(2);
    });

    it("rejects invalid expressions", () => {
        expect(() => evaluateExpression("2 +")).toThrow("Expressao invalida");
        expect(() => evaluateExpression("2 / 0")).toThrow("Divisao por zero");
    });
});
