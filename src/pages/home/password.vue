/*
    密码找回页面
*/
<template>
    <div class="main-container">
        <div style="margin-top: 50px">
            <div style="height: 35px">
                <div class="step_tip">
                    <div class="step_num" v-bind:class="{ step_num_cur : this.step == 1, step_num_out : this.step > 1 }">
                        <span v-if="this.step > 1">
                            √
                        </span>
                        <span v-else>
                            1
                        </span>
                    </div>
                    <div class="step_num_divide" v-bind:class="{step_num_divid_blue : this.step > 1 }"></div>
                    <div class="step_num" v-bind:class="{ step_num_cur : this.step == 2, step_num_out : this.step > 2 }">
                        <span v-if="this.step > 2">
                            √
                        </span>
                        <span v-else>
                            2
                        </span>
                    </div>
                    <div class="step_num_divide" v-bind:class="{step_num_divid_blue : this.step > 2 }"></div>
                    <div class="step_num" v-bind:class="{ step_num_cur : this.step == 3 }">3</div>
                </div>
            </div>
            <div v-if="this.step == 1">
                <div class="input_wrapper">
                    <input type="text" v-model="email" v-bind:placeholder="$t('default.email_input_tip')"></input>
                </div>
                <div class="button-wrapper">
                    <span class="button" @click="onSubmit">{{ $t('home.forget_password.submit') }} </span>
                </div>
            </div>
            <div v-if="this.step == 2">
                <div class="input_wrapper">
                    <input type="text" v-model="verify_code" v-bind:placeholder="$t('default.valid_code_tip')"></input>
                </div>
                <div class="input_wrapper">
                    <input type="password" v-model="password" v-bind:placeholder="$t('default.pwd_input_tip')"></input>
                </div>
                <div class="input_wrapper">
                    <input type="password" v-model="password_confirmation" v-bind:placeholder="$t('default.pwd_input_again_tip')"></input>
                </div>
                <div class="button-wrapper">
                    <span class="button" @click="resetPassword">{{ $t('home.forget_password.reset_pwd') }} </span>
                </div>
            </div>
            <div v-if="this.step == 3">
                <div class="input_wrapper">
                    {{ $t('home.forget_password.sus_tip') }}
                </div>
                <div class="button-wrapper">
                    <span class="redirect"> {{ $t('home.forget_password.auto_redirect') }} </span>
                    <span class="button" style="padding: 5px 20px;" @click="backToIndex">{{ $t('home.forget_password.redirect') }} </span>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import BNRouteHelper from '~/utils/BNRouteHelper';
import BNService from '~/services/BNService';

export default {
    layout: 'single',
    middleware: 'auth',
    data: function () {
        return {
            step: 1,
            email: '',
            verify_code: '',
            password: '',
            password_confirmation: ''
        };
    },
    head: function() {
        return {
            title: this.$t('links.site_name')
        };
    },
    methods: {
        onSubmit: function() {
            BNService.forgetPassword(
                this.email
            ).then((data) => {
                if (data.code === 200) {
                    this.step = 2;
                } else {
                    this.$Message.success(this.$t('default.invalid_email'));
                }
            }).catch((err) => {
                if (err && err.message) {
                    this.$Message.error(err.message);
                } else {
                    this.$Message.error(this.$t('default.common_error'));
                }
            });
        },
        resetPassword() {
            if (this.password !== this.password_confirmation) {
                this.$Message.error(this.$t('home.forget_password.pwd_different'));
                return;
            }
            BNService.newPassword(
                this.verify_code,
                this.email,
                this.password,
                this.password_confirmation
            ).then((data) => {
                if (data.code === 200) {
                    this.step = 3;
                    setTimeout(function () {
                        BNRouteHelper.home(this.$router);
                    }.bind(this), 5000);
                } else {
                    this.$Message.success(this.$t('default.pwd_didnt_match'));
                }
            }).catch((err) => {
                if (err && err.message) {
                    this.$Message.error(err.message);
                } else {
                    this.$Message.error(this.$t('default.common_error'));
                }
            });
        },
        backToIndex() {
            BNRouteHelper.home(this.$router);
        }
    }
};
</script>

<style scoped>
    .top {
        background: #338bd8;
        padding: 0px 20px;
        color: #fff;
        height: 50px;
        line-height: 50px;
    }
    .step_tip {
        display: flex;
        width: 100%;
        justify-content: center;
    }
    .step_num {
         border-radius: 30px;
         width: 30px;
         height: 30px;
         line-height: 30px;
         text-align: center;
         border: 1px solid #ddd;
         margin: 5px;
         color: #aaa;
     }
    .step_num_out {
        line-height: 30px;
        text-align: center;
        border: 1px solid #338bd8;
        margin: 5px;
        color: #338bd8;
    }
    .step_num_divide {
        width: 200px;
        height: 1px;
        border-bottom: 1px solid #ddd;
        padding: 8px;
    }
    .step_num_divid_blue {
        border-bottom: 1px solid #ddd !important;
    }
    .button-wrapper, .input_wrapper {
        text-align: center;
        margin: 40px;
    }
    .input_wrapper input {
        width: 250px;
        border: 1px solid #ddd;
        height: 30px;
        border-radius: 3px;
        padding-left: 10px;
    }
    .button-wrapper .button {
        background-color: #338bd8;
        font-size: 20px;
        border-radius: 3px;
        text-align: center;
        color: #ffffff;
        padding: 5px 100px;
        cursor: pointer;
    }
    .step_num_cur {
        background-color: #338bd8;
        color: #fff;
    }
    .redirect {
        background-color: #bbb;
        color: #fff;
        padding: 5px 20px;
        font-size: 24px;
        margin-right: 10px;
    }
</style>
