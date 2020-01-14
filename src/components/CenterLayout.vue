/*
    个人主页Layout
*/
<template>
    <div class="center-layout">
        <Layout v-if="!isMobileLayout" :style="{width: '100%'}">
            <Sider hide-trigger :style="{background: '#fff'}">
                <CenterMenu :active-name="activeName" />
            </Sider>
            <Layout :style="{padding: '24px', minWidth: '800px'}">
                <Content :style="{padding: '24px', minHeight: '280px', minWidth: '600px', background: '#fff'}">
                    <slot name="content"/>
                </Content>
            </Layout>
        </Layout>
        <Layout v-else-if="isResponse && isMobileLayout" :style="{ minHeight: '100%'}">
            <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                <slot name="content"/>
            </Content>
        </Layout>
        <Layout v-else :style="{ minWidth: '800px', minHeight: '100%'}">
            <Content :style="{padding: '24px', minHeight: '280px', minWidth: '600px', background: '#fff'}">
                <slot name="content"/>
            </Content>
        </Layout>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import qs from 'qs';
import Constants from '~/actions/Constants';
import BNUtils from '~/utils/BNUtils';
import CenterMenu from '~/components/CenterMenu';

export default {
    components: {
        CenterMenu
    },
    props: {
        activeName: {
            type: [String, Number],
            default: '1'
        },
        isResponse: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapGetters({
            isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
        })
    }
};
</script>