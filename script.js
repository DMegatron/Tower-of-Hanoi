document.addEventListener("DOMContentLoaded", function () {
    let mode = 'pickup';
    let selected = null;
    let moves = 0;
    let numDiscs = 4;

    const moveCounter = document.getElementById('moveCounter');

    function updateMovesCounter() {
        moves++;
        moveCounter.textContent = moves;
    }

    const pickUpOrDropDisc = function (evt) {
        const tower = evt.currentTarget;

        if (mode === 'pickup') {
            const disc = tower.lastElementChild;
            if (disc) {
                selected = disc;
                mode = 'drop';
            }
        } else { 
            if (tower.lastElementChild === null || parseInt(selected.dataset.width) < parseInt(tower.lastElementChild.dataset.width)) {
                tower.appendChild(selected);
                mode = 'pickup';
                updateMovesCounter();
                winning();
            } else if (parseInt(selected.dataset.width) > parseInt(tower.lastElementChild.dataset.width)) {
                alert('Try again!');
            }
        }
    }

    function winning() {
        const tower3 = document.querySelector('#tower3');
        if (tower3.children.length === numDiscs) {
            alert('You won in ' + moves + ' moves!');
        }
    }

    const tower1 = document.querySelector('#tower1');
    tower1.addEventListener('click', pickUpOrDropDisc);
    const tower2 = document.querySelector('#tower2');
    tower2.addEventListener('click', pickUpOrDropDisc);
    const tower3 = document.querySelector('#tower3');
    tower3.addEventListener('click', pickUpOrDropDisc);

    const autoSolveBtn = document.getElementById('autoSolveBtn');
    autoSolveBtn.addEventListener('click', function() {
        moves = 0;
        moveCounter.textContent = moves;
        const autoSolveDisplay = document.getElementById('autoSolveDisplay');
        autoSolveDisplay.innerHTML = '';
        towerOfHanoi(numDiscs, 'tower1', 'tower2', 'tower3');
    });

    const numDiscsInput = document.getElementById('numDiscsInput');
    const applyBtn = document.getElementById('applyBtn');

    numDiscsInput.value = numDiscs;

    applyBtn.addEventListener('click', function() {
        numDiscs = parseInt(numDiscsInput.value);
        resetTowers(numDiscs);
        moves = 0;
        moveCounter.textContent = moves;
    });

    resetTowers(numDiscs);

    function resetTowers(numDiscs) {
        const tower1 = document.getElementById('tower1');
        const tower2 = document.getElementById('tower2');
        const tower3 = document.getElementById('tower3');
      
        tower1.innerHTML = '';
        tower2.innerHTML = '';
        tower3.innerHTML = '';
      
        for (let i = numDiscs; i >= 1; i--) {
            const disc = document.createElement('div');
            disc.className = 'disc';
            disc.id = 'disc' + i;
            disc.dataset.height = i;
            disc.style.width = (i * 60) + 'px';
            const randomColor = getRandomColor();
            disc.style.backgroundColor = randomColor;
            disc.style.color = getContrastColor(randomColor);
            tower1.appendChild(disc);
        }
      }
      
    
    
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    function getContrastColor(hexColor) {
        const r = parseInt(hexColor.substr(1, 2), 16);
        const g = parseInt(hexColor.substr(3, 2), 16);
        const b = parseInt(hexColor.substr(5, 2), 16);
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance > 0.5 ? '#000000' : '#FFFFFF';
    }
    
    

    async function towerOfHanoi(n, source, auxiliary, target) {
        if (n === 1) {
            const moveMessage = `Move disc 1 from ${source} to ${target}<br>`;
            console.log(moveMessage);
            updateMovesCounter();
            appendToAutoSolveDisplay(moveMessage);
            await moveDisc(source, target);
            return;
        }

        await towerOfHanoi(n - 1, source, target, auxiliary);
        const moveMessage = `Move disc ${n} from ${source} to ${target}<br>`;
        console.log(moveMessage);
        appendToAutoSolveDisplay(moveMessage);
        updateMovesCounter();
        await moveDisc(source, target);
        await towerOfHanoi(n - 1, auxiliary, source, target);
    }

    function moveDisc(source, target) {
        return new Promise(resolve => {
            setTimeout(() => {
                const sourceTower = document.getElementById(source);
                const targetTower = document.getElementById(target);
                const disc = sourceTower.lastElementChild;
                targetTower.appendChild(disc);
                resolve();
            }, 1000);
        });
    }

    function appendToAutoSolveDisplay(message) {
        const autoSolveDisplay = document.getElementById('autoSolveDisplay');
        autoSolveDisplay.innerHTML += message;
    }
});
