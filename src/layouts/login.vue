<template>
    <div class="layout">
        <Layout>
            <Header>
                <nuxt-link :to="$i18n.path('')">
                    <div class="layout-logo">{{ $t('links.site_name') }}</div>
                </nuxt-link>
                <div class="action">
                    <!-- 语言切换 -->
                    <div class="san" :style="{display:dis}"></div>
                    <div class="language" :style="{display:dis}">
                      <span class="zi" @click="changeLang('zh')" v-bind:class="{ 'top__i18n__li': true, 'bn-active' : this.$i18n.locale === 'zh' }">
                          {{ $t('links.chinese') }}
                      </span>
                        <div style="height: 1px;background: #cccccc;margin: 0 8px 0 8px" ></div>
                        <span class="zi" @click="changeLang('en')" v-bind:class="{ 'top__i18n__li': true, 'bn-active' : this.$i18n.locale === 'en' }">
                          {{ $t('links.english') }}
                      </span>
                    </div>
                    <Icon type="ios-globe-outline" size="20" color="#fff" style="margin-bottom: 5px"/>
                    <span style="position: relative;" @click="checkLanage">{{$t('links.language')}}</span>
                    <Icon type="ios-help-circle-outline" size="20" color="#fff" style="margin-bottom: 5px" />
                    <span>{{$t('links.help')}}</span>
                    <span @click="login">{{$t('default.login')}}</span>
                </div>
            </Header>
            <Content :style="{padding: '24px', minHeight: '100%', background: '#fff'}">
                <nuxt />
            </Content>
        </Layout>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import Constants from '~/actions/Constants';
import BreadcrumbNav from '~/components/BreadcrumbNav';
import BNRouteHelper from '~/utils/BNRouteHelper';
export default {
    components: {
        BreadcrumbNav
    },
    data() {
        return {
            dis:"none",
        }
    },
    methods: {
        ...mapActions({
            switchLang: Constants.INDEX.SWITCH_LANG,
        }),
        changeLang(lang) {
            this.dis = "none"
            this.switchLang(lang)
                .then(() => {
                    return BNRouteHelper.changeLocale(this.$router, lang);
                });
        },
        checkLanage(){
            if (this.dis == "block") {
                this.dis = "none"
            }else  if (this.dis == "none"){
                this.dis = "block"
            }
        },
        login(){
             BNRouteHelper.login(this.$router);
        }
    },
}
</script>

<style scoped>
.ivu-layout-header{background: #338bd8; padding:0px 30px;}
.layout-logo{ color: #fff; font-size: 20px; float: left;}
.ivu-menu-dark{ background: none}

.action{ float: right;}
.action span{ cursor: pointer;color: #FFF; font-size: 16px; margin: 0px 50px 0px 10px;}

.action .language{ position: absolute;top:70px;right: 270px;background: #666666;border-radius: 8px;line-height: 64px}
.action .language .zi{
    font-size: 14px;
    display: block;
    margin: 0px 30px 0px 30px;
    line-height: 40px;
}
.san{
    position: absolute;
    top:54px;right: 321px;
    border: 8px solid transparent;
    border-bottom: 8px solid #666666;
    width: 0;
    height: 0;
}
.ivu-layout-content h3{ font-size: 20px; margin: 0px 0px 30px 0px;}
</style>
