const couleurs = [
    ['#d4b996', '#b89b7d'],
    ['#e5d3b3', '#c4a484'],
    ['#d4c4a8', '#b89b7d'],
    ['#e8d5b5', '#c4a484'],
    ['#d4b996', '#a88c6c']
];

let indexCouleur = 0;

function appliquerEffetVisuel() {
    const titre = document.querySelector('.titre-rigolo');
    const image = document.querySelector('.image-rigolote');

    // Liste d'effets visuels possibles
    const effets = [
        () => { // Effet de pulsation sur le titre
            titre.style.animation = 'none';
            setTimeout(() => { titre.style.animation = 'pulsation 1s infinite'; }, 10);
        },
        () => { // Effet de rotation sur l'image
            image.style.animation = 'none';
            setTimeout(() => { image.style.animation = 'rotation 2s infinite linear'; }, 10);
        },
        () => { // Effet de clignotement sur le titre
            titre.style.animation = 'none';
            setTimeout(() => { titre.style.animation = 'clignotement 1s infinite'; }, 10);
        },
        () => { // Effet de tremblement sur le titre
            titre.style.animation = 'none';
            setTimeout(() => { titre.style.animation = 'tremblement 0.2s infinite'; }, 10);
        },
        () => { // Effet d'agrandissement sur l'image
            image.style.animation = 'none';
            setTimeout(() => { image.style.animation = 'agrandissement 1s infinite'; }, 10);
        },
        () => { // Effet de couleur changeante sur le titre
            titre.style.animation = 'none';
            setTimeout(() => { titre.style.animation = 'couleur-changeante 2s infinite linear'; }, 10);
        }
    ];

    // Désactiver tous les effets précédents
    titre.style.animation = 'none';
    image.style.animation = 'none';

    // Choisir un effet aléatoire et l'appliquer
    const effetAleatoire = effets[Math.floor(Math.random() * effets.length)];
    effetAleatoire();
}

let timeoutId = null; // Pour stocker l'ID du timer

function faireDanser() {
    const image = document.querySelector('.image-rigolote');
    if (image.classList.contains('danse')) {
        image.classList.remove('danse');
        // Annuler le timer si l'image arrête de danser
        if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
        }
    } else {
        image.classList.add('danse');
        // Lancer des confettis !
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

        // Lancer le timer pour la redirection après 5 secondes
        timeoutId = setTimeout(() => {
            window.open('https://www.youtube.com/channel/UCCIeZrJyfTgUWJEz1zWOimA', '_blank');
            window.open('https://www.youtube.com/@noeok', '_blank');
            // Optionnel : arrêter la danse après la redirection
            image.classList.remove('danse');
             if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        }, 5000); // 5000 millisecondes = 5 secondes
    }
}

// Ajouter des effets au survol de l'image
document.querySelector('.image-rigolote').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
});

document.querySelector('.image-rigolote').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});

var player1;
var player2;
var channelPlayer1;
var channelPlayer2;

function onYouTubeIframeAPIReady() {
    player1 = new YT.Player('player1', {
        videoId: 'M8dsSVEVMMQ',
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
    player2 = new YT.Player('player2', {
        videoId: '2TEiF3WmIKw',
         events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
     channelPlayer1 = new YT.Player('channelPlayer1', {
        videoId: 'UCCIeZrJyfTgUWJEz1zWOimA',
         playerVars: {
            listType: 'user_uploads',
            list: 'UCCIeZrJyfTgUWJEz1zWOimA'
        },
         events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
    channelPlayer2 = new YT.Player('channelPlayer2', {
        videoId: 'UCnoeok',
         playerVars: {
            listType: 'user_uploads',
            list: 'UCnoeok'
        },
         events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
}

function onPlayerReady(event) {
    // Optionnel: lire la vidéo quand le lecteur est prêt
    // event.target.playVideo();
}

function onPlayerError(event) {
     console.error('YouTube Player Error:', event.data);
     // Afficher un message d'erreur plus précis si possible
     const playerId = event.target.getIframe().parentElement.id;
     const errorDiv = document.getElementById(playerId);
     if(errorDiv) {
         errorDiv.innerHTML = '<p>Erreur de lecture vidéo. Code: ' + event.data + '</p>';
         errorDiv.style.color = 'red';
         errorDiv.style.textAlign = 'center';
         errorDiv.style.padding = '20px';
     }
}

// Données pour le Finder simulé
const finderData = {
    'Baget': [
        { name: 'image.jpg', type: 'image', src: 'image.jpg' },
        { name: 'Baget Exploreur', type: 'app', targetWindowId: 'bagetExplorerWindow', icon: 'baget.png' },
        { name: 'Bloc-notes de Baget', type: 'app', targetWindowId: 'bagetNotesWindow', icon: 'bagetnote.png' }
    ]
};

// Fonction pour afficher le contenu du dossier sélectionné dans le Finder
function displayFolderContent(folderName) {
    const mainContentArea = document.querySelector('#finderWindow .finder-main-content');
    mainContentArea.innerHTML = ''; // Vider le contenu actuel

    const items = finderData[folderName] || [];

    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('finder-item');
        // itemElement.setAttribute('data-name', item.name); // Stocker le nom de l'élément

        const iconElement = document.createElement('img');
        let itemIconSrc = '';

        // Déterminer l'icône en fonction du type d'élément
        if (item.type === 'image') {
            itemIconSrc = item.src; // Utilise l'image elle-même comme icône pour l'exemple d'image
        } else if (item.type === 'app') {
            itemIconSrc = item.icon; // Utilise l'icône spécifiée pour l'application
        } else {
             // Icône par défaut si ce n'est pas un type connu
            itemIconSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImZpbGw6ICM1NTU7Ij48cGF0aCBkPSJNMTAgNGgybDUgNS4wMDZWMjBoLTE0VjRoN3ptMiAyaDB2My42NThMOC40NzUgOHptMCAxNC4wMDZMOC40NzUgMTloLTIuOTQ3VjZIN3Y0aDR2OS45OTZ6TTggNGgyLjk5NkwxNiA5LjAxVjQudjB6Ii8+PC9zdmc+'; // Icône de document SVG basique
        }

        iconElement.src = itemIconSrc;
        iconElement.alt = item.name;

        const nameElement = document.createElement('span');
        nameElement.textContent = item.name;

        itemElement.appendChild(iconElement);
        itemElement.appendChild(nameElement);

        mainContentArea.appendChild(itemElement);

        // Ajouter un écouteur d'événement pour ouvrir l'élément
        itemElement.addEventListener('dblclick', () => {
            if (item.type === 'image') {
                openImageViewer(item.src); // Ouvre la fenêtre d'affichage d'image
            } else if (item.type === 'app') {
                const targetWindow = document.getElementById(item.targetWindowId);
                if (targetWindow) {
                    openWindow(targetWindow); // Ouvre la fenêtre de l'application
                }
            }
        });
    });
}

// Fonction pour ouvrir une fenêtre d'affichage d'image
function openImageViewer(imageSrc) {
    // Créer une nouvelle fenêtre (peut-être en clonant un modèle caché ou en générant HTML)
    const viewerWindowId = 'imageViewer-' + Date.now(); // ID unique
    const viewerWindowHtml = `
        <div class="window image-viewer-window" id="${viewerWindowId}">
            <div class="window-header">
                <div class="window-title">${imageSrc}</div>
                <div class="window-controls">
                    <button class="window-minimize">-</button>
                    <button class="window-maximize">□</button>
                    <button class="window-close">×</button>
                </div>
            </div>
            <div class="window-content image-viewer-content">
                <img src="${imageSrc}" alt="${imageSrc}">
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', viewerWindowHtml);

    const newViewerWindow = document.getElementById(viewerWindowId);
    openWindow(newViewerWindow); // Utilise la fonction d'ouverture de fenêtre existante

    // Rendre la nouvelle fenêtre interactive (drag, redimensionnement, boutons)
    makeWindowInteractive(newViewerWindow);
}

// Fonction pour rendre une fenêtre interactive (déplacement, boutons, etc.)
function makeWindowInteractive(windowElement) {
     const header = windowElement.querySelector('.window-header');
     const minimizeBtn = windowElement.querySelector('.window-minimize');
     const maximizeBtn = windowElement.querySelector('.window-maximize');
     const closeBtn = windowElement.querySelector('.window-close');

     // Glisser-déposer
     let isDragging = false;
     let currentX;
     let currentY;
     let initialX;
     let initialY;
     let xOffset = 0;
     let yOffset = 0;

     header.addEventListener('mousedown', dragStart);
     document.addEventListener('mousemove', drag);
     document.addEventListener('mouseup', dragEnd);

     function dragStart(e) {
         initialX = e.clientX - xOffset;
         initialY = e.clientY - yOffset;

         // Vérifier que le clic est sur le header ou un de ses enfants (mais pas les boutons de contrôle)
         const clickedControl = e.target.closest('.window-controls button');
         if ((e.target === header || header.contains(e.target)) && !clickedControl) {
             isDragging = true;
             windowElement.classList.add('dragging'); // Ajouter la classe dragging
             bringWindowToFront(windowElement); // Mettre au premier plan au début du glisser
         }
     }

     function drag(e) {
         if (isDragging) {
             e.preventDefault();
             currentX = e.clientX - initialX;
             currentY = e.clientY - initialY;

             xOffset = currentX;
             yOffset = currentY;

             setTranslate(currentX, currentY, windowElement);
         }
     }

     function dragEnd(e) {
         initialX = currentX;
         initialY = currentY;
         isDragging = false;
         windowElement.classList.remove('dragging'); // Retirer la classe dragging
     }

      function setTranslate(xPos, yPos, el) {
         el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
     }

    // Gestion des boutons de contrôle
    if(minimizeBtn) {
        minimizeBtn.addEventListener('click', () => {
            windowElement.classList.toggle('minimized');
            bringWindowToFront(windowElement); // Mettre au premier plan si on clique dessus même si minimisé
        });
    }

     if(maximizeBtn) {
        maximizeBtn.addEventListener('click', () => {
            windowElement.classList.toggle('maximized');
            bringWindowToFront(windowElement); // Mettre au premier plan
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            // Retirer l'élément de la barre des tâches
            const taskbarItem = document.querySelector(`.taskbar-item[data-target='${windowElement.id}']`);
            if(taskbarItem) {
                taskbarItem.remove();
            }
            // Retirer la fenêtre elle-même du DOM
            windowElement.remove();
        });
    }

     // Mettre la fenêtre au premier plan lorsqu'on clique n'importe où dessus
    windowElement.addEventListener('mousedown', () => { bringWindowToFront(windowElement); });

}

// Gestion du menu Démarrer
const startButton = document.querySelector('.start-button');
const startMenu = document.getElementById('startMenu');
const taskbarItemsContainer = document.querySelector('.taskbar-items');

startButton.addEventListener('click', (e) => {
     e.stopPropagation(); // Empêche le clic de se propager et de fermer le menu immédiatement
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', (e) => {
    // Fermer le menu si on clique en dehors du bouton et du menu
    if (!startMenu.contains(e.target) && e.target !== startButton) {
        startMenu.style.display = 'none';
    }
});

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-target');
        const targetWindow = document.getElementById(targetId);

        if (targetWindow) {
            openWindow(targetWindow); // Utilise la fonction openWindow
        }

        startMenu.style.display = 'none'; // Cacher le menu après la sélection
    });
});

// Fonction pour ouvrir et gérer une fenêtre (appelle makeWindowInteractive)
function openWindow(windowElement) {
    windowElement.style.display = 'block'; // Afficher la fenêtre
    bringWindowToFront(windowElement);
    createOrUpdateTaskbarItem(windowElement);

     // Si c'est la fenêtre Finder, afficher le contenu initial (dossier Baget)
    if (windowElement.id === 'finderWindow') {
        displayFolderContent('Baget');
        // Sélectionner le premier élément de la sidebar par défaut
        const sidebarItems = windowElement.querySelectorAll('.finder-sidebar li');
        if(sidebarItems.length > 0) {
             sidebarItems[0].classList.add('selected');
             // Ajouter l'écouteur de clic pour le dossier Baget (ou le premier par défaut)
             // Il faut peut-être retirer l'ancien écouteur si la fenêtre est rouverte
             // Pour simplifier, on peut réattacher les écouteurs ici ou s'assurer qu'ils ne sont attachés qu'une fois
             // Actuellement, les écouteurs pour Finder sont attachés lors de l'affichage du contenu.
             // On s'assure ici que le contenu est affiché au premier plan quand la fenêtre Finder s'ouvre.

              // Ajouter l'écouteur de clic au premier élément (Images / Baget)
             sidebarItems[0].onclick = () => {
                 sidebarItems.forEach(item => item.classList.remove('selected'));
                 sidebarItems[0].classList.add('selected');
                 displayFolderContent('Baget'); // Afficher le contenu du dossier Baget
             };
        }
    } else if (windowElement.id === 'snakeWindow') {
        // Initialiser le Snake Game quand la fenêtre s'ouvre
        initSnakeGame();
    } else if (windowElement.id === 'calculatorWindow') {
         // Initialiser la Calculatrice quand la fenêtre s'ouvre
         initCalculator();
    } else if (windowElement.id === 'diceRollerWindow') {
        initDiceRoller();
    } else if (windowElement.id === 'randomFactWindow') {
        initRandomFact();
    } else if (windowElement.id === 'simpleTimerWindow') {
        initSimpleTimer();
    }

     // Ajouter des écouteurs de clic aux autres éléments de la sidebar si nécessaire (pour d'autres dossiers)
     // ... votre logique pour d'autres dossiers ...

}

// Fonction pour mettre une fenêtre au premier plan
function bringWindowToFront(windowElement) {
    let maxZIndex = 0;
    document.querySelectorAll('.window').forEach(win => {
        // Ne pas changer le z-index si la fenêtre est déjà au premier plan
        if (win === windowElement) return;

        const zIndex = parseInt(win.style.zIndex) || 0;
        if (zIndex > maxZIndex) {
            maxZIndex = zIndex;
        }
        // Désactiver l'état actif sur tous les éléments de la barre de tâches
        const taskbarItem = document.querySelector(`.taskbar-item[data-target='${win.id}']`);
        if(taskbarItem) {
            taskbarItem.classList.remove('active');
        }
    });

     // Éviter de définir un z-index inférieur ou égal au max existant
     const currentZIndex = parseInt(windowElement.style.zIndex) || 0;
     // Si la fenêtre actuelle n'est pas déjà la plus haute, ou si son z-index est inférieur ou égal au max trouvé
     if (currentZIndex <= maxZIndex || windowElement.style.zIndex === '') {
         windowElement.style.zIndex = maxZIndex + 1; // Mettre la fenêtre actuelle au premier plan
     }

    // Marquer l'élément de la barre des tâches correspondant comme actif
    const currentTaskbarItem = document.querySelector(`.taskbar-item[data-target='${windowElement.id}']`);
    if(currentTaskbarItem) {
        currentTaskbarItem.classList.add('active');
    }
}

// Fonction pour créer ou mettre à jour un élément dans la barre des tâches
function createOrUpdateTaskbarItem(windowElement) {
    const windowId = windowElement.id;
    let taskbarItem = document.querySelector(`.taskbar-item[data-target='${windowId}']`);

    if (!taskbarItem) {
        taskbarItem = document.createElement('div');
        taskbarItem.classList.add('taskbar-item');
        taskbarItem.setAttribute('data-target', windowId);
        taskbarItem.textContent = windowElement.querySelector('.window-title').textContent; // Utilise le titre de la fenêtre
        taskbarItemsContainer.appendChild(taskbarItem);

        taskbarItem.addEventListener('click', () => {
            if (windowElement.style.display === 'none' || windowElement.classList.contains('minimized')) {
                // Si la fenêtre est cachée ou minimisée, l'afficher/restaurer
                windowElement.style.display = 'block';
                windowElement.classList.remove('minimized');
                 // Réinitialiser la position si elle a été minimisée (optionnel)
                 // if (windowElement._originalPosition) {
                 //      setTranslate(windowElement._originalPosition.x, windowElement._originalPosition.y, windowElement);
                 // }
            }
            bringWindowToFront(windowElement); // Toujours la mettre au premier plan
        });

        // La suppression de l'élément de la barre des tâches est gérée dans l'écouteur du bouton Fermer de makeWindowInteractive
    }
     // Si l'élément existe déjà, on s'assure qu'il est visible (utile si la fenêtre était juste cachée)
     taskbarItem.style.display = 'flex';
}

// Fonction pour mettre à jour l'heure
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    const timeElement = document.getElementById('currentTime');
    if (timeElement) {
        timeElement.textContent = timeString;
    }
}

// Mettre à jour l'heure toutes les secondes
setInterval(updateClock, 1000);

// Initialiser l'affichage de l'heure au chargement de la page
updateClock();

// Initialiser les positions et z-index des fenêtres et les rendre interactives
document.querySelectorAll('.window').forEach((window, index) => {
    window.style.position = 'fixed';
    // Positionner les fenêtres de manière aléatoire ou en cascade
    const top = 100 + Math.random() * 100;
    const left = 100 + Math.random() * 100;
    window.style.top = `${top}px`;
    window.style.left = `${left}px`;
    window.style.zIndex = 10 + index; // Assurer un z-index initial

    // Cacher toutes les fenêtres initialement sauf celles qui doivent apparaître au démarrage
    const windowsToShowOnLoad = ['bagetExplorerWindow', 'specialVideoWindow'];
    if (!windowsToShowOnLoad.includes(window.id)) {
        window.style.display = 'none';
    }

     // Rendre chaque fenêtre interactive
     makeWindowInteractive(window);
});

// Ouvrir les fenêtres qui doivent apparaître au démarrage et les mettre au premier plan
// Cette boucle est maintenant redondante car openWindow est appelée dans l'initialisation si la fenêtre doit s'afficher
/*
['bagetExplorerWindow', 'specialVideoWindow'].forEach(windowId => {
     const windowElement = document.getElementById(windowId);
     if(windowElement) {
         openWindow(windowElement);
     }
});
*/

// La boucle ci-dessus était commentée, la rétablir pour ouvrir les fenêtres au chargement
['bagetExplorerWindow', 'specialVideoWindow'].forEach(windowId => {
     const windowElement = document.getElementById(windowId);
     if(windowElement) {
         openWindow(windowElement);
     }
});

// Afficher le bouton Démarrer/Apple par défaut
startButton.style.display = 'block';

// Gestion de la recherche dans Baget Exploreur
document.querySelectorAll('#bagetExplorerWindow').forEach(browserWindow => {
    const searchInput = browserWindow.querySelector('.search-input');
    const iframe = browserWindow.querySelector('iframe');

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = searchInput.value;
            if (searchTerm) {
                // Construire l'URL de recherche Google
                const googleSearchUrl = `https://www.google.com/search?igu=1&ei=&q=${encodeURIComponent(searchTerm)}`;
                iframe.src = googleSearchUrl;
            }
        }
    });
});

// Logique du Snake Game
let gameLoop = null;
let snake = [];
let food = {};
let dx = 0;
let dy = 0;
let score = 0;

function initSnakeGame() {
    const canvas = document.getElementById('snakeCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const gridSize = 20;
    const tileCount = canvas.width / gridSize;

    // Réinitialiser le jeu
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    document.getElementById('snakeScore').textContent = score;

    function drawSnake() {
        ctx.fillStyle = '#4CAF50';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
        });
    }

    function drawFood() {
        ctx.fillStyle = '#FF5722';
        ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
    }

    function moveSnake() {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            document.getElementById('snakeScore').textContent = score;
            generateFood();
        } else {
            snake.pop();
        }
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };
        // Vérifier que la nourriture n'apparaît pas sur le serpent
        while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
            food = {
                x: Math.floor(Math.random() * tileCount),
                y: Math.floor(Math.random() * tileCount)
            };
        }
    }

    function checkCollision() {
        const head = snake[0];
        if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
            return true;
        }
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        return false;
    }

    function gameOver() {
        clearInterval(gameLoop);
        gameLoop = null;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '30px Comic Sans MS';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2);
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveSnake();
        if (checkCollision()) {
            gameOver();
            return;
        }
        drawFood();
        drawSnake();
    }

    // Gestion des touches pour le Snake
    function handleKeyPress(e) {
        if (!gameLoop) return;
        
        switch(e.key) {
            case 'ArrowUp':
                if (dy !== 1) { dx = 0; dy = -1; }
                break;
            case 'ArrowDown':
                if (dy !== -1) { dx = 0; dy = 1; }
                break;
            case 'ArrowLeft':
                if (dx !== 1) { dx = -1; dy = 0; }
                break;
            case 'ArrowRight':
                if (dx !== -1) { dx = 1; dy = 0; }
                break;
        }
    }

    // Démarrer le jeu
    if (!gameLoop) {
        document.addEventListener('keydown', handleKeyPress);
        gameLoop = setInterval(update, 100);
    }
}

// Ajouter un écouteur pour démarrer le jeu quand la fenêtre Snake est ouverte
document.getElementById('snakeWindow').addEventListener('click', () => {
    if (!gameLoop) {
        initSnakeGame();
    }
});

// Bloc-notes de Baget
const bagetNotes = document.getElementById('bagetNotes');
bagetNotes.addEventListener('input', (e) => {
    const text = e.target.value;
    const baguetteText = text.split('').map(char => {
        if (char === ' ') return ' ';
        return '🥖';
    }).join('');
    e.target.value = baguetteText;
});

// Logique de la calculatrice
let calculatorInitialized = false; // Drapeau pour vérifier si la calculatrice est initialisée

function initCalculator() {
    if (calculatorInitialized) return; // Ne pas initialiser si déjà fait

    const calculatorWindow = document.getElementById('calculatorWindow');
    if (!calculatorWindow) return;

    const display = calculatorWindow.querySelector('.calculator-display');
    const buttons = calculatorWindow.querySelectorAll('.calculator-buttons .btn');

    let currentInput = '0';
    let firstOperand = null;
    let operator = null;
    let waitingForSecondOperand = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function inputNumber(number) {
        if (waitingForSecondOperand) {
            currentInput = number;
            waitingForSecondOperand = false;
        } else {
            currentInput = currentInput === '0' ? number : currentInput + number;
        }
    }

    function inputDecimal() {
        if (waitingForSecondOperand) {
            currentInput = '0.';
            waitingForSecondOperand = false;
            return;
        }
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && waitingForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            currentInput = String(result);
            firstOperand = result;
        }

        waitingForSecondOperand = true;
        operator = nextOperator;
    }

    const performCalculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
    };

    function handleEquals() {
        const inputValue = parseFloat(currentInput);

        if (firstOperand === null || operator === null) {
            return;
        }

        const result = performCalculation[operator](firstOperand, inputValue);
        currentInput = String(result);
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }

    function resetCalculator() {
        currentInput = '0';
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
    }

    // Ajouter les écouteurs d'événements aux boutons
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('number')) {
                inputNumber(value);
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.classList.contains('decimal')) {
                inputDecimal();
            } else if (button.classList.contains('clear')) {
                resetCalculator();
            } else if (button.classList.contains('equals')) {
                handleEquals();
            }
            updateDisplay();
        });
    });

    // Initialiser l'affichage
    updateDisplay();

    calculatorInitialized = true; // Marquer comme initialisé
}

// Initialiser la calculatrice quand la fenêtre est ouverte
document.getElementById('calculatorWindow').addEventListener('click', () => {
    initCalculator();
});

// Logique du changement de fond d'écran
const body = document.body;
const setBeigeButton = document.getElementById('setBeigeBackground');
const setImageButton = document.getElementById('setImageBackground');

if (setBeigeButton && setImageButton) {
    setBeigeButton.addEventListener('click', () => {
        body.classList.remove('background-image');
        body.style.background = 'linear-gradient(135deg, #e5d3b3, #c4a484)'; // Appliquer le dégradé beige
    });

    setImageButton.addEventListener('click', () => {
        body.style.background = ''; // Réinitialiser le style background pour laisser la classe prendre le dessus
        body.classList.add('background-image'); // Appliquer la classe avec l'image de fond
    });
}

// Rendre la fenêtre des paramètres de fond interactive (déjà géré par makeWindowInteractive)
// makeWindowInteractive(document.getElementById('backgroundSettingsWindow')); 

// Logique des paramètres
const toggleDarkModeButton = document.getElementById('toggleDarkMode');
const toggleSimpleDisplayButton = document.getElementById('toggleSimpleDisplay');
const mainContainer = document.querySelector('.container'); // Le conteneur principal du site

if (toggleDarkModeButton) {
    toggleDarkModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

if (toggleSimpleDisplayButton && mainContainer) {
    toggleSimpleDisplayButton.addEventListener('click', () => {
        mainContainer.classList.toggle('hidden'); // Nous devrons ajouter une classe CSS 'hidden'
    });
}

// Logique de la fenêtre de dessin
const drawingWindow = document.getElementById('drawingWindow');
const drawingCanvas = document.getElementById('drawingCanvas');
const ctx = drawingCanvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentTool = 'brush';
let history = [];
let historyIndex = -1;
let isGridVisible = false;
let isSymmetryEnabled = false;

// Initialiser le canvas
function initDrawingCanvas() {
    // Ajuster la taille du canvas à la fenêtre
    function resizeCanvas() {
        const container = drawingCanvas.parentElement;
        const containerWidth = container.clientWidth - 20;
        const containerHeight = container.clientHeight - 20;
        drawingCanvas.width = containerWidth;
        drawingCanvas.height = containerHeight;
        
        // Redessiner le contenu après le redimensionnement
        if (history.length > 0) {
            ctx.putImageData(history[historyIndex], 0, 0);
        }
    }

    // Initialiser le canvas
    resizeCanvas();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';

    // Sauvegarder l'état initial
    saveState();

    // Écouter le redimensionnement de la fenêtre
    window.addEventListener('resize', resizeCanvas);
}

// Sauvegarder l'état du canvas
function saveState() {
    history = history.slice(0, historyIndex + 1);
    history.push(ctx.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height));
    historyIndex++;
}

// Annuler
function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        ctx.putImageData(history[historyIndex], 0, 0);
    }
}

// Rétablir
function redo() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        ctx.putImageData(history[historyIndex], 0, 0);
    }
}

// Gestion des outils
function setTool(tool) {
    currentTool = tool;
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.tool === tool);
    });
}

// Dessiner avec l'outil actuel
function draw(e) {
    if (!isDrawing) return;

    const rect = drawingCanvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();

    switch (currentTool) {
        case 'brush':
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            if (isSymmetryEnabled) {
                const centerX = drawingCanvas.width / 2;
                ctx.moveTo(2 * centerX - lastX, lastY);
                ctx.lineTo(2 * centerX - x, y);
                ctx.stroke();
            }
            break;

        case 'eraser':
            ctx.globalCompositeOperation = 'destination-out';
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.globalCompositeOperation = 'source-over';
            break;

        case 'line':
            // Effacer le trait temporaire
            ctx.putImageData(history[historyIndex], 0, 0);
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            break;

        case 'circle':
            ctx.putImageData(history[historyIndex], 0, 0);
            const radius = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
            ctx.beginPath();
            ctx.arc(lastX, lastY, radius, 0, Math.PI * 2);
            ctx.stroke();
            break;

        case 'rectangle':
            ctx.putImageData(history[historyIndex], 0, 0);
            ctx.beginPath();
            ctx.rect(lastX, lastY, x - lastX, y - lastY);
            ctx.stroke();
            break;
    }

    lastX = x;
    lastY = y;
}

// Remplissage
function floodFill(startX, startY, fillColor) {
    const imageData = ctx.getImageData(0, 0, drawingCanvas.width, drawingCanvas.height);
    const pixels = imageData.data;
    const startPos = (startY * drawingCanvas.width + startX) * 4;
    const startR = pixels[startPos];
    const startG = pixels[startPos + 1];
    const startB = pixels[startPos + 2];
    const startA = pixels[startPos + 3];

    function matchesStart(pos) {
        return pixels[pos] === startR &&
               pixels[pos + 1] === startG &&
               pixels[pos + 2] === startB &&
               pixels[pos + 3] === startA;
    }

    const stack = [[startX, startY]];
    while (stack.length) {
        const [x, y] = stack.pop();
        const pos = (y * drawingCanvas.width + x) * 4;

        if (x < 0 || x >= drawingCanvas.width || y < 0 || y >= drawingCanvas.height || !matchesStart(pos)) {
            continue;
        }

        pixels[pos] = fillColor.r;
        pixels[pos + 1] = fillColor.g;
        pixels[pos + 2] = fillColor.b;
        pixels[pos + 3] = fillColor.a;

        stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    ctx.putImageData(imageData, 0, 0);
}

// Événements du canvas
drawingCanvas.addEventListener('mousedown', startDrawing);
drawingCanvas.addEventListener('mousemove', draw);
drawingCanvas.addEventListener('mouseup', stopDrawing);
drawingCanvas.addEventListener('mouseout', stopDrawing);

// Support tactile
drawingCanvas.addEventListener('touchstart', startDrawing);
drawingCanvas.addEventListener('touchmove', draw);
drawingCanvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    const rect = drawingCanvas.getBoundingClientRect();
    lastX = (e.clientX || e.touches[0].clientX) - rect.left;
    lastY = (e.clientY || e.touches[0].clientY) - rect.top;

    if (currentTool === 'fill') {
        const fillColor = hexToRgb(document.getElementById('strokeColor').value);
        floodFill(Math.floor(lastX), Math.floor(lastY), fillColor);
        saveState();
    }
}

function stopDrawing() {
    if (isDrawing) {
        isDrawing = false;
        if (['line', 'circle', 'rectangle'].includes(currentTool)) {
            saveState();
        }
    }
}

// Utilitaires
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: 255
    } : null;
}

// Initialisation des contrôles
document.querySelectorAll('.tool-btn').forEach(btn => {
    btn.addEventListener('click', () => setTool(btn.dataset.tool));
});

document.getElementById('strokeColor').addEventListener('input', (e) => {
    ctx.strokeStyle = e.target.value;
});

document.getElementById('strokeSize').addEventListener('input', (e) => {
    ctx.lineWidth = e.target.value;
});

document.getElementById('opacity').addEventListener('input', (e) => {
    ctx.globalAlpha = e.target.value / 100;
});

document.getElementById('blendMode').addEventListener('change', (e) => {
    ctx.globalCompositeOperation = e.target.value;
});

document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    saveState();
});

document.getElementById('saveCanvas').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'dessin-baget.png';
    link.href = drawingCanvas.toDataURL();
    link.click();
});

document.getElementById('undoCanvas').addEventListener('click', undo);
document.getElementById('redoCanvas').addEventListener('click', redo);

document.getElementById('toggleGrid').addEventListener('click', (e) => {
    isGridVisible = !isGridVisible;
    e.target.classList.toggle('active');
    const grid = document.querySelector('.canvas-grid');
    if (grid) {
        grid.style.display = isGridVisible ? 'block' : 'none';
    }
});

document.getElementById('toggleSymmetry').addEventListener('click', (e) => {
    isSymmetryEnabled = !isSymmetryEnabled;
    e.target.classList.toggle('active');
    const symmetry = document.querySelector('.canvas-symmetry');
    if (symmetry) {
        symmetry.style.display = isSymmetryEnabled ? 'block' : 'none';
    }
});

// Initialiser le canvas quand la fenêtre est ouverte
drawingWindow.addEventListener('click', () => {
    if (!drawingCanvas.width) {
        initDrawingCanvas();
    }
});

// Logique de la langue
const translations = {
    'fr': {
        'window1Title': 'MDR vidéos #1',
        'window2Title': 'MDR vidéos #2',
        'clockWindowTitle': 'Horloge',
        'channelWindow1Title': 'Chaîne YouTube 1',
        'channelWindow2Title': 'Chaîne YouTube 2',
        'bagetExplorerWindowTitle': 'Baget Exploreur',
        'finderWindowTitle': 'Finder',
        'specialVideoWindowTitle': 'Vidéo Spéciale !',
        'calculatorWindowTitle': 'Calculatrice',
        'backgroundSettingsWindowTitle': 'Paramètres du Fond d\'écran',
        'settingsWindowTitle': 'Paramètres',
        'aboutWindowTitle': 'À propos',
        'drawingWindowTitle': 'Dessin',
        'startButtonText': '🥖Démarrer',
        'effectButtonText': 'Effet Visuel !',
        'danceButtonText': 'Faire danser l\'image !',
        'backgroundSettingsTitle': 'Choisir un fond d\'écran',
        'beigeBackgroundButtonText': 'Fond Beige',
        'imageBackgroundButtonText': 'Fond Image (back.jpg)',
        'settingsTitle': 'Paramètres',
        'appearanceSettingsTitle': 'Apparence',
        'darkModeButtonText': 'Mode Sombre',
        'simpleDisplayButtonText': 'Affichage Simple',
        'languageSettingsTitle': 'Langue',
        'aboutTitle': 'À propos de Baget OS',
        'aboutText1': 'Ce site a été codé par glownydev pour Noé.',
        'aboutText2': 'Il adore les baguettes, du coup je lui ai fait un OS de Baget mdr.',
        'aboutText3': '' // Laisser la troisième ligne vide ou la supprimer si elle n'est plus nécessaire
    },
    'baget': {
        'window1Title': '🥖 vidéos #1',
        'window2Title': '🥖 vidéos #2',
        'clockWindowTitle': '🥖',
        'channelWindow1Title': '🥖 Tube 1',
        'channelWindow2Title': '🥖 Tube 2',
        'bagetExplorerWindowTitle': '🥖 Exploreur',
        'finderWindowTitle': '🥖 Finder',
        'specialVideoWindowTitle': '🥖 Spéciale !',
        'calculatorWindowTitle': '🥖 Calc',
        'backgroundSettingsWindowTitle': '🥖 Fond',
        'settingsWindowTitle': '🥖🥖',
        'aboutWindowTitle': '🥖 propos 🥖 OS',
        'drawingWindowTitle': '🥖 Dessin',
        'startButtonText': '🥖🥖🥖',
        'effectButtonText': '🥖 Visuel !',
        'danceButtonText': '🥖 danser 🥖 ! ',
        'backgroundSettingsTitle': '🥖 un 🥖',
        'beigeBackgroundButtonText': '🥖 Beige',
        'imageBackgroundButtonText': '🥖 Image (🥖.jpg)',
        'settingsTitle': '🥖🥖',
        'appearanceSettingsTitle': '🥖rence',
        'darkModeButtonText': '🥖 Sombre',
        'simpleDisplayButtonText': '🥖 Simple',
        'languageSettingsTitle': '🥖gue',
        'aboutTitle': '🥖 🥖 🥖 OS',
        'aboutText1': '🥖 site 🥖 codé par glownydev pour Noé.',
        'aboutText2': 'Il 🥖 les baguettes, 🥖 coup 🥖 lui 🥖 fait 🥖 OS de Baget mdr.',
        'aboutText3': ''
    }
};

function applyLanguage(lang) {
    const elementsToTranslate = {
        '.window-title': 'WindowTitle',
        '.start-button': 'startButtonText',
        '.boutons-container .bouton-rigolo:nth-child(1)': 'effectButtonText', // Premier bouton rigolo
        '.boutons-container .bouton-rigolo:nth-child(2)': 'danceButtonText', // Deuxième bouton rigolo
        '#backgroundSettingsWindow h2': 'backgroundSettingsTitle',
        '#setBeigeBackground': 'beigeBackgroundButtonText',
        '#setImageBackground': 'imageBackgroundButtonText',
        '#settingsWindow h2': 'settingsTitle',
        '#settingsWindow .setting-section:nth-child(1) h3': 'appearanceSettingsTitle', // Titre Apparence
        '#toggleDarkMode': 'darkModeButtonText',
        '#toggleSimpleDisplay': 'simpleDisplayButtonText',
        '#settingsWindow .setting-section:nth-child(2) h3': 'languageSettingsTitle', // Titre Langue
        '#aboutWindow h2': 'aboutTitle',
        '#aboutWindow p:nth-of-type(1)': 'aboutText1',
        '#aboutWindow p:nth-of-type(2)': 'aboutText2',
        '#aboutWindow p:nth-of-type(3)': 'aboutText3'
    };

    // Traduire les éléments simples par leur sélecteur
    for (const selector in elementsToTranslate) {
        const element = document.querySelector(selector);
        if (element) {
             const key = elementsToTranslate[selector];
             // Utilise le texte du bouton si l'élément est un bouton, sinon textContent
             if (element.tagName === 'BUTTON') {
                element.textContent = translations[lang][key];
             } else {
                element.textContent = translations[lang][key];
             }

             // Cas particulier pour le titre de la barre des tâches qui est créé dynamiquement
             // Mettre à jour le texte de l'élément de la barre des tâches si la fenêtre correspondante est ouverte
             const windowId = element.closest('.window') ? element.closest('.window').id : null;
             if (windowId) {
                  const taskbarItem = document.querySelector(`.taskbar-item[data-target='${windowId}']`);
                  if(taskbarItem) {
                       // On utilise le texte du titre de la fenêtre comme texte de la barre des tâches
                       taskbarItem.textContent = translations[lang][windowId + 'Title'];
                  }
             }
        }
    }

    // Traduire les titres des fenêtres dans la barre des tâches (qui sont créés dynamiquement)
     document.querySelectorAll('.taskbar-item').forEach(item => {
         const targetWindowId = item.getAttribute('data-target');
         if (translations[lang][targetWindowId + 'Title']) {
             item.textContent = translations[lang][targetWindowId + 'Title'];
         }
     });

     // Traduire les éléments du menu Démarrer
     document.querySelectorAll('.start-menu .menu-item').forEach(item => {
         const targetWindowId = item.getAttribute('data-target');
         if (translations[lang][targetWindowId + 'Title']) {
             item.textContent = translations[lang][targetWindowId + 'Title'];
         }
     });
}

// Ajouter les écouteurs d'événements aux boutons de langue
const setFrenchButton = document.getElementById('setFrenchLanguage');
const setBagetButton = document.getElementById('setBagetLanguage');

if (setFrenchButton && setBagetButton) {
    setFrenchButton.addEventListener('click', () => {
        applyLanguage('fr');
    });

    setBagetButton.addEventListener('click', () => {
        applyLanguage('baget');
    });
}

// Appliquer la langue par défaut au chargement de la page (Français)
applyLanguage('fr');

// --- Gestion des Applications et App Store ---

// Définition de toutes les applications disponibles
const availableApps = [
    // Catégorie Système
    { id: 'finderWindow', name: 'Finder', icon: 'icon-finder.png', targetWindowId: 'finderWindow', category: 'Système' },
    { id: 'clockWindow', name: 'Horloge', icon: 'icon-clock.png', targetWindowId: 'clockWindow', category: 'Système' },
    { id: 'settingsWindow', name: 'Paramètres', icon: 'icon-settings.png', targetWindowId: 'settingsWindow', category: 'Système' },
    { id: 'backgroundSettingsWindow', name: 'Fond d\'écran', icon: 'icon-background.png', targetWindowId: 'backgroundSettingsWindow', category: 'Système' },
    { id: 'appStoreWindow', name: 'Baget App Store', icon: 'icon-appstore.png', targetWindowId: 'appStoreWindow', category: 'Système' },
    { id: 'aboutWindow', name: 'À propos', icon: 'icon-about.png', targetWindowId: 'aboutWindow', category: 'Système' },

    // Catégorie Divertissement
    { id: 'window1', name: 'MDR vidéos #1', icon: 'icon-video.png', targetWindowId: 'window1', category: 'Divertissement' },
    { id: 'window2', name: 'MDR vidéos #2', icon: 'icon-video.png', targetWindowId: 'window2', category: 'Divertissement' },
    { id: 'specialVideoWindow', name: 'Vidéo Spéciale !', icon: 'icon-special.png', targetWindowId: 'specialVideoWindow', category: 'Divertissement' },
    { id: 'snakeWindow', name: 'Snake Game', icon: 'icon-snake.png', targetWindowId: 'snakeWindow', category: 'Divertissement' },
    { id: 'drawingWindow', name: 'Dessin', icon: 'icon-drawing.png', targetWindowId: 'drawingWindow', category: 'Divertissement' },
    { id: 'diceRollerWindow', name: 'Lanceur de Dés', icon: 'icon-dice.png', targetWindowId: 'diceRollerWindow', category: 'Divertissement' },
    { id: 'randomFactWindow', name: 'Fait Aléatoire', icon: 'icon-fact.png', targetWindowId: 'randomFactWindow', category: 'Divertissement' },

    // Catégorie Outils
    { id: 'simpleTimerWindow', name: 'Minuteur Simple', icon: 'icon-timer.png', targetWindowId: 'simpleTimerWindow', category: 'Outils' },
    { id: 'calculatorWindow', name: 'Calculatrice', icon: 'icon-calculator.png', targetWindowId: 'calculatorWindow', category: 'Outils' },
    { id: 'bagetNotesWindow', name: 'Bloc-notes de Baget', icon: 'bagetnote.png', targetWindowId: 'bagetNotesWindow', category: 'Outils' },
    { id: 'bagetExplorerWindow', name: 'Baget Exploreur', icon: 'baget.png', targetWindowId: 'bagetExplorerWindow', category: 'Outils' }
];

// Applications installées par défaut (IDs des apps système)
let installedApps = availableApps.filter(app => app.category === 'Système').map(app => app.id);

// Fonction pour rendre le menu Démarrer
function renderStartMenu() {
    const startMenuList = document.getElementById('startMenu').querySelector('ul');
    if (!startMenuList) return; // S'assurer que l'élément existe
    
    startMenuList.innerHTML = ''; // Vider le menu actuel

    // Grouper les applications installées par catégorie
    const installedAppsByCategory = installedApps.reduce((acc, appId) => {
        const app = availableApps.find(a => a.id === appId);
        if (app && app.category) { // S'assurer que l'application et la catégorie existent
            if (!acc[app.category]) {
                acc[app.category] = [];
            }
            acc[app.category].push(app);
        }
        return acc;
    }, {});

    // Rendre les catégories triées (optionnel) et les applications dans le menu
    const sortedCategories = Object.keys(installedAppsByCategory).sort();

    sortedCategories.forEach(category => {
        // Ajouter le titre de la catégorie
        const categoryHeader = document.createElement('li');
        categoryHeader.classList.add('menu-category-header'); // Ajouter une classe pour styliser
        categoryHeader.textContent = category; // Utilisez le nom de la catégorie
        startMenuList.appendChild(categoryHeader);

        // Ajouter les applications de cette catégorie (triées par nom optionnel)
        installedAppsByCategory[category].sort((a, b) => a.name.localeCompare(b.name)).forEach(app => {
             const listItem = document.createElement('li');
             const link = document.createElement('a');
             link.href = '#';
             link.classList.add('menu-item');
             link.setAttribute('data-target', app.targetWindowId);

             // Vous pouvez ajouter une icône ici si vous le souhaitez
             // const icon = document.createElement('img');
             // icon.src = app.icon || 'default-icon.png'; // Assurez-vous d'avoir une icône par défaut
             // icon.style.width = '16px'; // Ajustez la taille
             // icon.style.height = '16px';
             // icon.style.marginRight = '5px'; // Espace entre l'icône et le texte
             // link.appendChild(icon);

             link.textContent = app.name; // Le texte du lien est le nom de l'application

             listItem.appendChild(link);
             startMenuList.appendChild(listItem);

            // Ajouter l'écouteur d'événement pour ouvrir la fenêtre
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                const targetWindow = document.getElementById(targetId);
                if (targetWindow) {
                    openWindow(targetWindow);
                }
                document.getElementById('startMenu').style.display = 'none'; // Cacher le menu après l'ouverture
            });
        });
    });
    
    // S'assurer que les applications sans catégorie n'apparaissent pas ou sont gérées
    // Actuellement, elles seront ignorées par la logique de groupement.


}

// Fonction pour rendre la liste des applications dans l'App Store
function renderAppList() {
    const appListDiv = document.getElementById('appList');
    if (!appListDiv) return;

    appListDiv.innerHTML = ''; // Vider la liste actuelle

    availableApps.forEach(app => {
        const appItem = document.createElement('div');
        appItem.classList.add('app-item');

        const icon = document.createElement('img');
        // Utiliser une icône par défaut si celle spécifiée n'existe pas ou est manquante
        icon.src = app.icon || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTAgMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6bTMgMTVsLTRsLTN6bS0yLTIuMTVsLTIuODYtMi44NSA0LjkwNS00LjkxIDMuNjEgMy42LTIuNjY1IDIuNjZ6IiBmaWxsPSIjNTU1Ii8+PC9zdmc+';
        icon.alt = app.name;

        const nameSpan = document.createElement('span');
        nameSpan.textContent = app.name;

        const installButton = document.createElement('button');
        const isInstalled = installedApps.includes(app.id);
        installButton.classList.add('bouton-rigolo');
        installButton.textContent = isInstalled ? 'Ouvrir' : 'Installer';
        installButton.style.backgroundColor = isInstalled ? '#28a745' : ''; // Vert si installé

        // Ajouter un écouteur d'événement au bouton
        installButton.addEventListener('click', () => {
            if (isInstalled) {
                // Ouvrir l'application si déjà installée
                const targetWindow = document.getElementById(app.targetWindowId);
                 if (targetWindow) {
                    openWindow(targetWindow);
                }
                 // Fermer l'App Store après ouverture (optionnel)
                 // document.getElementById('appStoreWindow').style.display = 'none';

            } else {
                // Installer l'application
                installedApps.push(app.id);
                // Mettre à jour le bouton dans l'App Store
                installButton.textContent = 'Ouvrir';
                installButton.style.backgroundColor = '#28a745';
                // Régénérer le menu Démarrer
                renderStartMenu();
                // Stocker la liste des applications installées (dans le stockage local par exemple)
                // localStorage.setItem('installedApps', JSON.stringify(installedApps));
            }
        });

        appItem.appendChild(icon);
        appItem.appendChild(nameSpan);
        appItem.appendChild(installButton);

        appListDiv.appendChild(appItem);
    });
}

// --- Initialisation des nouvelles applications ---

// Lanceur de Dés
function initDiceRoller() {
    const rollButton = document.getElementById('rollDiceButton');
    const diceResult = document.getElementById('diceResult');
    if(rollButton && diceResult) {
        rollButton.addEventListener('click', () => {
            const result = Math.floor(Math.random() * 6) + 1;
            diceResult.textContent = result;
        });
    }
}

// Fait Aléatoire (exemples très simples, on pourrait utiliser une API si disponible)
const randomFacts = [
    "Une journée sur Vénus est plus longue qu'une année sur Vénus.",
    "Les fourmis peuvent porter 50 fois leur propre poids.",
    "Le miel ne se périme jamais.",
    "Les loutres de mer dorment en se tenant la patte."
];

function initRandomFact() {
    const factText = document.getElementById('randomFactText');
    const newFactButton = document.getElementById('newFactButton');
    if(factText && newFactButton) {
        function displayRandomFact() {
            const randomIndex = Math.floor(Math.random() * randomFacts.length);
            factText.textContent = randomFacts[randomIndex];
        }
        newFactButton.addEventListener('click', displayRandomFact);
        displayRandomFact(); // Afficher un fait au chargement
    }
}

// Minuteur Simple
let timerInterval;

function initSimpleTimer() {
    const timerInput = document.getElementById('timerInput');
    const timerDisplay = document.getElementById('timerDisplay');
    const startButton = document.getElementById('startTimerButton');
    const stopButton = document.getElementById('stopTimerButton');
    let timeLeft = 0;
    let isRunning = false;

    if (timerInput && timerDisplay && startButton && stopButton) {
        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        function startTimer() {
            if (isRunning) return;
            isRunning = true;
            timeLeft = parseInt(timerInput.value) || 0; // Utiliser la valeur de l'input
            if (timeLeft <= 0) { // Ne pas démarrer si le temps est <= 0
                 isRunning = false;
                 updateDisplay();
                 return;
            }
            updateDisplay();
            timerInterval = setInterval(() => {
                timeLeft--;
                updateDisplay();
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    isRunning = false;
                    // Alerte ou son à la fin du minuteur (optionnel)
                    alert("Temps écoulé !");
                }
            }, 1000);
        }

        function stopTimer() {
            clearInterval(timerInterval);
            isRunning = false;
             // Optionnel : réinitialiser l'affichage à l'input value après l'arrêt
             // timeLeft = parseInt(timerInput.value) || 0;
             // updateDisplay();
        }

        startButton.addEventListener('click', startTimer);
        stopButton.addEventListener('click', stopTimer);

        // Mettre à jour l'affichage quand l'input change
        timerInput.addEventListener('input', () => {
            if (!isRunning) { // Seulement si le minuteur n'est pas en cours
                timeLeft = parseInt(timerInput.value) || 0;
                updateDisplay();
            }
        });

        // Initialiser l'affichage avec la valeur par défaut de l'input
         timeLeft = parseInt(timerInput.value) || 0;
         updateDisplay();
    }
}

// --- Initialisation générale ---

// Initialiser l'App Store et le menu Démarrer au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    renderStartMenu();
    renderAppList();

    // Assurez-vous que les fonctions d'initialisation des nouvelles apps sont appelées quand leurs fenêtres s'ouvrent
    // Ceci est déjà géré dans la fonction openWindow si vous l'avez modifiée pour cela.
    // Sinon, ajoutez des appels ici ou dans openWindow :
    // openWindow(document.getElementById('diceRollerWindow')); // Exemple si vous voulez qu'elle s'ouvre au démarrage
}); 