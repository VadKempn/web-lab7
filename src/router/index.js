import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import NewsPage from '../pages/NewsPage.vue';
import TopPage from '../pages/TopPage.vue';
import ReviewsPage from '../pages/ReviewsPage.vue';
import AboutPage from '../pages/AboutPage.vue';
import ContactsPage from '../pages/ContactsPage.vue';
import WatchlistPage from '../pages/WatchlistPage.vue';

const routes = [
    { path: '/', component: HomePage, meta: { title: 'Главная' } },
    { path: '/news', component: NewsPage, meta: { title: 'Новости' } },
    { path: '/top', component: TopPage, meta: { title: 'Топ 5' } },
    { path: '/reviews', component: ReviewsPage, meta: { title: 'Рецензии' } },
    { path: '/about', component: AboutPage, meta: { title: 'О нас' } },
    { path: '/contacts', component: ContactsPage, meta: { title: 'Контакты' } },
    { path: '/watchlist', component: WatchlistPage, meta: { title: 'Мой список' } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.afterEach((to) => {
    document.title = `${to.meta.title || 'Страница'} - AnimeReviews`;
});

export default router;