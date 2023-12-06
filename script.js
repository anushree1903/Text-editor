const undoButton = document.getElementById('undo');
const redoButton = document.getElementById('redo');
const fontNameSelect = document.getElementById('fontName');
const fontSizeSelect = document.getElementById('fontSize');
const fontColorInput = document.getElementById('fontColor');
const textInput = document.getElementById('text-input');


let currentDraggedElement = null;
const undoStack = [];
const redoStack = [];

function undo() {
    if (undoStack.length > 1) {
        redoStack.push(undoStack.pop());
        textInput.innerHTML = undoStack[undoStack.length - 1];
    }
}

undoButton.addEventListener('click', undo);

function redo() {
    if (redoStack.length > 0) {
        undoStack.push(redoStack.pop());
        textInput.innerHTML = undoStack[undoStack.length - 1];
    }
}

redoButton.addEventListener('click', redo);

textInput.addEventListener('input', () => {
    redoStack.length = 0;
    undoStack.push(textInput.innerHTML);
});

for (let i = 1; i <= 50; i++) {
    const option = document.createElement('option');
    option.textContent = i;
    fontSizeSelect.appendChild(option);
}

fontNameSelect.addEventListener('change', () => {
    applyStyle('fontFamily', fontNameSelect.value);
    saveState();
});

fontSizeSelect.addEventListener('change', () => {
    applyStyle('fontSize', fontSizeSelect.value + 'px');
    saveState();
});

fontColorInput.addEventListener('input', () => {
    applyStyle('color', fontColorInput.value);
    saveState();
});

function applyStyle(style, value) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const selectedText = range.extractContents();
        const span = document.createElement('span');
        span.style[style] = value;
        span.appendChild(selectedText);
        range.insertNode(span);
    }
}
function addTextBox() {

    const textInput = document.getElementById('text-input');
    const textBox = document.createElement('input');
    textBox.type = 'text';
    textInput.appendChild(textBox);
    textBox.focus();
   
}

function saveState() {
    undoStack.push(textInput.innerHTML);
}