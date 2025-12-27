const LS_KEY = 'anime_watchlist_v1';

export function loadWatchlist() {
    try {
        const data = localStorage.getItem(LS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function saveWatchlist(items) {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch (e) {
        console.error('Ошибка при сохранении в localStorage:', e);
    }
}

export function addItem(title, status = 'planning', score = null) {
    const items = loadWatchlist();
    const newItem = {
        id: Date.now(),
        title,
        status,
        score: score ? Number(score) : null
    };
    items.unshift(newItem);
    saveWatchlist(items);
    return newItem;
}

export function deleteItem(id) {
    const items = loadWatchlist();
    const filtered = items.filter(x => x.id !== id);
    saveWatchlist(filtered);
}

export function updateItem(id, updates) {
    const items = loadWatchlist();
    const item = items.find(x => x.id === id);
    if (item) {
        Object.assign(item, updates);
        saveWatchlist(items);
    }
}

export function filterItems(items, filter) {
    if (filter === 'all') return items;
    return items.filter(x => x.status === filter);
}

export function getStatusLabel(status) {
    const labels = {
        'planning': 'Планирую',
        'watching': 'Смотрю',
        'done': 'Просмотрено'
    };
    return labels[status] || status;
}