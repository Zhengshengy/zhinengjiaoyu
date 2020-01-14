/*
    锁屏页面
*/
<template>
    <div class="unlock-con-wrap">
        <div class="unlock-con">
            <transition name="show-unlock">
                <div class="unlock-body-con" v-if="showUnlock" @keydown.enter="handleUnlock">
                    <div @click="handleClickAvator" class="unlock-avator-con" :style="{ marginLeft: avatorLeftCon }">
                        <!-- <img class="unlock-avator-img" :src="avatorPath"> -->
                        <div class="unlock-avator-name" >
                            {{userName}}
                        </div>
                        <div class="unlock-avator-cover">
                            <span><Icon type="unlocked" ></Icon></span>
                            <p>{{$t('lock.unlock')}}</p>
                        </div>
                    </div>
                    <div class="unlock-avator-under-back" :style="{marginLeft: avatorLeft}"></div>
                    <div class="unlock-input-con">
                        <div class="unlock-input-overflow-con">
                            <div class="unlock-overflow-body" :style="{right: inputLeft}">
                                <input ref="inputEle" v-model="password" class="unlock-input" type="password"
                                       v-bind:placeholder="$t('lock.password_input')" />
                                <button ref="unlockBtn" @mousedown="unlockMousedown" @mouseup="unlockMouseup"
                                        @click="handleUnlock" class="unlock-btn">
                                    <Icon color="white" type="key"></Icon>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="unlock-locking-tip-con">{{$t('lock.locked')}}</div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import '~/assets/styles/lockscreen/index.scss';
import Cookies from 'js-cookie';
import { mapActions, mapGetters } from 'vuex';
import Constants from '~/actions/Constants';
import BNUtils from '~/utils/BNUtils';
import BNConstants from '~/utils/BNConstants';
import BNRouteHelper from '../../utils/BNRouteHelper';

export default {
    data() {
        return {
            avatorLeftCon: '5px',
            avatorLeft: '0px',
            inputLeft: '400px',
            password: '',
            check: null,
            showUnlock: false
        };
    },
    computed: {
        avatorPath() {
            return localStorage.avatorImgPath;
        },
        userName() {
            return BNUtils.getUserName();
        }
    },
    mounted() {
        this.showUnlock = true;
        BNUtils.setKeyValue(BNConstants.COOKIES.LOCK, 1);
    },
    methods: {
        validator() {
            if (this.password.trim().length < 1) {
                return false;
            }
            return true;
        },
        handleClickAvator() {
            this.avatorLeftCon = '-175px';
            this.avatorLeft = '-180px';
            this.inputLeft = '0px';
            this.$refs.inputEle.focus();
        },
        handleUnlock() {
            if (this.validator()) {
                this.unLock({ name: BNUtils.getUserName(), password: this.password }).then(data => {
                    BNUtils.clearKeyValue(BNConstants.COOKIES.LOCK);
                    BNRouteHelper.lastPage(this.$router);
                }).catch((err) => {
                    if (err && err.message) {
                        this.$Message.error(err.message);
                    } else {
                        this.$Message.error(this.$t('lock.unlock_failed'));
                    }
                });
            } else {
                this.$Message.error(this.$t('lock.unlock_failed'));
            }
        },
        unlockMousedown() {
            this.$refs.unlockBtn.className = 'unlock-btn click-unlock-btn';
        },
        unlockMouseup() {
            this.$refs.unlockBtn.className = 'unlock-btn';
        },
        ...mapActions({
            unLock: Constants.ME.UN_LOCK
        })
    }
};
</script>