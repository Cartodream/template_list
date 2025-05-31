/* Script pour les fonctionnalités du thème viking */

document.addEventListener('DOMContentLoaded', function() {
    // Ajouter des éléments décoratifs vikings
    addVikingDecorations();
    
    // Ajouter des animations aux éléments vikings
    initVikingAnimations();
    
    // Personnaliser les marqueurs de la carte avec un style viking
    customizeMapMarkers();
});

/**
 * Ajoute des éléments décoratifs vikings à la page
 */
function addVikingDecorations() {
    // Ajouter des boucliers décoratifs aux titres des sections
    const filterTitles = document.querySelectorAll('.filter-title');
    filterTitles.forEach(title => {
        title.classList.add('viking-shield');
    });
    
    // Ajouter un effet de parchemin aux popups
    const popupContent = document.querySelector('.leaflet-popup-content');
    if (popupContent) {
        popupContent.classList.add('viking-parchment');
    }
}

/**
 * Initialise les animations pour les éléments vikings
 */
function initVikingAnimations() {
    // Animation pour les boutons au survol
    const vikingButtons = document.querySelectorAll('.viking-button');
    vikingButtons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        });
    });
    
    // Animation pour les éléments avec des runes
    const runeElements = document.querySelectorAll('.viking-runes');
    runeElements.forEach(element => {
        element.addEventListener('mouseover', function() {
            // Afficher les runes avec une animation
            const runeSymbols = document.createElement('span');
            runeSymbols.className = 'rune-symbols';
            runeSymbols.textContent = 'ᚠᚢᚦᚨᚱᚲ';
            runeSymbols.style.position = 'absolute';
            runeSymbols.style.bottom = '-20px';
            runeSymbols.style.left = '50%';
            runeSymbols.style.transform = 'translateX(-50%)';
            runeSymbols.style.fontSize = '12px';
            runeSymbols.style.color = '#8B4513';
            runeSymbols.style.opacity = '0';
            runeSymbols.style.transition = 'all 0.3s ease';
            
            element.appendChild(runeSymbols);
            
            setTimeout(() => {
                runeSymbols.style.opacity = '1';
                runeSymbols.style.bottom = '-25px';
            }, 10);
        });
        
        element.addEventListener('mouseout', function() {
            const runeSymbols = element.querySelector('.rune-symbols');
            if (runeSymbols) {
                runeSymbols.style.opacity = '0';
                runeSymbols.style.bottom = '-20px';
                
                setTimeout(() => {
                    if (runeSymbols.parentNode === element) {
                        element.removeChild(runeSymbols);
                    }
                }, 300);
            }
        });
    });
}

/**
 * Personnalise les marqueurs de la carte avec un style viking
 */
function customizeMapMarkers() {
    // Cette fonction sera appelée après l'initialisation de la carte
    // On utilise un MutationObserver pour détecter quand les marqueurs sont ajoutés au DOM
    
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                const markers = document.querySelectorAll('.leaflet-marker-icon');
                markers.forEach(marker => {
                    if (!marker.classList.contains('viking-marker')) {
                        marker.classList.add('viking-marker');
                        
                        // Ajouter une bordure viking aux marqueurs
                        marker.style.border = '2px solid #8B4513';
                        marker.style.borderRadius = '50%';
                        marker.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
                    }
                });
            }
        });
    });
    
    // Observer le conteneur de la carte pour détecter les nouveaux marqueurs
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        observer.observe(mapContainer, { childList: true, subtree: true });
    }
}

// Fonction pour ajouter un effet de vague viking aux boutons
function addVikingWaveEffect() {
    const waveButtons = document.querySelectorAll('.viking-wave-button');
    waveButtons.forEach(button => {
        const waveElement = document.createElement('div');
        waveElement.className = 'viking-wave';
        waveElement.style.position = 'absolute';
        waveElement.style.bottom = '0';
        waveElement.style.left = '0';
        waveElement.style.width = '100%';
        waveElement.style.height = '5px';
        waveElement.style.backgroundImage = "url('image/viking-border.svg')";
        waveElement.style.backgroundSize = '100px 5px';
        waveElement.style.backgroundRepeat = 'repeat-x';
        waveElement.style.animation = 'viking-wave 2s linear infinite';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(waveElement);
    });
}

// Appeler cette fonction après le chargement de la page
window.addEventListener('load', function() {
    addVikingWaveEffect();
});