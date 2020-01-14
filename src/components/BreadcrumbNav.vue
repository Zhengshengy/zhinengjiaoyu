/*
    面包屑菜单
*/
<template>
    <Breadcrumb>
        <BreadcrumbItem
            v-for="item in currentPath"
            :to="item.path"
            :key="item.name"
        >
            {{ item.title }}
        </BreadcrumbItem>
    </Breadcrumb>
</template>

<script>
export default {
    name: 'BreadcrumbNav',
    props: {
        extendPath: Array
    },
    data() {
        return {
            mapPathItems: {}
        };
    },
    computed: {
        currentPath() {
            if (this.mapPathItems[this.$route.fullPath]) {
                return this.mapPathItems[this.$route.fullPath];
            }
            const fullPath = (this.$route.fullPath || '').split('?')[0];
            const tokens = fullPath.split('/');
            const locales = ['en'];
            const items = [];
            const skipPath = ['home', 'en', 'analyze'];
            const itemNames = [];

            let name_prefix = '';
            let cur_path = '';
            for (let i = 0; i < tokens.length; i += 1) {
                let token = tokens[i];
                if (token === '') {
                    name_prefix = '';
                    cur_path = '';
                    if (!itemNames.includes('index')) {
                        items.push({
                            name: 'index',
                            path: this.$i18n.path(cur_path),
                            title: this.$i18n.t('links.site_name')
                        });
                        itemNames.push('index');
                    }
                } else if (locales.includes(token)) {
                    name_prefix += 'lang__';
                    if (!itemNames.includes('lang__index') && !skipPath.includes(token)) {
                        items.push({
                            name: 'lang__index',
                            path: this.$i18n.path(cur_path),
                            title: this.$i18n.t('links.' + token.toLowerCase())
                        });
                        itemNames.push('lang__index');
                    }
                } else {
                    if (name_prefix === '' || name_prefix === 'lang__') {
                        name_prefix += token;
                    } else {
                        name_prefix += '-' + token;
                    }
                    if (cur_path === '') {
                        cur_path = token;
                    } else {
                        cur_path += '/' + token;
                    }
                    if (!skipPath.includes(token)) {
                        if (token === 'teacher') continue;
                        items.push({
                            name: name_prefix,
                            path: this.$i18n.path(cur_path),
                            title: this.$i18n.t('links.' + token.toLowerCase())
                        });
                    }
                }
            }
            this.mapPathItems[this.$route.fullPath] = items;
            return items;
        }
    }
};
</script>
