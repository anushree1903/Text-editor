let isDragging = false;
    let offset = { x: 0, y: 0 };

    const draggableText = document.getElementById('draggableText');
    const textAreaContainer = document.getElementById('textAreaContainer');
    const textArea = document.getElementById('textArea');
    const fontFamilySelect = document.getElementById('fontFamilySelect');
    const colorPicker = document.getElementById('colorPicker');
    const fontSizeSelect = document.getElementById('fontSizeSelect');

    draggableText.addEventListener('mousedown', (e) => {
        isDragging = true;
        offset = {
            x: e.clientX - draggableText.getBoundingClientRect().left,
            y: e.clientY - draggableText.getBoundingClientRect().top
        };
        draggableText.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const x = e.clientX - textAreaContainer.getBoundingClientRect().left - offset.x;
        const y = e.clientY - textAreaContainer.getBoundingClientRect().top - offset.y;

        draggableText.style.left = `${Math.max(0, Math.min(x, textAreaContainer.clientWidth - draggableText.clientWidth))}px`;
        draggableText.style.top = `${Math.max(0, Math.min(y, textAreaContainer.clientHeight - draggableText.clientHeight))}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        draggableText.style.cursor = 'grab';
    });

    function undo() {
        document.execCommand('undo', false, null);
    }

    function redo() {
        document.execCommand('redo', false, null);
    }

    function insertText() {
        const newText = textArea.value;
        if (newText.trim() !== '') {
            draggableText.textContent = neText;
            textArea.value = '';
        }
    }

    function changeFontFamily() {
        const selectedFontFamily = fontFamilySelect.value;
        document.execCommand('fontName', false, selectedFontFamily);
    }

    function changeTextColor() {
        const selectedColor = colorPicker.value;
        document.execCommand('foreColor', false, selectedColor);
    }

    function changeTextSize() {
        const selectedSize = fontSizeSelect.value;
        document.execCommand('fontSize', false, selectedSize);
    }