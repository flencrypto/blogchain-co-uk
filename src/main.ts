import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createMetaManager } from 'vue-meta';
import VueLazyLoad from 'vue3-lazyload';
import App from './App.vue';
import './index.css';
import router from './router';
import InitializationError from './components/InitializationError.vue';
import { formatInitError } from './helpers/initError';
import { initBackend } from './plugins/backend';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const metaManager = createMetaManager();

const mountApp = () =>
        createApp(App).use(pinia).use(router).use(metaManager).use(VueLazyLoad).mount('#app');

const mountInitializationError = (error: unknown) =>
        createApp(InitializationError, {
                errorMessage: formatInitError(error),
                onRetry: () => window.location.reload(),
        }).mount('#app');

initBackend()
        .then(mountApp)
        .catch((error: unknown) => {
                // Provide a user-facing error surface when bootstrapping fails so the app
                // does not silently render a blank screen.
                // eslint-disable-next-line no-console
                console.error('Failed to initialise Blogchain frontend', error);
                mountInitializationError(error);
        });
