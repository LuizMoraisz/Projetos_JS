const display = document.getElementById("display");
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

let novoNumero = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador !== undefined;  

const calcular = () => {
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',' , '.'));
        novoNumero = true;
        
        //console.log(`numeroAnterior: ${numeroAnterior}, operador: ${operador}, numeroAtual: ${numeroAtual}`);


        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);

       /* if (operador == "+"){
            atualizarDisplay(numeroAnterior + numeroAtual);
        }else if (operador == "-"){
            atualizarDisplay(numeroAnterior - numeroAtual);
        }else if (operador == "*") {
            atualizarDisplay(numeroAnterior * numeroAtual);
        }else if (operador == "/"){
            atualizarDisplay(numeroAnterior / numeroAtual);
        }*/
    }
}

const atualizarDisplay = (texto) => {
    if (novoNumero){
        display.textContent = texto.toLocaleString('pt-BR');
        novoNumero = false;
    }else{
        display.textContent += texto.toLocaleString('pt-BR');
    }
}

const InserirNumero =  (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach(numero => numero.addEventListener('click' , InserirNumero));

const selecionarOperador = (evento) => {
    if (!novoNumero){
    calcular()
    
    novoNumero = true;
    operador = evento.target.textContent;
    numeroAnterior =  parseFloat(display.textContent.replace(',' , '.'));
    console.log(operador)
    }
}

operadores.forEach(operador => operador.addEventListener('click' , selecionarOperador));


const ativarIgual = () => {
    calcular();
    operador = undefined;

}
document.getElementById("Igual").addEventListener('click', ativarIgual);

const LimparDisplay = () => display.textContent = '';
document.getElementById("LimparDisplay").addEventListener('click', LimparDisplay);

const LimparCalculo = () => {
    LimparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
}
document.getElementById("LimparCalculo").addEventListener('click', LimparCalculo);

const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1)
document.getElementById("backspace").addEventListener('click' , removerUltimoNumero);

const inverterSinal = () => {
    novoNumero = true;
    atualizarDisplay(display.textContent * -1);
};
document.getElementById('Inverter').addEventListener('click', inverterSinal);

const existeDecimal = () => display.textContent.indexOf(',') !== -1;
const existeValor = () => display.textContent.length > 0;
const inserirDecimal = () => {
    if (!existeDecimal()){
        if(existeValor()){
            atualizarDisplay(',');
        }else{
            atualizarDisplay('0,');
        }
    }
}
document.getElementById("decimal").addEventListener('click', inserirDecimal)