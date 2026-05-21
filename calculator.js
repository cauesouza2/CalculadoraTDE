const OPERATORS = new Set(["+", "-", "*", "/"]);

function tokenize(expression) {
    return String(expression || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean);
}

function formatTokens(tokens) {
    if (tokens.length === 0) {
        return "";
    }

    const text = tokens.join(" ");
    return OPERATORS.has(tokens[tokens.length - 1]) ? `${text} ` : text;
}

function assertOperator(operator) {
    if (!OPERATORS.has(operator)) {
        throw new Error(`Operador invalido: ${operator}`);
    }
}

function isNumberToken(token) {
    return /^-?\d+(\.\d+)?$/.test(token);
}

export function appendNumber(expression, number) {
    const digit = String(number);

    if (!/^\d$/.test(digit)) {
        throw new Error(`Numero invalido: ${number}`);
    }

    const tokens = tokenize(expression);
    const lastToken = tokens[tokens.length - 1];

    if (!lastToken || OPERATORS.has(lastToken)) {
        tokens.push(digit);
    } else {
        tokens[tokens.length - 1] = `${lastToken}${digit}`;
    }

    return formatTokens(tokens);
}

export function appendOperator(expression, operator) {
    assertOperator(operator);

    const tokens = tokenize(expression);

    if (tokens.length === 0) {
        return "";
    }

    const lastToken = tokens[tokens.length - 1];

    if (OPERATORS.has(lastToken)) {
        tokens[tokens.length - 1] = operator;
    } else {
        tokens.push(operator);
    }

    return formatTokens(tokens);
}

export function clearExpression() {
    return "";
}

export function undoExpression(expression) {
    const tokens = tokenize(expression);

    if (tokens.length === 0) {
        return "";
    }

    const lastToken = tokens[tokens.length - 1];

    if (OPERATORS.has(lastToken) || lastToken.length === 1) {
        tokens.pop();
    } else {
        tokens[tokens.length - 1] = lastToken.slice(0, -1);
    }

    return formatTokens(tokens);
}

function validateTokens(tokens) {
    if (tokens.length === 0 || tokens.length % 2 === 0) {
        throw new Error("Expressao invalida");
    }

    tokens.forEach((token, index) => {
        if (index % 2 === 0) {
            if (!isNumberToken(token)) {
                throw new Error("Expressao invalida");
            }
        } else {
            assertOperator(token);
        }
    });
}

function applyOperation(left, operator, right) {
    if (operator === "+") {
        return left + right;
    }

    if (operator === "-") {
        return left - right;
    }

    if (operator === "*") {
        return left * right;
    }

    if (right === 0) {
        throw new Error("Divisao por zero");
    }

    return left / right;
}

export function evaluateExpression(expression) {
    const tokens = tokenize(expression);
    validateTokens(tokens);

    const values = [];
    const operators = [];

    for (let index = 0; index < tokens.length; index += 1) {
        if (index % 2 === 0) {
            values.push(Number(tokens[index]));
        } else {
            operators.push(tokens[index]);
        }
    }

    for (let index = 0; index < operators.length; index += 1) {
        const operator = operators[index];

        if (operator === "*" || operator === "/") {
            const result = applyOperation(values[index], operator, values[index + 1]);
            values.splice(index, 2, result);
            operators.splice(index, 1);
            index -= 1;
        }
    }

    return operators.reduce(
        (result, operator, index) => applyOperation(result, operator, values[index + 1]),
        values[0],
    );
}
