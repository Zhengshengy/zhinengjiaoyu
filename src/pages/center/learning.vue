<template>
    <div style="width: 80%;margin: 20px auto">
        <div class="demo-split">
            <Split v-model="split3">
                <div slot="left" class="demo-split-pane">
                    <div class="top"
                         style="border-bottom: 1px solid #dcdee2;height: 45px;font-size: 14px;line-height: 45px;text-align: center;cursor: pointer">
                        <div style="float: left">
                            <div style="float: left;width: 70px;">{{$t('classroom.whiteboard')}}</div>
                        </div>
                        <Button type="info" style="float: right;height: 70%;margin: 1% 15px 0 0;line-height: 100%"
                                @click="quit">{{$t('classroom.endConsultation')}}
                        </Button>
                    </div>
                    <div class="col-md-6" style="position: relative">
                        <div id="paint_box"></div>
                    </div>
                </div>
                <div slot="right" class="demo-split-pane no-padding">
                    <Split v-model="split4" mode="vertical">
                        <div slot="top" class="demo-split-pane" style="height: 100%;">
                            <div style="height: 15%;border-bottom: 1px solid #cccccc;text-align: center">
                                <div class="classText" :class="{'actives':indText === 1}" @click="startRTC">
                                    {{$t('classroom.camera')}}
                                </div>
                                <div class="classText" :class="{'actives':indText === 2}" @click="text"
                                     style="border-right: 0px">{{$t('classroom.test')}}
                                </div>
                            </div>
                            <div style="height: 85%;" v-if="classification==1">
                                <div class="cutindex" v-if="indcut==0">
                                    <div :class="me_video">
                                        <video id="local_video" muted="true" autoplay playsinline></video>
                                    </div>
                                    <div :class="remote_video" v-for="(value, key, index) in remoteVideos"
                                         @click="conversion(0)">
                                        <div class="col-md-1">
                                            <video :id="key" class="barderVideo" autoplay playsinline></video>
                                        </div>
                                    </div>
                                </div>
                                <div class="cutindex" v-else-if="indcut==1">
                                    <div :class="me_video" @click="conversion(1)">
                                        <video id="local_video" muted="true" autoplay playsinline></video>
                                    </div>
                                    <div :class="remote_video" v-for="(value, key, index) in remoteVideos">
                                        <div class="col-md-1">
                                            <video :id="key" class="barderVideo" autoplay
                                                   playsinline></video>
                                        </div>
                                    </div>
                                </div>
                                <div class="cutindex" v-else-if="indcut==2">
                                    <div class="remoteced" v-for="(value, key, index) in remoteVideos">
                                        <div class="col-md-1">
                                            <video :id="key" class="barderVideo" autoplay playsinline></video>
                                        </div>
                                    </div>
                                    <div class="row" style="position: absolute;left: 20px;bottom: 0;cursor: pointer">
                                        <Icon type="md-eye" size="24" @click="toggleCamera" v-if="enableCamera==true"/>
                                        <Icon type="md-eye-off" size="24" @click="toggleCamera"
                                              v-else-if="enableCamera==false"/>
                                        <Icon type="ios-mic" size="24" @click="toggleMic" v-if="enableMic==true"/>
                                        <Icon type="ios-mic-off" size="24" @click="toggleMic"
                                              v-else-if="enableMic==false"/>
                                    </div>
                                </div>
                                <div class="row" style="position: absolute;left: 20px;bottom: 0;cursor: pointer"
                                     v-if="indcut==0||indcut==1">
                                    <Icon type="md-eye" size="24" @click="toggleCamera" v-if="enableCamera==true"/>
                                    <Icon type="md-eye-off" size="24" @click="toggleCamera"
                                          v-else-if="enableCamera==false"/>
                                    <Icon type="ios-mic" size="24" @click="toggleMic" v-if="enableMic==true"/>
                                    <Icon type="ios-mic-off" size="24" @click="toggleMic" v-else-if="enableMic==false"/>
                                </div>
                            </div>
                            <div style="height: 85%;margin-left: 10px" v-if="classification==2&&type==1"
                                 v-for="(item, index) in imglist" :key="index">
                                <img class="preview-img" style="width: 100%;height: 100%" :src=item.src alt=""
                                     v-on:click="show(index)">
                            </div>
                            <div style="height: 85%;margin-left: 10px" v-if="classification==2&&type==2">
                                <video width="100%" height="100%" controls >
                                    <source :src="videourl" type="video/ogg">
                                    <object data="movie.mp4" width="320" height="240">
                                        <embed width="320" height="240" src="movie.swf">
                                    </object>
                                </video>
                            </div>
                        </div>
                        <div slot="bottom" class="demo-split-pane" style="height: 100%">
                            <div class="con">
                                <ul class="im-log-box">
                                    <li v-for="msg in msgs">
                                        <span class="send">{{msg.send}}</span>
                                        <span class="content">{{msg.content}}</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="bot" style="line-height: 100%">
                                <input type="text" v-model="imMsg.common.data" size="large" placeholder="发送聊天内容"
                                       @keyup.enter="sendMsg"
                                       style="display:inline-block;width: 60%;margin-left: 20px;background-color:transparent;border:0;outline: none;height: 100%"/>
                                <Icon type="logo-snapchat" size="20"/>
                                <Button type="info" @click="sendMsg"
                                        style="float: right;height: 70%;margin: 2.5% 15px 0 0;line-height: 100%">发送
                                </Button>
                            </div>
                        </div>
                    </Split>
                </div>
            </Split>
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Modal v-model="model" :closable="false" style="padding-left: 20%;text-align: center;">
            <h3 style="margin-top: 30px;font-size: 20px">
                {{$t('order.give')}}{{$t('order.Theteacher')}}</h3>
            <p style="font-size: 18px">{{$t('order.grade')}}</p>
            <Rate v-model="value" icon="md-happy" style="font-size: 45px;color:#0087DD "/>
            <div class="butto" style="margin-bottom: 55px" @click="submit">{{$t('order.evaluate')}}</div>
        </Modal>
    </div>
</template>
<script>
    import BNService from '~/services/BNService';
    import BNConstants from '~/utils/BNConstants';
    import BNUtils from '~/utils/BNUtils';

    export default {
        layout: 'single',
        middleware: ['secret', 'center'],
        head: {
            script: [
                {src: "https://sqimg.qq.com/expert_qq/webrtc/2.6/WebRTCAPI.min.js"},
                {src: "https://sqimg.qq.com/expert_qq/webim/1.7.1/webim.min.js"},
                {src: "https://sqimg.qq.com/expert_qq/edu/2.2.3/board_sdk.mini.js"},
                {src: "https://sqimg.qq.com/expert_qq/cos/5.0.0/cos.mini.js"},
                {src: "https://sqimg.qq.com/expert_qq/TICSDK/1.3.1/TICSDK.mini.js"},
            ],
        },

        data() {
            return {
                videourl:null,
                type: null,
                me_video: 'me_video',
                remote_video: 'remote_video',
                grade: null,
                exercise: "",
                imglist: '',
                timer: null,
                teacher_id: null,
                order_id: null,
                value: 0,
                indcut: 0,
                model: false,
                time_length: BNConstants.CONSULTING.TIME_LENGTH,
                minute: BNConstants.CONSULTING.MINUTE,
                qId: "",
                course: "",
                spinShow: true,
                stuOrder: null,
                classification: 1,
                split3: 0.7,
                split4: 0.5,
                visible: false,
                step: 'first',
                pushModel: 1, // 1  自动推流 0 手动推流
                account: "",
                userID: "",
                sdkAppId: null,
                userSig: "",
                // nickName: sessionStorage.getItem('IIC_NICKNAME'),
                roomInfo: '',
                roomID: null,
                isTeacher: 0,
                indText: 0,
                enableCamera: true,
                enableMic: true,
                msgs: [],
                isPushing: 0, // 是否正在推流
                isPushCamera: 0, // 是否推摄像头流
                devices: {
                    camera: [],
                    mic: []
                },

                cameraIndex: 0,
                micIndex: 0,

                imMsg: {
                    common: {},
                    custom: {}
                },

                boardData: {
                    data: {
                        current: null,
                        list: []
                    },
                    page: {
                        current: 0,
                        total: 0
                    }
                },

                loginConfig: {
                    identifier: null,
                    identifierNick: null,
                    userHeadImg: null,
                    userSig: null,
                    sdkAppId: null
                },

                webrtcConfig: {
                    closeLocalMedia: true,
                    audio: true,
                    video: true,
                    role: null
                },

                boardConfig: {
                    id: null,
                    canDraw: null,
                    color: null,
                    globalBackgroundColor: null
                },

                cosConfig: {
                    appid: null,
                    bucket: null,
                    region: null,
                    sign: null
                },

                remoteVideos: {}
            }
        },

        async mounted() {
            this.grade = this.$route.query.grade
            this.type = +this.$route.query.type
            if (this.type == 1) {
                this.exercise = this.$route.query.exercise
                BNService.getTextImg(this.exercise, this.type).then((data) => {
                    this.imglist = BNUtils.buildExerciseImages(data.url + '/q', data.q_image_count)
                })
            } else if (this.type == 2) {
                this.exercise = this.$route.query.videoid
                BNService.getTextImg(this.exercise, this.type).then((data) => {
                    this.videourl = '/src/'+data.path
                })
            }

            this.course = BNUtils.readCookie(BNConstants.COOKIES.COURSE);
            BNService.noreview().then((data) => {
                BNService.getStusign().then((data) => {
                    this.start()
                    this.account = data.user_id
                    this.userID = data.user_id
                    this.sdkAppId = data.appid
                    this.userSig = data.sign
                })
            }).catch(() => {
                this.$Message.error(this.$t('classroom.consultingTea'))
                setTimeout(function () {
                    window.opener = null;
                    window.open('', '_self');
                    window.close();
                }, 2000)
            })
            // window.onbeforeunload = (e) => {
            //     var e = window.event || e;
            //     e.returnValue = ("确定离开当前页面吗？");
            // }

        },
        methods: {
            // 创建或者进入课堂
            start() {
                BNService.getAskfind({course: this.course, grade: this.grade, exercise: this.exercise,type:this.type}).then((data) => {
                    this.roomID = data.room_id
                    this.qId = data.id
                    this.teacher_id = data.user_id
                    this.init();
                }).catch(() => {
                    this.$Message.error(this.$t('classroom.no_teacher'))
                    setTimeout(function () {
                        window.opener = null;
                        window.open('', '_self');
                        window.close();
                    }, 2000)
                });
            },
            time() {
                this.timer = setTimeout(() => {
                    let obj = {}
                    obj.id = this.stuOrder
                    obj.end_time = Math.round(new Date().getTime() / 1000).toString()
                    BNService.postUpdate(obj).then((data) => {
                        if (data.minute <= this.minute) {
                            this.$Message.warning({
                                content: `${this.$t('classroom.not_enough')},${this.minute}${this.$t('classroom.closed')}`,
                                duration: this.minute * 60,
                                closable: true
                            })
                            window.clearTimeout(this.timer)
                            let close = this.minute * 60 * 1000
                            setTimeout(() => {
                                this.ticSdk.quitClassroom();
                                this.model = true
                                this.deduction()
                            }, close)
                        } else {
                            this.time()
                        }
                    })
                }, this.time_length)

            },
            initData() {
                this.msgs = [];

                this.devices = {
                    camera: [],
                    mic: []
                };

                this.cameraIndex = 0;
                this.micIndex = 0;

                this.imMsg = {
                    common: {
                        data: '',
                        toUser: ''
                    },
                    custom: {
                        data: '',
                        desc: '',
                        ext: '',
                        toUser: ''
                    }
                };

                this.loginConfig = {
                    identifier: this.account,
                    identifierNick: '用户昵称' + this.account,
                    userSig: this.userSig,
                    sdkAppId: this.sdkAppId,
                    accountType: 1
                };
                this.webrtcConfig = {
                    closeLocalMedia: true,
                    audio: true,
                    video: true,
                    role: 'user'
                };

                this.boardConfig = {
                    id: 'paint_box',
                    canDraw: this.isTeacher, // 老师能画，学生不能画
                }

                this.enableCamera = true;
                this.enableMic = true;
            },

            init() {
                this.initData();
                this.ticSdk = null;
                this.ticSdk = new TICSDK();

                this.ticSdk.init();
                this.initEvent();
                this.ticSdk.login(this.loginConfig);
            },

            initEvent() {
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.CONNECTION_EVENT, res => {
                    switch (res.ErrorCode) {
                        case webim.CONNECTION_STATUS.ON:
                            console.log('连接状态正常...');
                            break;
                        case webim.CONNECTION_STATUS.OFF:
                            this.showErrorTip('连接已断开，无法收到新消息，请检查下你的网络是否正常');
                            console.error('连接已断开，无法收到新消息，请检查下你的网络是否正常');
                            break;
                        default:
                            // this.showErrorTip('未知连接状态,status=' + res.ErrorCode);
                            console.error('未知连接状态,status=' + res.ErrorCode);
                            break;
                    }
                });

                // IM登录成功后，老师创建课堂，学生则加入课堂
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.LOGIN_SUCC, res => {
                    // this.showTip('IM 登录成功');

                    if (this.isTeacher) {
                        // 老师就创建课堂
                        this.ticSdk.createClassroom({
                            roomID: this.roomID,
                            roomType: 'Public'
                        });
                    } else { // 如果是学生
                        // 有了课堂后就直接加入
                        this.roomID && this.ticSdk.joinClassroom(this.roomID, this.webrtcConfig, this.boardConfig);
                    }
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.LOGIN_ERROR, err => {
                    // this.showErrorTip('IM 登录失败');
                    console.error('IM 登录失败', err);
                    window.location.reload()
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.GROUP_IS_ALREADY_USED_ERROR, err => {
                    this.showErrorTip('房间已经被使用，请换其他房间');
                    console.error('房间已经被使用，请换其他房间', err);
                });

                // 老师创建了课堂后，则需要进入课堂
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.CREATE_CLASS_ROOM_SUCC, (res) => {
                    console.log('TICSDK.CONSTANT.EVENT.TIC.CREATE_CLASS_ROOM_SUCC');
                    // this.showTip('创建课堂成功');

                    // 如果是老师
                    if (this.isTeacher) {
                        this.roomID && this.ticSdk.joinClassroom(this.roomID, this.webrtcConfig, this.boardConfig);
                    }
                });

                // this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.HISTROY_DATA_COMPLETE, () => {
                //     this.showTip('历史数据加载完成');
                //     console.log('TICSDK.CONSTANT.EVENT.BOARD.HISTROY_DATA_COMPLETE');
                // });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.CREATE_CLASS_ROOM_ERROR, res => {
                    // this.showErrorTip('创建课堂失败');
                    console.log('TICSDK.CONSTANT.EVENT.TIC.CREATE_CLASS_ROOM_ERROR');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.INIT_SUCC, res => {
                    // this.showTip('WebRTC初始化成功');
                    console.log('TICSDK.CONSTANT.EVENT.WEBRTC.INIT_SUCC');

                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.INIT_ERROR, err => {
                    console.log('TICSDK.CONSTANT.EVENT.WEBRTC.INIT_ERROR');
                    // this.showErrorTip('WebRTC初始化失败');
                });
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.LOCAL_STREAM_ADD, data => {
                    document.getElementById('local_video').srcObject = data.stream;
                    this.isPushing = 1; // 正在推流
                    this.showTip('开启摄像头成功');
                });
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.REMOTE_STREAM_UPDATE, data => {
                    this.$set(this.remoteVideos, data.videoId, data);
                    this.$nextTick(() => {
                        if (document.getElementById(data.videoId)) {
                            document.getElementById(data.videoId).srcObject = data.stream;
                        }
                    });
                    // this.showTip('WebRTC接收到远端流');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.REMOTE_STREAM_REMOVE, data => {
                    this.$delete(this.remoteVideos, data.videoId);
                    this.showTip('对方视频断开');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.PEER_CONNECTION_ADD, data => {
                    console.log('WebRTC PEER_CONNECTION_ADD');
                    // this.showTip('WebRTC PEER_CONNECTION_ADD');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.ERROR_NOTIFY, data => {
                    console.log('WebRTC ERROR_NOTIFY');
                    // this.showTip('WebRTC ERROR_NOTIFY');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.WEBSOCKET_NOTIFY, data => {
                    console.log('WebRTC WEBSOCKET_NOTIFY');
                    // this.showTip('WebRTC WEBSOCKET_NOTIFY');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.WEBRTC.STREAM_NOTIFY, data => {
                    console.log('WebRTC STREAM_NOTIFY');
                    // this.showTip('WebRTC STREAM_NOTIFY');
                });

                //
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.ROOMID_NOT_FOUND, data => {
                    // this.showTip('学生进入房间请输入房间号');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.JOIN_CLASS_ROOM_SUCC, data => {
                    this.showTip('加入课堂成功');
                    this.spinShow = false
                    setTimeout(() => {
                        BNService.createAsk({id: this.qId, course: this.course, grade: this.grade}).then((data) => {
                            this.stuOrder = data.id
                            this.time()
                        });
                    }, 6000)
                    window.board = this.ticSdk.getBoardInstance();
                    window.WebRTC = this.ticSdk.getWebRTCInstance();

                    // 如果是主动推流
                    if (this.pushModel === 1) {
                        this.startRTC();
                    }
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.JOIN_CLASS_ROOM_ERROR, data => {
                    // this.showErrorTip('加入课堂失败,请确定该课堂是否已经由老师创建');
                    console.log('加入课堂失败,请确定该课堂是否已经由老师创建')
                    console.log(data)
                });


                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.GROUP_SYSTEM_NOTIFYS, imEvent => {
                    if (imEvent.event_type === 5) { // 群被解散
                        window.clearTimeout(this.timer)
                        this.ticSdk.quitClassroom();
                        this.model = true
                        this.deduction()
                        this.showTip(`老师解散了课堂`);
                    } else if (imEvent.event_type === 8) {
                        this.showTip(`退出了课堂`);
                    }
                });
                // 接收到聊天群组消息
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.RECEIVE_CHAT_ROOM_MSG, msgs => {
                    msgs.elems.forEach(msg => {
                        var content = msg.getContent();
                        if (msgs.getFromAccount() === '@TIM#SYSTEM') { // 接收到系统消息
                            var opType = content.getOpType(); // 通知类型
                            if (opType === webim.GROUP_TIP_TYPE.JOIN) { // 加群通知
                                this.msgs.push({
                                    send: '群消息提示：',
                                    content: content.getOpUserId() + '进群了'
                                });
                            } else if (opType === webim.GROUP_TIP_TYPE.QUIT) { // 退群通知
                                this.msgs.push({
                                    send: '群消息提示：',
                                    content: content.getOpUserId() + '退群了'
                                });
                            } else if (opType === webim.GROUP_TIP_TYPE.KICK) { // 踢人通知

                            } else if (opType === webim.GROUP_TIP_TYPE.SET_ADMIN) { // 设置管理员通知

                            } else if (opType === webim.GROUP_TIP_TYPE.CANCEL_ADMIN) { // 取消管理员通知

                            } else if (opType === webim.GROUP_TIP_TYPE.MODIFY_GROUP_INFO) { // 群资料变更

                            } else if (opType === webim.GROUP_TIP_TYPE.MODIFY_MEMBER_INFO) { //群成员资料变更

                            }
                        } else { // 接收到群聊天消息
                            var type = msg.getType();
                            if (type === 'TIMTextElem') {
                                this.msgs.push({
                                    send: msgs.getFromAccount() + '：',
                                    content: content.getText()
                                });
                            } else if (type === 'TIMCustomElem') {
                                this.msgs.push({
                                    send: msgs.getFromAccount() + '：',
                                    content: `data: ${content.getData()} desc: ${content.getDesc()} ext: ${content.getExt()}`
                                });
                            }
                        }
                    });
                });

                // 接收到C2C消息
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.RECEIVE_C2C_MSG, msgs => {
                    msgs.elems.forEach(msg => {
                        var content = msg.getContent();
                        var type = msg.getType();
                        if (type === 'TIMTextElem') {
                            this.msgs.push({
                                send: msgs.getFromAccount() + '：',
                                content: content.getText()
                            });
                        } else if (type === 'TIMCustomElem') {
                            this.msgs.push({
                                send: msgs.getFromAccount() + '：',
                                content: `data: ${content.getData()} desc: ${content.getDesc()} ext: ${content.getExt()}`
                            });
                        }
                    });
                });

                // 接收到普通消息
                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.MSG_NOTIFY, msgs => {
                    console.log('TICSDK.CONSTANT.EVENT.IM.MSG_NOTIFY');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.ADD_BOARD, data => {
                    this.proBoardData(data);
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_BOARD', '白板增加一页');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.DELETE_BOARD, data => {
                    this.proBoardData(data);
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.DELETE_BOARD', '白板删除一页');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.SWITCH_BOARD, data => {
                    this.proBoardData(data);
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.SWITCH_BOARD', '白板切换');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.ADD_GROUP, gid => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_GROUP', '增加白板组');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.DELETE_GROUP, gid => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.DELETE_GROUP', '删除白板组');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.SWITCH_GROUP, gid => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.SWITCH_GROUP', '切换白板组');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.REAL_TIME_DATA, data => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.REAL_TIME_DATA', '接收到白板实时数据', data);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.ADD_DATA_ERROR, data => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_DATA_ERROR', '接收到白板其他用户数据有错误');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.VERIFY_SDK_SUCC, () => {
                    console.log('白板SDK鉴权通过');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.VERIFY_SDK_ERROR, () => {
                    console.log('白板SDK鉴权不通过');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.IMG_START_LOAD, (data) => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_DATA_ERROR', '开始加载图片', data);
                    this.showTip('开始加载图片');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.IMG_LOAD, (data) => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_DATA_ERROR', '图片加载成功', data);
                    this.showTip('图片加载成功');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.IMG_ERROR, (data) => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_DATA_ERROR', '图片加载失败', data);
                    this.showTip('图片加载失败');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.BOARD.IMG_ABORT, (data) => {
                    console.log('TICSDK.CONSTANT.EVENT.BOARD.ADD_DATA_ERROR', '图片中断加载', data);
                    this.showTip('图片中断加载');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.TASK_READY, data => {
                    console.log('TICSDK.CONSTANT.EVENT.COS.TASK_READY', '上传任务创建时的回调函数，返回一个 taskId');
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.HASH_PROGRESS, data => {
                    console.log('TICSDK.CONSTANT.EVENT.COS.HASH_PROGRESS', '计算文件 MD5 值的进度回调函数');
                });


                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.PROGRESS, data => {
                    console.log('TICSDK.CONSTANT.EVENT.COS.PROGRESS', '上传文件的进度回调函数 data.percent:', data);
                    this.showTip(`上传进度：${Math.floor(data.percent * 100)}%`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.GET_SIGN_ERROR, data => {
                    this.showTip(`获取sigin错误`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.GET_SIGN_SUCCESS, data => {
                    this.showTip(`获取sigin成功`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.UPLOAD_SUCCESS, data => {
                    this.showTip(`上传成功`);
                    this.showTip(`文件上传完成，正在获取文件总页数~`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.COS.UPLOAD_ERROR, data => {
                    this.showTip(`上传失败`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.QUIT_CLASS_ROOM_SUCC, data => {
                    this.step = 'first';
                    this.showTip(`退出课堂成功`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.QUIT_CLASS_ROOM_ERROR, data => {
                    this.showErrorTip(`退出课堂失败`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.DESTROY_CLASS_ROOM_SUCC, () => {
                    this.step = 'first';
                    this.showTip(`销毁课堂成功`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.TIC.DESTROY_CLASS_ROOM_ERROR, () => {
                    this.showErrorTip(`销毁课堂失败`);
                });

                this.ticSdk.on(TICSDK.CONSTANT.EVENT.IM.KICKED, () => {
                    alert(`其他地方登录，被T了`);
                });
            },

            // 启动推流(推摄像头)
            startRTC() {
                // 获取webrtc实例
                this.indText = 1
                this.indcut = 0
                this.classification = 1
                var WebRTC = this.ticSdk.getWebRTCInstance();
                WebRTC.getLocalStream({
                    audio: true,
                    video: true,
                    // attributes: {
                    //     width: 640,
                    //     height: 480
                    // }
                }, (data) => {
                    this.isPushCamera = true;
                    if (WebRTC.global.localStream) {
                        WebRTC.updateStream({
                            role: 'screen',
                            stream: data.stream
                        }, () => {
                            // 成功
                        }, (error) => {
                            // this.showErrorTip(`更新流失败，${error}`);
                        });
                    } else {
                        WebRTC.startRTC({
                            stream: data.stream,
                            role: 'user'
                        }, (data) => {
                            // 成功
                        }, (error) => {
                            // this.showErrorTip(`推流失败, ${error}`);
                        });
                    }
                }, (error) => {
                    this.showErrorTip(`开启摄像头失败`);
                    this.indcut = 2
                });
                // this.$Message.error("暂不开启摄像头")
            },

            stopPush() {
                var WebRTC = this.ticSdk.getWebRTCInstance();
                WebRTC.stopRTC({}, () => {
                    this.isPushing = 0;
                    document.querySelector('#local_video').srcObject = null;
                });
            },
            // 试题
            text() {
                this.indText = 2
                this.classification = 2
            },
            /**
             * 推屏幕分享
             */
            pushScreen() {
                var WebRTC = this.ticSdk.getWebRTCInstance();
                WebRTC.getLocalStream({
                    screen: true,
                    screenSources: 'screen, window, tab, audio',
                    attributes: {
                        width: 1920,
                        height: 1080,
                        frameRate: 10
                    }
                }, (data) => {
                    this.isPushCamera = false;
                    if (WebRTC.global.localStream) {
                        WebRTC.updateStream({
                            role: 'screen',
                            stream: data.stream
                        }, () => {
                            // 成功
                        }, (error) => {
                            // this.showErrorTip(`更新流失败，${error}`);
                        });
                    } else {
                        WebRTC.startRTC({
                            stream: data.stream,
                            role: 'user'
                        }, (data) => {
                            // 成功
                        }, (error) => {
                            // this.showErrorTip(`推流失败, ${error}`);
                        });
                    }
                }, (error) => {
                    this.showErrorTip(`开启摄像头失败`);
                    this.indcut = 2
                });
            },

            /**
             * 摄像头开关
             */
            toggleCamera() {
                this.enableCamera = !this.enableCamera
                this.ticSdk.enableCamera(this.enableCamera);
            },

            /**
             * 麦克风开关
             */
            toggleMic() {
                this.enableMic = !this.enableMic
                this.ticSdk.enableMic(this.enableMic);
            },

            /**
             * 枚举摄像头
             */
            getCameraDevices() {
                this.ticSdk.getCameraDevices(devices => {
                    this.devices.camera = devices;
                });
            },

            /**
             * 切换摄像头
             */
            switchCamera() {
                if (this.cameraIndex < 0) {
                    return;
                }
                this.ticSdk.switchCamera(this.devices.camera[this.cameraIndex]);
            },

            /**
             * 枚举麦克风
             */
            getMicDevices() {
                this.ticSdk.getMicDevices(devices => {
                    this.devices.mic = devices;
                });
            },

            /**
             * 切换麦克风
             */
            switchMic() {
                if (this.micIndex < 0) {
                    return;
                }
                this.ticSdk.switchMic(this.devices.mic[this.micIndex]);
            },

            /**
             * 发送普通文本消息
             */
            sendMsg() {
                this.ticSdk.sendTextMessage(this.imMsg.common.data, this.imMsg.common.toUser);
                this.imMsg.common.data = ""
            },

            /**
             * 发送自定义消息
             */
            sendCustomGroupMsg() {
                this.ticSdk.sendCustomTextMessage({
                    data: this.imMsg.custom.data,
                    desc: this.imMsg.custom.desc,
                    ext: this.imMsg.custom.ext
                }, this.imMsg.common.toUser);
            },


            /**
             * 白板事件回调处理
             * @param {*} data
             */
            proBoardData(data) {
                this.boardData.data.current = data.current;
                this.boardData.data.list = data.list;
                this.boardData.page = {
                    current: this.boardData.data.list.indexOf(data.current) + 1,
                    total: this.boardData.data.list.length
                }
            },

            showErrorTip(title, time) {
                this.$Message.error(title, {
                    position: "top-right",
                    duration: time || 2000
                });
            },

            showTip(title, time) {
                this.$Message.success(title, {
                    position: "top-right",
                    duration: time || 2000
                });
            },
            //扣费
            deduction() {
                let obj = {}
                obj.id = this.stuOrder
                obj.end_time = Math.round(new Date().getTime() / 1000).toString()
                BNService.updateAsk(obj).then((data) => {
                    this.order_id = data.order_id
                });
            },
            //退出课堂
            quit() {
                this.$Modal.confirm({
                    title: this.$t('classroom.exitCon'),
                    content: this.$t('classroom.quitCon'),
                    okText: this.$t('classroom.determine'),
                    cancelText: this.$t('classroom.return'),
                    onOk: () => {
                        window.clearTimeout(this.timer)
                        this.ticSdk.quitClassroom();
                        this.model = true
                        this.deduction()
                    }
                });
            },
            xuan(num) {
                this.index = num
            },
            show(index) {
                this.$preview.open(index, this.imglist);
            },
            submit() {
                let obj = {}
                obj.teacher_id = this.teacher_id
                obj.order_id = this.order_id
                obj.score = this.value
                BNService.createreview(obj).then((data) => {
                    this.model = false
                    this.$Message.success(this.$t('order.Evaluation'))
                    this.$Message.info(this.$t('classroom.closeWindow'))
                    setTimeout(function () {
                        let href = window.opener.location.href
                        window.opener.location.replace(href);
                        window.opener = null;
                        window.open('', '_self');
                        window.close();
                    }, 2000)
                }).catch(() => {
                    this.$Message.error(this.$t('order.Evaluationof'));
                })
            },
            conversion(val) {
                if (val == 0) {
                    this.indcut = 1
                } else if (val == 1) {
                    this.indcut = 0
                }
                if (this.remote_video == 'remote_video') {
                    this.remote_video = 'me_video'
                    this.me_video = 'remote_video'
                } else {
                    this.remote_video = 'remote_video'
                    this.me_video = 'me_video'
                }
            }
        },

        beforeDestroy() {
            this.ticSdk.quitClassroom();
        },
    }
</script>
<style>
    .demo-split {
        height: 600px;
        border: 1px solid #dcdee2;
    }

    .demo-split-pane.no-padding {
        height: 600px;
        padding: 0;
    }

    .con {
        width: 100%;
        height: 80%;
        padding: 20px;
        overflow-y: auto;
    }

    .bot {
        width: 100%;
        height: 20%;
        background: #EEEEEE;
    }

    #paint_box {
        position: relative;
        width: 100%;
        height: 550px;
    }

    .classText {
        float: left;
        width: 50%;
        height: 100%;
        line-height: 45px;
        border-right: 1px solid #ccc;
        cursor: pointer;
    }

    .butto {
        cursor: pointer;
        width: 100px;
        height: 30px;
        background-color: #0087DD;
        text-align: center;
        line-height: 30px;
        border-radius: 25px;
        margin: 20px auto;
        color: white;
        font-size: 14px;
    }

    .actives {
        background: #338BD8;
        color: #fff;
    }

    .remote_video {
        position: absolute;
        top: 15%;
        right: 0;
        width: 30%;
        height: 30%;
        z-index: 2;
    }

    .me_video {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .remoteced {
        width: 100%;
        height: 100%;
        position: relative;
    }

    #local_video {
        width: 100%;
        object-fit: fill;
        height: 100%;
    }

    .barderVideo {
        width: 100%;
        object-fit: fill;
        height: 100%;
    }

    .cutindex {
        height: 100%;
        overflow: hidden;
    }
</style>