/*
    注册页面
*/
<template>
    <div class="main-container">
        <div class="signup__wrapper">
            <div class="signup__container" v-bind:title= "$t('default.login')">
                <div v-if="!isMobileLayout" class="signup__left">
                    <img src="/client/images/login_bg.jpg" />
                </div>
                <div class="signup__right">
                    <div v-if="isMobileLayout" class="signup__right__image">
                        <img class="signup__right__image" src="/client/images/login_bg.jpg" />
                    </div>
                    <Form ref="signupForm" :model="registerForm" :rules="registerRules" class="signup__form" @submit.native.prevent>
                        <FormItem prop="role" :error="role_error_empty">
                            <Select v-model="registerForm.role" v-bind:placeholder="$t('default.role_input_tip')">
                                <Option v-for="item in identity" :value="item.id" :key="item.id">{{ item.name }}
                                    <span slot="prepend">
                                        <Icon :size="16" type="person"></Icon>
                                    </span>
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem prop="name">
                            <Input v-model="registerForm.name" v-bind:placeholder="$t('default.name_input_tip')">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="registerForm.password" v-bind:placeholder="$t('default.pwd_input_tip')">
                                <span slot="prepend">
                                    <Icon :size="16" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password_confirmation">
                            <Input type="password" v-model="registerForm.password_confirmation" v-bind:placeholder="$t('default.pwd_input_again_tip')">
                                <span slot="prepend">
                                    <Icon :size="16" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="email">
                            <Input v-model="registerForm.email" @keyup.enter.native="onSubmit" v-bind:placeholder="$t('default.email_input_tip')">
                                <span slot="prepend">
                                    <Icon :size="16" type="email"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button class="sign__button" long @click="onSubmit" @keyup.enter.native="onSubmit" type="primary">{{$t('default.register')}}</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
            <div class="signup__background"></div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import '~/assets/styles/home/signup.scss';
import Constants from '~/actions/Constants';
import { mapActions, mapGetters } from 'vuex';
import BNRouteHelper from '~/utils/BNRouteHelper';

export default {
    layout: 'single',
    middleware: 'auth',
    settings: {
        topBlue: false,
        withBackground: true
    },
    data: function() {
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('default.pwd_input_tip')));
            } else {
                if (this.registerForm.password_confirmation !== '') {
                    // 对第二个密码框单独验证
                    this.$refs.signupForm.validateField('password_confirmation');
                }
                callback();
            }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('default.pwd_input_again_tip')));
            } else if (value !== this.registerForm.password) {
                callback(new Error(this.$t('default.pwd_didnt_match')));
            } else {
                callback();
            }
        };

        return {
            modalRegister: false,
            loading: true,
            role_error_empty: '',
            registerForm: {
                role: '',
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            },
            registerRules: {
                name: [
                    { required: true, message: this.$t('default.name_error_empty'), trigger: 'blur' }
                ],
                email: [
                    { required: true, message: this.$t('default.email_input_tip'), trigger: 'blur' },
                    { type: 'email', message: this.$t('default.email_error_wrong_format'), trigger: 'blur' }
                ],
                password: [
                    { required: true, message: this.$t('default.pwd_input_tip'), trigger: 'blur' },
                    { type: 'string', min: 6, validator: validatePass, trigger: 'blur' }
                ],
                password_confirmation: [
                    { required: true, message: this.$t('default.pwd_input_again_tip'), trigger: 'blur' },
                    { type: 'string', min: 6, validator: validatePassCheck, trigger: 'blur' }
                ]
            },
            identity:[
                {id:1,name:this.$t('links.students')},
                {id:2,name:this.$t('links.adult')},
                {id:3,name:this.$t('links.onlineteacher')},
                {id:4,name:this.$t('links.teacher')},
                // {id:5,name:this.$t('links.s_parent')},
            ]
        };
    },
    computed: {
        ...mapGetters({
            isMobileLayout: Constants.INDEX.IS_MOBILE_LAYOUT,
        }),
        requireLogin: function () {
            return this.$store.state.me && this.$store.state.me.requireLogin;
        },
        httpLoading: function() {
            return this.$store.state.app && this.$store.state.app.httpLoading;
        }
    },
    methods: {
        onSubmit: function() {
            if (this.registerForm.role=='') {
                this.role_error_empty = this.$t('default.role_error_empty')
            } else {
                this.role_error_empty = ''
                this.$refs.signupForm.validate((valid) => {
                    if (valid) {
                        return this.signUp({
                            name: this.registerForm.name,
                            email: this.registerForm.email,
                            password: this.registerForm.password,
                            password_confirmation: this.registerForm.password_confirmation,
                            role: this.registerForm.role,
                        }).then(() => {
                            if (!this.requireLogin) {
                                BNRouteHelper.home(this.$router);
                                this.$Message.success(this.$t('default.signup_success'));
                            } else {
                                this.$Message.success(this.$t('default.login_error_wrong_pwd'));
                            }
                        }).catch((err) => {
                            if (err.errors) {
                                if (err.errors['role']) {
                                    this.$refs.signupForm.$children[0].error = err.errors['role'][0];
                                }
                                if (err.errors['name']) {
                                    this.$refs.signupForm.$children[1].error = err.errors['name'][0];
                                }
                                if (err.errors['password']) {
                                    this.$refs.signupForm.$children[2].error = err.errors['password'][0];
                                }
                                if (err.errors['password_confirmation']) {
                                    this.$refs.signupForm.$children[3].error = err.errors['password_confirmation'][0];
                                }
                                if (err.errors['email']) {
                                    this.$refs.signupForm.$children[4].error = err.errors['email'][0];
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
            }
        },
        ...mapActions({
            signUp: Constants.ME.SIGN_UP
        })
    }
};
</script>
