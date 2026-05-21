import {
    appendNumber,
    appendOperator,
    clearExpression,
    evaluateExpression,
    undoExpression,
} from "./calculator.js";

const display = document.getElementById("display");
const historicoLista = document.getElementById("historico");

let expressao = "";
const historico = [];

function atualizarDisplay() {
    display.innerText = expressao || "0";
}

document.querySelectorAll(".num").forEach(btn => {
    btn.addEventListener("click", () => {
        expressao = appendNumber(expressao, btn.innerText);
        atualizarDisplay();
    });
});

document.querySelectorAll(".op").forEach(btn => {
    btn.addEventListener("click", () => {
        expressao = appendOperator(expressao, btn.innerText);
        atualizarDisplay();
    });
});

document.getElementById("clear").addEventListener("click", () => {
    expressao = clearExpression();
    atualizarDisplay();
});

document.getElementById("undo").addEventListener("click", () => {
    expressao = undoExpression(expressao);
    atualizarDisplay();
});

document.getElementById("igual").addEventListener("click", () => {
    try {
        const expressaoAtual = expressao.trim();
        const resultado = evaluateExpression(expressaoAtual);

        historico.push(expressaoAtual);
        registrarHistorico(`${expressaoAtual} = ${resultado}`);
        expressao = resultado.toString();
        atualizarDisplay();
    } catch {
        display.innerText = "Erro";
    }
});

document.getElementById("retornar").addEventListener("click", () => {
    if (historico.length > 0) {
        expressao = historico.pop();
        display.innerText = expressao;
    }
});

function registrarHistorico(texto) {
    const item = document.createElement("li");
    item.innerText = texto;
    historicoLista.appendChild(item);
}
