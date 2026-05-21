let display = document.getElementById("display");
let historicoLista = document.getElementById("historico");

let expressao = "";
let historico = [];

document.querySelectorAll(".num").forEach(btn => {
    btn.addEventListener("click", () => {
        expressao += btn.innerText;
        display.innerText = expressao;
    });
});

document.querySelectorAll(".op").forEach(btn => {
    btn.addEventListener("click", () => {
        expressao += " " + btn.innerText + " ";
        display.innerText = expressao;
    });
});

document.getElementById("clear").addEventListener("click", () => {
    expressao = "";
    display.innerText = "0";
});

document.getElementById("undo").addEventListener("click", () => {
    expressao = expressao.trim().slice(0, -1);
    display.innerText = expressao || "0";
});

document.getElementById("igual").addEventListener("click", () => {
    try {
        historico.push(expressao);
        let resultado = eval(expressao);
        registrarHistorico(expressao + " = " + resultado);
        expressao = resultado.toString();
        display.innerText = expressao;
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
    let item = document.createElement("li");
    item.innerText = texto;
    historicoLista.appendChild(item);
}
