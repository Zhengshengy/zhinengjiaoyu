/*
    用户主页，个人资料编辑页面
*/
<template>
    <CenterLayout activeName="c3" class="nt-information">
        <div slot="content">
            <Form ref="informationForm" :model="informationForm" :label-width="180" class="nt-infor-cont">
                <Row class-name="pull-right">
                    <FormItem v-if="state===0">
                        <Button @click="toggleState(1)">{{$t('center.cancel')}}</Button>
                        <Button type="primary" @click="handleSubmit" style="margin-left: 8px">{{$t('center.save')}}</Button>
                    </FormItem>
                    <FormItem v-else>
                        <Button type="primary" @click="toggleState(0)">{{$t('center.edit')}}</Button>
                    </FormItem>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem v-bind:label="$t('center.first_name')" >
                            <Input v-model="informationForm.first_name" :disabled="!!state"/>
                        </FormItem>
                    </Col>
                    <Col span="8">
                        <FormItem v-bind:label="$t('center.second_name')">
                            <Input v-model="informationForm.last_name" :disabled="!!state"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem v-bind:label="$t('center.sex')">
                        <RadioGroup v-model="informationForm.sex">
                              <Radio :label="1" :disabled="!!state">{{$t('types.sex.man')}}</Radio>
                              <Radio :label="2" :disabled="!!state">{{$t('types.sex.woman')}}</Radio>
                        </RadioGroup>
                    </FormItem>
                </Row>
                <Row>
                    <FormItem v-bind:label="$t('center.location')">
                        <Select style="min-width:120px;max-width:200px;width: 20vw;" @on-change="changeProvinces" v-bind:placeholder="$t('exam.select')" :disabled="!!state">
                            <Option v-for="(province,index) in provinces" :value="index" :key="index">
                                {{ province.name }}
                            </Option>
                        </Select>
                        <Select style="min-width:120px;max-width:200px;width: 20vw;margin-left:15px;" @on-change="changeCites" v-bind:placeholder="$t('exam.select')" :disabled="!!state">
                            <Option v-for="(city,index) in cities" :value="index" :key="index">
                                {{ city.name }}
                            </Option>
                        </Select>
                        <Select style="min-width:120px;max-width:200px;width: 20vw;margin-left:15px;" v-bind:placeholder="$t('exam.select')" :disabled="!!state">
                            <Option v-for="(item,index) in area" :value="index" :key="index">
                                {{ item.name }}
                            </Option>
                        </Select>
                    </FormItem>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem v-bind:label="$t('center.phone_no')">
                            <Input class="information-input" v-model="informationForm.mobile" :disabled="!!state"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                        <FormItem v-bind:label="$t('center.school')">
                            <Input class="information-input" v-model="informationForm.school" :disabled="!!state"/>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                      <FormItem v-bind:label="$t('center.grade')">
                          <Input class="information-input" v-model="informationForm.grade" :disabled="!!state"/>
                      </FormItem>
                    </Col>
                </Row>
                <!--<div v-for="(teacher,index) in informationForm.teachers" :key="`teacher${index}`">-->
                    <!--<Row>-->
                        <!--<Col span="1" pull="1">-->
                            <!--<FormItem v-bind:label="`${$t('types.roles.teacher')}（${teachersLabel[index]}）`"></FormItem>-->
                        <!--</Col>-->
                        <!--<Col span="7">-->
                            <!--<FormItem v-bind:label="$t('center.first_name')">-->
                                <!--<Input class="information-input" v-model="teacher.first_name" :disabled="!!state"/>-->
                            <!--</FormItem>-->
                        <!--</Col>-->
                        <!--<Col span="7">-->
                            <!--<FormItem v-bind:label="$t('center.second_name')">-->
                                <!--<Input class="information-input" v-model="teacher.last_name" :disabled="!!state"/>-->
                            <!--</FormItem>-->
                        <!--</Col>-->
                        <!--<Col span="7">-->
                            <!--<FormItem v-bind:label="$t('center.phone_no')">-->
                                <!--<Input class="information-input" v-model="teacher.mobile" :disabled="!!state"/>-->
                            <!--</FormItem>-->
                        <!--</Col>-->
                    <!--</Row>-->
                <!--</div>-->
                <!--<div v-for="(parent,index) in informationForm.parents" :key="`parent${index}`">-->
                    <!--<Row>-->
                        <!--<Col span="1" pull="1">-->
                            <!--<FormItem v-bind:label="`${$t('types.roles.parents')}（${parentsLabel[index]}）`"></FormItem>-->
                        <!--</Col>-->
                        <!--<Col span="7">-->
                            <!--<FormItem v-bind:label="$t('center.first_name')">-->
                                <!--<Input class="information-input" v-model="parent.first_name" :disabled="!!state"/>-->
                            <!--</FormItem>-->
                        <!--</Col>-->
                        <!--<Col span="7">-->
                            <!--<FormItem v-bind:label="$t('center.second_name')">-->
                                <!--<Input class="information-input" v-model="parent.last_name" :disabled="!!state"/>-->
                            <!--</FormItem>-->
                        <!--</Col>-->
                        <!--<Col span="7">-->
                            <!--<FormItem v-bind:label="$t('center.phone_no')">-->
                                <!--<Input class="information-input" v-model="parent.mobile" :disabled="!!state"/>-->
                            <!--</FormItem>-->
                        <!--</Col>-->
                    <!--</Row>-->
                <!--</div>-->

            </Form>
        </div>
    </CenterLayout>
</template>

<script>
import BNService from '~/services/BNService';
import CenterLayout from '~/components/CenterLayout.vue';
import ChinaCities from '~/assets/javascripts/ChinaCities';

export default {
    layout: 'single',
    middleware: ['secret', 'center'],
    components: {
        CenterLayout
    },
    data() {
        return {
            state: 1,   // 0 编辑状态 1 预览状态
            teachersLabel: [
                this.$t('subject.math'),
                this.$t('subject.physics'),
                this.$t('subject.chemistry'),
                this.$t('subject.biology')
            ],
            parentsLabel: [
                this.$t('number.one'),
                this.$t('number.two'),
                this.$t('number.three')
            ],
            informationForm: {
                first_name: '',
                last_name: '',
                sex: 1,
                mobile: '',
                school: '',
                grade: '',
                teachers: [
                    { first_name: '', last_name: '', mobile: '' },
                    { first_name: '', last_name: '', mobile: '' },
                    { first_name: '', last_name: '', mobile: '' },
                    { first_name: '', last_name: '', mobile: '' },
                ],
                parents: [
                    { first_name: '', last_name: '', mobile: '' },
                    { first_name: '', last_name: '', mobile: '' },
                    { first_name: '', last_name: '', mobile: '' },
                ]
            },
            labelWidth: 150,
            provinces: ChinaCities,
            cities: [],
            area: []
        };
    },
    mounted() {
        this.getInformation();
    },
    methods: {
        async getInformation() {
            const userInfo = {
                first_name: '',
                last_name: '',
                mobile: '',
            };
            const information = await BNService.userInfo();
            const teachers = information.teachers || [];
            const parents = information.parents || [];
            for (let i = 1; i <= 3; i += 1) {
                if (teachers.length < i) {
                    teachers.push(Object.assign({}, userInfo));
                }
                if (parents.length < i) {
                    parents.push(Object.assign({}, userInfo));
                }
            }
            this.informationForm = Object.assign({}, information, { teachers, parents });
        },
        async handleSubmit() {
            const res = await BNService.saveUserInfo(this.informationForm);
            if (res.code === 200) {
                this.state = 1;
            }
        },
        toggleState(state) {
            if (state === 1) {
                // this.$refs['informationForm'].resetFields();
                this.getInformation();
            }
            this.state = state;
        },
        changeProvinces(key) {
            let cities = [];
            if (this.provinces[key].sub) {
                cities = this.provinces[key].sub;
            }
            this.cities = cities;
            this.area = [];
        },
        changeCites(key) {
            let area = [];
            if (this.cities[key].sub) {
                area = this.cities[key].sub;
            }
            this.area = area;
        }
    }
};
</script>

<style scoped>
    .pull-right{
        text-align: right;
    }
    .information-input {
        min-width: 80px;
    }
</style>