/*
    登录页面
*/
<template>
    <div class="main-container">
        <div class="login__wrapper">
            <div class="login__container" :title="$t('default.login')">
                <div v-if="!isMobileLayout" class="login__left">
                    <img src="/client/images/login_bg.jpg" />
                </div>
                <div class="login__right">
                    <div v-if="isMobileLayout" class="login__right__image">
                        <img class="login__right__image" src="/client/images/login_bg.jpg" />
                    </div>
                    <Form ref="loginForm" :model="form" :rules="rules" class="login__form">
                        <FormItem prop="name">
                            <Input v-model="form.name" v-bind:placeholder="$t('default.name_input_tip')" @keyup.enter.native="onSubmit">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" v-bind:placeholder="$t('default.pwd_input_tip')" @keyup.enter.native="onSubmit">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button class="login__button login__button-login" long @click="onSubmit" type="primary" :loading="httpLoading">{{$t('default.login')}}</Button>
                        </FormItem>
                        <FormItem >
                            <div class="login__Between" style="margin-bottom: -15px;">
                                <Button class="login__button login__button-secondary" @click="onForgetPassword">{{$t('default.forget_pwd')}}</Button>
                                <Button class="login__button login__button-secondary" @click="onRegister">{{$t('default.signup')}}</Button>
                            </div>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <div class="login__background"></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import '~/assets/styles/home/login.scss';
import { mapActions, mapGetters } from 'vuex';
import Constants from '~/actions/Constants';
import BNRouteHelper from '~/utils/BNRouteHelper';

export default {
    layout: 'single',
    middleware: 'auth',
    settings: {
        topBlue: false,
        withBackground: true
    },
    data: function () {
        return {
            form: {
                name: '',
                password: ''
            },
            rules: {
                name: [
                    { required: true, message: this.$t('default.name_error_empty'), trigger: 'blur' }
                ],
                password: [
                    { required: true, message: this.$t('default.pwd_empty'), trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        ...mapGetters({
            isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
        }),
        requireLogin: function () {
            return this.$store.state.me && this.$store.state.me.requireLogin;
        },
        httpLoading: function () {
            return this.$store.state.app && this.$store.state.app.httpLoading;
        }
    },
    mounted() {
        const errorMessage = BNRouteHelper.getErrorMessage();
        if (errorMessage && errorMessage.length > 0) {
            this.$Message.error(errorMessage);
            BNRouteHelper.clearErrorMessage();
        }
    },
    methods: {
        onSubmit: function () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    return this.login({
                        name: this.form.name,
                        password: this.form.password
                    }).then(() => {
                        if (!this.requireLogin) {
                            BNRouteHelper.home(this.$router);
                            this.$Message.success(this.$t('default.login_success'));
                        } else {
                            this.$Message.success(this.$t('default.login_error_wrong_pwd'));
                        }
                    }).catch((err) => {
                        if (err.errors) {
                            if (err.errors['name']) {
                                this.$refs.loginForm.$children[0].error = err.errors['name'][0];
                            }
                            if (err.errors['password']) {
                                this.$refs.loginForm.$children[1].error = err.errors['password'][0];
                            }
                        }
                        if (err && err.message) {
                            this.$Message.error(err.message);
                        } else {
                            this.$Message.error(this.$t('default.common_error'));
                        }
                    });
                }
            });
        },
        onRegister: function () {
            BNRouteHelper.signUp(this.$router);
        },
        onForgetPassword: function () {
            BNRouteHelper.password(this.$router);
        },
        ...mapActions({
            login: Constants.ME.LOGIN
        })
    }
};
</script>