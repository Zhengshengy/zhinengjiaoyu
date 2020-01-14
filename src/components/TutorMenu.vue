/*
老师主页左侧菜单
*/
<template>
        <Menu active-name="2" width="auto">
            <MenuGroup :title="this.$t('tutor.module')">
                <MenuItem name="2" :to="$i18n.path('tutor/course')">
                    <Icon type="md-calendar"/>
                    {{ $t('tutor.course') }}
                </MenuItem>
                <MenuItem name="3" :to="$i18n.path('tutor/order')">
                    <Icon type="md-list-box"/>
                    {{ $t('tutor.order') }}
                </MenuItem>
                <MenuItem name="4" :to="$i18n.path('tutor/income')">
                    <Icon type="logo-usd"/>
                    {{ $t('tutor.income') }}
                </MenuItem>
                <MenuItem name="5" :to="$i18n.path('tutor/notice')">
                    <Icon type="md-notifications"/>
                    {{ $t('tutor.notice') }}
                </MenuItem>
            </MenuGroup>
            <MenuGroup :title="this.$t('tutor.system_setup')">
                <MenuItem name="6" :to="$i18n.path('tutor/profile')">
                    <Icon type="md-person"/>
                    {{ $t('tutor.profile') }}
                </MenuItem>
                <MenuItem name="7" :to="$i18n.path('tutor/teach')">
                    <Icon type="md-card"/>
                    {{ $t('tutor.teach') }}
                </MenuItem>
                <MenuItem name="8" :to="$i18n.path('tutor/password')">
                    <Icon type="md-unlock"/>
                    {{ $t('tutor.password') }}
                </MenuItem>
                <MenuItem name="9" :to="$i18n.path('tutor/account')">
                    <Icon type="ios-create"/>
                    {{ $t('tutor.account') }}
                </MenuItem>
                <MenuItem name="10" :to="$i18n.path('tutor/aptitude')">
                    <Icon type="md-list"/>
                    {{ $t('tutor.aptitude') }}
                </MenuItem>
            </MenuGroup>
        </Menu>
</template>

<script>
    export default {
        name: 'TutorMenu'
    }
</script>

<style scoped >
</style>