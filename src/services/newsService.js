const API_BASE = 'https://jsonplaceholder.typicode.com';

export async function fetchPosts(userId = null, limit = 6) {
    try {
        let url = `${API_BASE}/posts?_limit=${limit}`;
        if (userId) {
            url = `${API_BASE}/posts?userId=${userId}&_limit=${limit}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const posts = await response.json();
        if (!posts || posts.length === 0) {
            throw new Error('Новости не найдены');
        }

        return posts;
    } catch (error) {
        console.error('Ошибка загрузки постов:', error);
        throw error;
    }
}

export async function fetchComments(postId, limit = 3) {
    try {
        const url = `${API_BASE}/comments?postId=${postId}&_limit=${limit}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const comments = await response.json();
        return comments || [];
    } catch (error) {
        console.error('Ошибка загрузки комментариев:', error);
        return [];
    }
}

export function getRandomUserId() {
    return Math.floor(Math.random() * 10) + 1;
}

export function truncateText(text, length = 150) {
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
}