/**
 * Gestionnaire de thèmes pour la carte interactive
 */
document.addEventListener('DOMContentLoaded', function() {
  // Thèmes disponibles
  const themes = {
    viking: {
      name: 'Viking',
      cssFiles: ['viking-theme.css', 'viking-decorations.css'],
      icon: 'fa-solid fa-shield-halved',
      classes: {
        add: ['viking-border', 'viking-frame', 'viking-shield', 'viking-list', 'viking-button', 'viking-wave-button', 'viking-divider', 'viking-title', 'viking-runes', 'viking-parchment'],
        remove: ['gothic-border', 'impressionist-border', 'leaf-decoration', 'celtic-title', 'irish-button', 'irish-frame', 'shamrock-list', 'celtic-divider']
      }
    },
    gothic: {
      name: 'Gothique',
      cssFiles: ['gothic-theme.css'],
      icon: 'fa-solid fa-church',
      classes: {
        add: ['gothic-border'],
        remove: ['viking-border', 'viking-frame', 'viking-shield', 'viking-list', 'viking-button', 'viking-wave-button', 'viking-divider', 'viking-title', 'viking-runes', 'viking-parchment', 'impressionist-border', 'leaf-decoration', 'celtic-title', 'irish-button', 'irish-frame', 'shamrock-list', 'celtic-divider']
      }
    },
    impressionist: {
      name: 'Impressionniste',
      cssFiles: ['impressionist-theme.css'],
      icon: 'fa-solid fa-palette',
      classes: {
        add: ['impressionist-border'],
        remove: ['viking-border', 'viking-frame', 'viking-shield', 'viking-list', 'viking-button', 'viking-wave-button', 'viking-divider', 'viking-title', 'viking-runes', 'viking-parchment', 'gothic-border', 'leaf-decoration', 'celtic-title', 'irish-button', 'irish-frame', 'shamrock-list', 'celtic-divider']
      }
    },
    nature: {
      name: 'Naturiste',
      cssFiles: ['nature-theme.css'],
      icon: 'fa-solid fa-leaf',
      classes: {
        add: ['leaf-decoration'],
        remove: ['viking-border', 'viking-frame', 'viking-shield', 'viking-list', 'viking-button', 'viking-wave-button', 'viking-divider', 'viking-title', 'viking-runes', 'viking-parchment', 'gothic-border', 'impressionist-border', 'celtic-title', 'irish-button', 'irish-frame', 'shamrock-list', 'celtic-divider']
      }
    }
  };

  // Créer le sélecteur de thème
  createThemeSwitcher();

  // Fonction pour créer le sélecteur de thème
  function createThemeSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'theme-switcher';
    
    // Créer un bouton pour chaque thème
    for (const [themeId, theme] of Object.entries(themes)) {
      const button = document.createElement('button');
      button.className = `theme-button ${themeId}`;
      button.setAttribute('data-theme', themeId);
      button.setAttribute('title', `${theme.name}`);
      
      // Ajouter l'icône
      const icon = document.createElement('i');
      icon.className = theme.icon;
      button.appendChild(icon);
      
      // Ajouter l'événement de clic
      button.addEventListener('click', function() {
        switchTheme(themeId);
      });
      
      switcher.appendChild(button);
    }
    
    // Ajouter le sélecteur au document
    document.body.appendChild(switcher);
    
    // Marquer le thème actif
    const activeTheme = localStorage.getItem('selectedTheme') || 'viking';
    document.querySelector(`.theme-button[data-theme="${activeTheme}"]`).classList.add('active');
  }

  // Fonction pour changer de thème
  function switchTheme(themeId) {
    // Sauvegarder le thème sélectionné
    localStorage.setItem('selectedTheme', themeId);
    
    // Ajouter une classe pour l'animation de transition
    document.body.classList.add('theme-changing');
    
    // Mettre à jour les boutons actifs
    document.querySelectorAll('.theme-button').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`.theme-button[data-theme="${themeId}"]`).classList.add('active');
    
    // Désactiver tous les fichiers CSS de thème
    for (const theme of Object.values(themes)) {
      theme.cssFiles.forEach(file => {
        disableCssFile(file);
      });
    }
    
    // Activer les fichiers CSS du thème sélectionné
    themes[themeId].cssFiles.forEach(file => {
      enableCssFile(file);
    });
    
    // Gérer les classes spécifiques au thème
    updateThemeClasses(themeId);
    
    // Supprimer la classe d'animation après la transition
    setTimeout(() => {
      document.body.classList.remove('theme-changing');
    }, 500);
  }

  // Fonction pour mettre à jour les classes spécifiques au thème
  function updateThemeClasses(themeId) {
    const theme = themes[themeId];
    
    // Supprimer les classes à enlever
    if (theme.classes && theme.classes.remove) {
      theme.classes.remove.forEach(className => {
        document.querySelectorAll('.' + className).forEach(element => {
          element.classList.remove(className);
        });
      });
    }
    
    // Ajouter les classes spécifiques au thème
    if (theme.classes && theme.classes.add) {
      // Page title
      const pageTitle = document.querySelector('.page-title');
      if (pageTitle) {
        theme.classes.add.forEach(className => {
          if (className.includes('border')) {
            pageTitle.classList.add(className);
          }
        });
      }
      
      // Logo
      const logo = document.querySelector('.logo');
      if (logo) {
        theme.classes.add.forEach(className => {
          if (className.includes('frame')) {
            logo.classList.add(className);
          }
        });
      }
      
      // Titre Explorer
      const explorerTitle = document.querySelector('.filters-header h2');
      if (explorerTitle) {
        theme.classes.add.forEach(className => {
          if (className.includes('title') || className.includes('shield')) {
            explorerTitle.classList.add(className);
          }
        });
      }
      
      // Options de filtres
      const filterOptions = document.querySelectorAll('.filter-options');
      filterOptions.forEach(options => {
        theme.classes.add.forEach(className => {
          if (className.includes('list')) {
            options.classList.add(className);
          }
        });
      });
      
      // Boutons
      const buttons = document.querySelectorAll('.select-all, .deselect-all, .toggle-filters-btn, .prev-slide, .next-slide');
      buttons.forEach(button => {
        theme.classes.add.forEach(className => {
          if (className.includes('button') && !className.includes('wave')) {
            button.classList.add(className);
          }
        });
      });
      
      // Bouton avec vague
      const waveButton = document.querySelector('.toggle-filters-btn');
      if (waveButton) {
        theme.classes.add.forEach(className => {
          if (className.includes('wave')) {
            waveButton.classList.add(className);
          }
        });
      }
      
      // Divider
      const divider = document.querySelector('.viking-divider');
      if (divider) {
        divider.className = '';
        theme.classes.add.forEach(className => {
          if (className.includes('divider')) {
            divider.classList.add(className);
          }
        });
      }
      
      // Map
      const map = document.querySelector('#map');
      if (map) {
        theme.classes.add.forEach(className => {
          if (className.includes('frame')) {
            map.classList.add(className);
          }
        });
      }
      
      // Footer
      const footer = document.querySelector('.site-footer');
      if (footer) {
        theme.classes.add.forEach(className => {
          if (className.includes('border')) {
            footer.classList.add(className);
          }
        });
      }
      
      // Titres dans le footer
      const footerTitles = document.querySelectorAll('.footer-contact h3');
      footerTitles.forEach(title => {
        theme.classes.add.forEach(className => {
          if (className.includes('title')) {
            title.classList.add(className);
          }
        });
      });
      
      // Liens dans le footer
      const footerLinks = document.querySelectorAll('.footer-link');
      footerLinks.forEach(link => {
        theme.classes.add.forEach(className => {
          if (className.includes('runes')) {
            link.classList.add(className);
          }
        });
      });
      
      // Modal content
      const modalContent = document.querySelector('.modal-content');
      if (modalContent) {
        theme.classes.add.forEach(className => {
          if (className.includes('parchment')) {
            modalContent.classList.add(className);
          }
        });
      }
    }
  }

  // Fonction pour activer un fichier CSS
  function enableCssFile(filename) {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    for (const link of links) {
      if (link.href.includes(filename)) {
        link.disabled = false;
        return;
      }
    }
  }

  // Fonction pour désactiver un fichier CSS
  function disableCssFile(filename) {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    for (const link of links) {
      if (link.href.includes(filename)) {
        link.disabled = true;
        break;
      }
    }
  }

  // Initialiser le thème au chargement
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    switchTheme(savedTheme);
  }
});