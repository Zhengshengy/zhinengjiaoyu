module.exports = {
    srcDir: 'src/',
    head: {
        title: '一点都不难',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui' },
            { hid: 'description', name: 'description', content: '一点都不难' },
            /* 优先使用 IE 最新版本和 Chrome  */
            { name: 'renderer', content: 'webkit' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
            /* iOS 设备 */
            { name: 'author', content: '一点都不难@yidianbunan.com' },
            { name: 'apple-mobile-web-app-title', content: '一点都不难' },
            { name: 'apple-mobile-web-app-capable', content: 'yes' },
            { name: 'apple-mobile-web-app-status-bar-style', content: '#263238' },
            /* fullscreen and app mode */
            { name: 'screen-orientation', content: 'portrait' },
            { name: 'x5-orientation', content: 'portrait' },
            { name: 'full-screen', content: 'yes' },
            { name: 'x5-fullscreen', content: 'true' },
            { name: 'browsermode', content: 'application' },
            { name: 'x5-page-mode', content: 'app' },
            /* webkit */
            { name: 'theme-color', content: '#263238' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/client/favicon.ico' }
        ]
    },
    // Global CSS
    css: [
        '@/assets/styles/main.scss',
        'video.js/dist/video-js.css'
    ],
    loading: { color: 'cyan' },
    build: {
        publicPath: (
            process.env.NODE_ENV === 'development' ?
                'http://10.0.0.135/client/' :
                (process.env.NODE_ENV === 'testing' ?
                    'https://aiedu.snhccm.com/client/' :
                    'https://aiedu.snhccm.com/client/')
        ),
        vendor: [
            'babel-polyfill',
            'iview',
            'vue-i18n'
        ],
        extend: function(config) {
            config.module.rules.push({
                test: /\.vue$/,
                loader: 'iview-loader',
                options: {
                    prefix: false
                }
            });
        }
    },
    router: {
        base: '/client/',
        middleware: 'i18n',
        extendRoutes: function(routes, resolve) {
            const routeLength = routes.length;
            for (let index = 0; index < routeLength; index += 1) {
                let oldRoute = routes[index];
                routes.push({
                    name: 'lang__' + oldRoute.name,
                    path: '/:lang' + oldRoute.path,
                    component: resolve(oldRoute.component)
                });
            }
            // Error Pages
            routes.push({
                name: 'lang__errors_404',
                path: '/:lang/*',
                component: resolve(__dirname, 'src/pages/errors/404.vue')
            });
            routes.push({
                name: 'any__errors_404',
                path: '*',
                component: resolve(__dirname, 'src/pages/errors/404.vue')
            });

            console.log('VUE ROUTES:', routes);
        }
    },
    plugins: [
        { src: '~/plugins/global.js', ssr: true },
        { src: '~/plugins/i18n.js', ssr: true },
        { src: '~/plugins/iview.js', ssr: true },
        { src: '~/plugins/player.js', ssr: false },
        { src: '~/plugins/preview.js', ssr: false },
    ],
    modules: [
        '@nuxtjs/axios',
    ],
    axios: {
        proxy: process.env.NODE_ENV === 'development',
    },
    proxy: {
        '/api/': {
            target: 'https://aiedu.snhccm.com/'
            // target: 'http://localhost:8100',
        },
        '/src/': {
            target: 'https://aiedu.snhccm.com/'
        },
    }
};
