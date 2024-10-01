const matrixSizeInput = document.getElementById('matrix-size');
const generateButton = document.getElementById('generate-button');
const matrixAContainer = document.getElementById('matrix-a');
const matrixBContainer = document.getElementById('matrix-b');
const operationSelect = document.getElementById('operation');
const calculateButton = document.getElementById('calculate-button');
const resultMatrixContainer = document.getElementById('result-matrix');

function generateMatrix(size) {
    const matrixContainer = document.createElement('div'); 
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.value = '0'; // Default value
            matrixContainer.appendChild(input);
        }
        matrixContainer.appendChild(document.createElement('br')); // New line after each row
    }
    return matrixContainer;
}

function getMatrixValues(matrixContainer) {
    const inputs = matrixContainer.querySelectorAll('input');
    const size = Math.sqrt(inputs.length); 
    const matrix = [];

    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = Number(inputs[i * size + j].value); 
        }
    }
    return matrix;
}

function displayMatrix(matrix, container) {
     container.innerHTML = '';
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.value = matrix[i][j];
            input.disabled = true; // Make the result inputs non-editable
            container.appendChild(input);
        }
        container.appendChild(document.createElement('br')); // New line after each row
    }
}

generateButton.addEventListener('click', () => {
    const size = Number(matrixSizeInput.value);
    matrixAContainer.innerHTML = '';
    matrixBContainer.innerHTML = '';
    matrixAContainer.appendChild(generateMatrix(size));
    matrixBContainer.appendChild(generateMatrix(size));
});

calculateButton.addEventListener('click', () => {
    const matrixA = getMatrixValues(matrixAContainer);
    const matrixB = getMatrixValues(matrixBContainer);
    const operation = operationSelect.value;

    let resultMatrix;
    if (operation === 'add') {
        resultMatrix = addMatrices(matrixA, matrixB);
    } else if (operation === 'subtract') {
        resultMatrix = subtractMatrices(matrixA, matrixB);
    } else if (operation === 'multiply') {
        resultMatrix = multiplyMatrices(matrixA, matrixB);
    }

    displayMatrix(resultMatrix, resultMatrixContainer);
});

function addMatrices(matrixA, matrixB) {
    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrixA[i].length; j++) {
            result[i][j] = matrixA[i][j] + matrixB[i][j];
        }
    }
    return result;
}

function subtractMatrices(matrixA, matrixB) {
    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrixA[i].length; j++) {
            result[i][j] = matrixA[i][j] - matrixB[i][j];
        }
    }
    return result;
}

function multiplyMatrices(matrixA, matrixB) {
    const result = [];
    for (let i = 0; i < matrixA.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrixB[0].length; j++) {
            result[i][j] = 0;
            for (let k = 0; k < matrixA[0].length; k++) {
                result[i][j] += matrixA[i][k] * matrixB[k][j];
            }
        }
    }
    return result;
}