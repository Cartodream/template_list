// Script pour initialiser les filtres par défaut au premier chargement
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si c'est le premier chargement
    if (!localStorage.getItem('selectedFilters')) {
        // Cocher toutes les cases de Patrimoine Architectural
        document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(checkbox => {
            const category = checkbox.dataset.category;
            checkbox.checked = (category === 'patrimoine_architectural');
            
            // Déclencher l'événement change pour appliquer les filtres
            if (checkbox.checked) {
                const event = new Event('change');
                checkbox.dispatchEvent(event);
            }
        });
        
        // Ouvrir le groupe de filtres Patrimoine Architectural
        const architecturalGroup = document.querySelector('.filter-group:first-child');
        if (architecturalGroup) {
            const title = architecturalGroup.querySelector('.filter-title');
            const options = architecturalGroup.querySelector('.filter-options');
            title.classList.add('active');
            options.style.display = 'block';
        }
    }
});