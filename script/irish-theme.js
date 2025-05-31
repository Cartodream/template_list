/**
 * Script pour les fonctionnalités du thème irlandais
 */
document.addEventListener('DOMContentLoaded', function() {
  // Cette fonction sera appelée uniquement quand le thème irlandais est actif
  function initIrishTheme() {
    // Ajouter des éléments décoratifs irlandais
    addIrishDecorations();
    
    // Ajouter des animations aux éléments irlandais
    initIrishAnimations();
  }
  
  /**
   * Ajoute des éléments décoratifs irlandais à la page
   */
  function addIrishDecorations() {
    // Ajouter la classe celtic-title aux titres des sections
    const filterTitles = document.querySelectorAll('.filter-title');
    filterTitles.forEach(title => {
      if (!title.classList.contains('celtic-title')) {
        title.classList.add('celtic-title');
      }
    });
    
    // Ajouter la classe irish-frame au logo
    const logo = document.querySelector('.logo');
    if (logo && !logo.classList.contains('irish-frame')) {
      logo.classList.add('irish-frame');
    }
    
    // Ajouter la classe irish-button aux boutons
    const buttons = document.querySelectorAll('.select-all, .deselect-all');
    buttons.forEach(button => {
      if (!button.classList.contains('irish-button')) {
        button.classList.add('irish-button');
      }
    });
    
    // Ajouter la classe shamrock-list aux options de filtres
    const filterOptions = document.querySelectorAll('.filter-options');
    filterOptions.forEach(options => {
      if (!options.classList.contains('shamrock-list')) {
        options.classList.add('shamrock-list');
      }
    });
    
    // Ajouter un séparateur celtique après les groupes de filtres
    const filterGroups = document.querySelectorAll('.filter-group');
    filterGroups.forEach(group => {
      const nextElement = group.nextElementSibling;
      if (nextElement && !nextElement.classList.contains('celtic-divider') && 
          !nextElement.classList.contains('filter-group')) {
        const divider = document.createElement('div');
        divider.className = 'celtic-divider';
        group.parentNode.insertBefore(divider, nextElement);
      }
    });
  }
  
  /**
   * Initialise les animations pour les éléments irlandais
   */
  function initIrishAnimations() {
    // Animation pour les boutons au survol
    const irishButtons = document.querySelectorAll('.irish-button');
    irishButtons.forEach(button => {
      button.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.2)';
      });
      
      button.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
      });
    });
    
    // Animation pour les titres celtiques
    const celticTitles = document.querySelectorAll('.celtic-title');
    celticTitles.forEach(title => {
      title.addEventListener('mouseover', function() {
        this.style.color = '#169B62';
      });
      
      title.addEventListener('mouseout', function() {
        this.style.color = '';
      });
    });
  }
  
  // Observer les changements de thème pour initialiser le thème irlandais quand il est activé
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const activeThemeButton = document.querySelector('.theme-button.irish.active');
        if (activeThemeButton) {
          initIrishTheme();
        }
      }
    });
  });
  
  // Observer les boutons de thème pour détecter quand le thème irlandais est activé
  const themeSwitcher = document.querySelector('.theme-switcher');
  if (themeSwitcher) {
    observer.observe(themeSwitcher, { attributes: true, subtree: true });
    
    // Vérifier si le thème irlandais est déjà actif
    const activeThemeButton = document.querySelector('.theme-button.irish.active');
    if (activeThemeButton) {
      initIrishTheme();
    }
  }
});