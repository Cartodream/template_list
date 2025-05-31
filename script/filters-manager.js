// Gestionnaire de filtres partagé entre les pages
const FiltersManager = {
    // Sauvegarder l'état des filtres dans localStorage
    saveFilters: function() {
        const selectedFilters = [];
        document.querySelectorAll('.filter-options input[type="checkbox"]:checked').forEach(checkbox => {
            selectedFilters.push({
                category: checkbox.dataset.category,
                subcategory: checkbox.dataset.subcategory
            });
        });
        localStorage.setItem('selectedFilters', JSON.stringify(selectedFilters));
    },
    
    // Charger l'état des filtres depuis localStorage
    loadFilters: function() {
        const savedFilters = localStorage.getItem('selectedFilters');
        if (savedFilters) {
            const selectedFilters = JSON.parse(savedFilters);
            
            // Décocher toutes les cases d'abord
            document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Cocher les cases sauvegardées
            selectedFilters.forEach(filter => {
                const checkbox = document.querySelector(`.filter-options input[data-category="${filter.category}"][data-subcategory="${filter.subcategory}"]`);
                if (checkbox) {
                    checkbox.checked = true;
                }
            });
            
            // Ouvrir les groupes de filtres qui contiennent des filtres sélectionnés
            document.querySelectorAll('.filter-group').forEach(group => {
                const hasCheckedFilters = group.querySelector('input[type="checkbox"]:checked');
                if (hasCheckedFilters) {
                    const filterTitle = group.querySelector('.filter-title');
                    const filterOptions = group.querySelector('.filter-options');
                    filterTitle.classList.add('active');
                    filterOptions.style.display = 'block';
                }
            });
            
            return true;
        }
        return false;
    },
    
    // Réinitialiser les filtres (supprimer du localStorage)
    resetFilters: function() {
        localStorage.removeItem('selectedFilters');
    }
};