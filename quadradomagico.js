const ordem = 3;
const matriz = Array(ordem);
for(let i=0; i < matriz.length; i++) {
    matriz[i] = Array(ordem);
}
const somaNumeros = 15;

document.addEventListener('DOMContentLoaded', function () {
    inserirTabela(ordem);
});

function inserirTabela (ordem) {
    const tabela = document.createElement('table');
    tabela.id = 'quadrado';
    document.body.append(tabela);
    for (let i=0; i<ordem; i++) {
        const linha = document.createElement('tr');
        tabela.append(linha);
        for (let j=0; j< ordem; j++) {
            const celula = document.createElement('td');
            linha.append(celula);
            celula.id = `lin${i}col${j}`;
            inserirInput(celula);
        }
    }
}

function getLinhaColuna(celula) {
    const [linha, coluna] = celula.id.split('col');
    return [linha.split('lin')[1], coluna];
}

function inserirInput(celula) {
    const input = document.createElement('input');
    celula.append(input);
    input.addEventListener('change', function() {
        const valor = parseInt(input.value);
        const [linha,coluna] = getLinhaColuna(celula);
        matriz[linha][coluna] = valor;
        const quadradoCompleto = verificaMatriz();
        if (quadradoCompleto) {
            document.querySelector('#quadrado').classList.add('vitoria');
        } else {
            document.querySelector('#quadrado').classList.remove('vitoria');
        }
    });
}

function verificaMatriz() {
    const numerosRepetidos = verificaNumerosRepetidos();
    const numerosForaDosLimites = verificaNumerosForaDosLimites();
    const somasCorretas = verificaSomasCorretas();
    return !numerosRepetidos && !numerosForaDosLimites && somasCorretas;
}

function verificaNumerosRepetidos() {
    const numeros = Array(ordem**2).fill(0);
    let numerosRepetidos = false;
    for (let i=0; i<ordem; i++) {
        for (let j=0; j<ordem; j++) {
            const valor = matriz[i][j];
            if (!isNaN(valor)) {
                numeros[valor-1]++;
            }
        }
    } 
    for (let i=0; i<ordem; i++) {
        for (let j=0; j<ordem; j++) {
            const valor = matriz[i][j];
            if (!isNaN(valor) && numeros[valor-1]>1) {
                numerosRepetidos = true;
                atribuiClasseCelula('numerosrepetidos', i, j);
            } else {
                removeClasseCelula('numerosrepetidos', i, j);
            }
        }
    }
    return numerosRepetidos;
}

function verificaNumerosForaDosLimites() {
    const minimo = 1;
    const maximo = ordem**2;
    let numerosForaDosLimites = false;
    for (let i=0; i<ordem; i++) {
        for (let j=0; j<ordem; j++) {
            if (matriz[i][j] < minimo || matriz[i][j] > maximo) {
                numerosForaDosLimites = true;
                atribuiClasseCelula('numerosForaDosLimites', i, j);
            } else {
                removeClasseCelula('numerosForaDosLimites', i, j);
            }
        }
    }
    return numerosForaDosLimites;
}

function atribuiClasseCelula(classe, i, j) {
    const celula = document.querySelector(`#lin${i}col${j}`);
    celula.classList.add(classe);
}

function removeClasseCelula(classe, i, j) {
    const celula = document.querySelector(`#lin${i}col${j}`);
    celula.classList.remove(classe);
}

function verificaSomasCorretas() {
    const diagonalPrincipal = verificaSomaDiagonalPrincipal();
    const diagonalSecundaria = verificaSomaDiagonalSecundaria();
    const linhasCorretas = verificaSomaLinhasCorretas();
    const colunasCorretas = verificaSomaColunasCorretas();
    return diagonalPrincipal && diagonalSecundaria && linhasCorretas && colunasCorretas;
}

function verificaSomaDiagonalPrincipal () {
    let soma = 0;
    for (let i=0; i<ordem; i++) {
        if (matriz[i][i] == null) return false;
        soma += matriz[i][i];
    }
    if (soma != somaNumeros) {
        for (let i=0; i<ordem; i++) {
            atribuiClasseCelula("somaErradaDiagonalPrincipal", i, i)
        }
        return false;
    } else {
        for (let i=0; i<ordem; i++) {
            removeClasseCelula("somaErradaDiagonalPrincipal", i, i)
        }
    }
    return true;
}

function verificaSomaDiagonalSecundaria() {
    let soma = 0;
    for (let i=0; i<ordem; i++) {
        if (matriz[i][ordem-i-1] == null) return false;
        soma += matriz[i][ordem-i-1];
    }
    if (soma != somaNumeros) {
        for (let i=0; i<ordem; i++) {
            atribuiClasseCelula("somaErradaDiagonalSecundaria", i, ordem-i-1)
        }
        return false;
    } else {
        for (let i=0; i<ordem; i++) {
            removeClasseCelula("somaErradaDiagonalSecundaria", i, ordem-i-1)
        }
    }
    return true;
}

function verificaSomaLinhasCorretas() {
    let linhasCorretas = true;
    for (let i=0; i<ordem; i++) {
        linhasCorretas &= verificaSomaLinha(i);
    }
    return linhasCorretas;
}

function verificaSomaLinha(i) {
    let soma = 0;
    for (let j=0; j<ordem; j++) {
        if (matriz[i][j] == null) return false;
        soma += matriz[i][j];
    }
    if (soma != somaNumeros) {
        for (let j=0; j<ordem; j++) {
            atribuiClasseCelula("somaErradaLinhas", i, j)
        }
        return false;
    } else {
        for (let j=0; j<ordem; j++) {
            removeClasseCelula("somaErradaLinhas", i, j)
        }
    }
    return true;
}

function verificaSomaColunasCorretas() {
    let colunasCorretas = true;
    for (let j=0; j<ordem; j++) {
        colunasCorretas &= verificaSomacoluna(j);
    }
    return colunasCorretas;
}

function verificaSomacoluna(j) {
    let soma = 0;
    for (let i=0; i<ordem; i++) {
        if (matriz[i][j] == null) return false;
        soma += matriz[i][j];
    }
    if (soma != somaNumeros) {
        for (let i=0; i<ordem; i++) {
            atribuiClasseCelula("somaErradaColuna", i, j)
        }
        return false;
    } else {
        for (let i=0; i<ordem; i++) {
            removeClasseCelula("somaErradaColuna", i, j)
        }
    }
    return true;
}