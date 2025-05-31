// Script pour gérer les filtres partagés entre les pages
const SharedFilters = {
    // Sauvegarder les filtres actuels
    save: function() {
        const filters = [];
        document.querySelectorAll('.filter-options input[type="checkbox"]:checked').forEach(checkbox => {
            filters.push({
                category: checkbox.dataset.category,
                subcategory: checkbox.dataset.subcategory
            });
        });
        localStorage.setItem('sharedFilters', JSON.stringify(filters));
    },
    
    // Charger les filtres sauvegardés
    load: function() {
        const saved = localStorage.getItem('sharedFilters');
        if (!saved) return false;
        
        try {
            const filters = JSON.parse(saved);
            
            // Décocher toutes les cases
            document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = false;
            });
            
            // Cocher les cases sauvegardées
            filters.forEach(filter => {
                const checkbox = document.querySelector(`.filter-options input[data-category="${filter.category}"][data-subcategory="${filter.subcategory}"]`);
                if (checkbox) checkbox.checked = true;
            });
            
            return true;
        } catch (e) {
            console.error("Erreur lors du chargement des filtres:", e);
            return false;
        }
    },
    
    // Initialiser les écouteurs d'événements
    init: function() {
        // Charger les filtres au chargement de la page
        this.load();
        
        // Sauvegarder les filtres lors des changements
        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.save());
        });
        
        // Sauvegarder lors du clic sur les boutons "Tout sélectionner" et "Tout désélectionner"
        const selectAllBtn = document.querySelector('.select-all');
        const deselectAllBtn = document.querySelector('.deselect-all');
        
        if (selectAllBtn) selectAllBtn.addEventListener('click', () => setTimeout(() => this.save(), 100));
        if (deselectAllBtn) deselectAllBtn.addEventListener('click', () => setTimeout(() => this.save(), 100));
    }
};

// Initialiser au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    SharedFilters.init();
});