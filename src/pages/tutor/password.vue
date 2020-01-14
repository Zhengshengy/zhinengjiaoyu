<template>
    <Form :model="formInline" label-position="top" :rules="validate" ref='formInline'>
        <div style="font-size: 18px;">{{ $t('password.revamp') }}</div>
        <Divider />
        <FormItem :label="this.$t('password.oldpass')" prop="oldpass">
            <Input type="password" v-model="formInline.oldpass" size="large" style="width:300px;"
                   :placeholder="this.$t('password.oldpass_tip')"></Input>
        </FormItem>
        <FormItem :label="this.$t('password.newpass')" prop="newpass">
            <Input type="password" v-model="formInline.newpass" size="large" style="width:300px;"
                   :placeholder="this.$t('password.newpass_tip')"></Input>
        </FormItem>
        <FormItem :label="this.$t('password.newpass1')" prop="newpass1">
            <Input type="password" v-model="formInline.newpass1" size="large" style="width:300px;"
                   :placeholder="this.$t('password.newpassl_tip')"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">{{ $t('password.save') }}</Button>
        </FormItem>
    </Form>
</template>
<script>
import BNService from '~/services/BNService'
export default {
        layout: 'tutor',
        middleware: ['secret','tutor'],
        data() {
             const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('password.empty_tip')));
                } else {
                    if (this.formInline.newpass1 !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formInline.validateField('newpass1');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('password.newpassl_tip')));
                } else if (value !== this.formInline.newpass) {
                    callback(new Error(this.$t('password.consistent_tip')));
                } else {
                    callback();
                }
            };
            return {
                formInline: {
                    oldpass: '',
                    newpass: '',
                    newpass1: '',
                },
                validate: {
                    oldpass: [
                        {required: true, message: this.$t('password.empty_tip'), trigger: 'blur'}
                    ],
                    newpass: [
                        {required: true, message: this.$t('password.empty_tip'), trigger: 'blur'},
                        {
                            type: 'string',
                            pattern: /^[a-zA-Z]+[a-z0-9A-Z\W]{5,10}.*$/,
                            message: this.$t('password.string_tip'),
                            trigger: 'blur'
                        },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    newpass1: [
                        {required: true, message: this.$t('password.newpassl_tip'), trigger: 'blur'},
                        { validator: validatePassCheck, trigger: 'blur' },
                        {
                            type: 'string',
                            pattern: /^[a-zA-Z]+[a-z0-9A-Z\W]{5,10}.*$/,
                            message: this.$t('password.string_tip'),
                            trigger: 'blur'
                        },
                    ],
                },
            }
        },
        methods: {
            handleSubmit (name) {
               this.$refs[name].validate((valid) => {
                    if (valid) {
                         BNService.teacherPassword(this.formInline).then((data) => {
                             if( data.code == 200 ){
                                 this.$Message.success(this.$t('password.succeed_tip'))
                             }
                        }).catch((e) => {
                             this.$Message.error(this.$t('password.original_tip'))}
                         )} else {
                        this.$Message.error(this.$t('password.failure_tip'));
                    }
                })
            },
        }
    }
</script>
