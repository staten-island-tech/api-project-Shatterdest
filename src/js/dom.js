export function domSelectors() {
    return {
        search: document.getElementById('search'),
        searchInput: document.getElementById('searchInput'),
        lContainer: document.getElementById('location-container'),
        locations: document.querySelectorAll("#location")
    }
}