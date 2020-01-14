/*
在线老师主页，个人资料编辑页面
*/
<template>
    <CenterLayout activeName="c4" class="nt-information">
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
                        <Select style="min-width:120px;max-width:200px;width: 20vw;"
                                @on-change="changeProvinces"
                                v-bind:placeholder="province"
                                :disabled="!!state" value="北京">
                            <Option v-for="(province,index) in provinces" :value="index" :key="index">
                                {{ province.name }}
                            </Option>
                        </Select>
                        <Select style="min-width:120px;max-width:200px;width: 20vw;margin-left:15px;" @on-change="changeCites" v-bind:placeholder="city" :disabled="!!state">
                            <Option v-for="(city,index) in cities" :value="index" :key="index">
                                {{ city.name }}
                            </Option>
                        </Select>
                        <Select style="min-width:120px;max-width:200px;width: 20vw;margin-left:15px;" @on-change="changeAreas" v-bind:placeholder="region" :disabled="!!state">
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
            </Form>
        </div>
    </CenterLayout>
</template>

<script>
    import BNService from '~/services/BNService';
    import CenterLayout from '~/components/TeacherCenter.vue';
    import ChinaCities from '~/assets/javascripts/ChinaCities';

    export default {
        layout: 'teacher',
        middleware: ['secret'],
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
                    school: ''
                },
                labelWidth: 150,
                provinces: ChinaCities,
                cities: [],
                area: []
            };
        },
        computed: {
            province() {
                if (this.informationForm.address && this.informationForm.address.province) return this.informationForm.address.province;
                return this.$t('exam.select');
            },
            city() {
                if (this.informationForm.address && this.informationForm.address.city) return this.informationForm.address.city;
                return this.$t('exam.select');
            },
            region() {
                if (this.informationForm.address && this.informationForm.address.region) return this.informationForm.address.region;
                return this.$t('exam.select');
            }
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
                const information = await BNService.teacherInfo();
                this.informationForm = Object.assign({}, information);
            },
            async handleSubmit() {
                const res = await BNService.saveTeacgerInfo(this.informationForm);
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
                    this.informationForm.address.province = this.provinces[key].name;
                }
                this.cities = cities;
                this.area = [];
                this.informationForm.address.city = this.$t('exam.select');
                this.informationForm.address.region = this.$t('exam.select');
            },
            changeCites(key) {
                let area = [];
                if (this.cities[key].sub) {
                    area = this.cities[key].sub;
                    this.informationForm.address.city = this.cities[key].name;
                }
                this.area = area;
                this.informationForm.address.region = this.$t('exam.select');
            },
            changeAreas(key) {
                this.informationForm.address.region = this.area[key].name;
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