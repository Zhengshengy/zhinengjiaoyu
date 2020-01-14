<template>
    <div slot="content" class="message">
        <div style="font-size: 18px;">{{ $t('notice.message') }}</div>
        <Divider style="margin: 10px auto" />
        <div v-for="(item, key) in dataList" class="item">
            <div class="primary">
                <div class="avatar"><Icon type="md-notifications" :size="50" color="#2d8cf0" /></div>
                <div class="center">
                    <p class="title">{{ item.from_name }}</p>
                    <div class="content-small" @click="item.isOpen = !item.isOpen" v-if="!item.isOpen">
                        {{ item.content }}
                    </div>
                    <div class="content" @click="item.isOpen = !item.isOpen" v-else>
                        {{ item.content }}
                    </div>
                </div>
                <div style="float: right;line-height: 50px;margin-left: 60px">
                        <Icon type="md-trash"  size="24" color="#2d8cf0" @click="destroy(key)"  />
                 </div>
            </div>
            <div class="secondary">
                <div class="time">{{ item.created_at }}</div>
            </div>
            <Divider style="margin: 10px auto" />
        </div>
        <Page :total="total" :page-size="pageSize" style="margin-top: 10px;float: right" @on-change="changepage" />
    </div>
</template>

<script>
    import BNService from '~/services/BNService';
    export default {
        name: 'notice',
        layout: 'tutor',
        middleware: ['secret', 'tutor'],

        data() {
            return {
                dataList: false,
                total: 0,
                pageSize: 0
            }
        },

        async mounted() {
            this.dataReady = false;
            BNService.getTeacherMessage().then((data) => {
                this.total = data.total
                this.pageSize = data.per_page
                this.method(data.data)
            });
        },

        methods: {
            method(data){
                data.forEach(function (v, k) {
                    data[k].isOpen = false;
                })
                this.dataList = data;
            },
            destroy: function (key) {
                let that = this;
                this.$Modal.confirm({
                    title: this.$t('notice.system_hint'),
                    content: this.$t('notice.confirm_hint'),
                    onOk: () => {
                        BNService.teacherMessageDelete(this.dataList[key].id).then((data) => {
                            BNService.getTeacherMessage().then((data) => {
                                this.total = data.total
                                this.pageSize = data.per_page
                                this.method(data.data)
                                that.dataList.splice(key, 1)
                                that.$Message.success(this.$t('notice.succeed_tip'));
                            });
                        })
                    },
                });
            },
            changepage(index){
                BNService.getTeacherMessage(index).then((data) => {
                    this.method(data)
                });
            }
        },
    }
</script>

<style scoped>
    .message .item .primary {
        display: flex;
    }

    .message .item .primary .avatar {
        flex: 0 0 8%
    }

    .message .item .primary .center .title {
        font-size: 16px;color: #ed4014;
    }

    .message .item .primary .center .content-small {
        overflow: hidden;text-overflow: ellipsis;width: 60vw;white-space: nowrap;cursor: pointer;
    }

    .message .item .primary .center .content {
        cursor: pointer;
        width: 60vw
    }

    .message .item .secondary {
        display: flex;justify-content: space-between;margin-left: 8%;margin-right: 5%
    }

    .message .item .secondary .time {
        color: #9ea7b4;font-size: 12px
    }

    .message .item .secondary .delete {
        font-size: 12px
    }
</style>