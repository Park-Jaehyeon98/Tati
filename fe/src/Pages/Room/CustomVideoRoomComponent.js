import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import CustomChatComponent from "./CustomChatComponent";
import CustomStreamComponent from "./CustomStreamComponent";
// import "./VideoRoomComponent.css";
import style from "./CustomVideoRoomComponent.module.css";

import OpenViduLayout from "./openvidu-layout";
import UserModel from "./user-model";
import { apiClient } from "../../api/apiClient";

var localUser = new UserModel();
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://i9b305.p.ssafy.io:8443/"
    : "https://i9b305.p.ssafy.io:8443/";

class CustomVideoRoomComponent extends Component {
  // 컴포넌트가 생성될때 먼저 호출되서 초기화 담당

  constructor(props) {
    super(props);
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    let sessionName = this.props.sessionName
      ? this.props.sessionName
      : "study1";
    // let sessionName = "study" + "저장된 studyId";
    let userName = this.props.user
      ? this.props.user
      : "참석자" + Math.floor(Math.random() * 100);
    // let userName = "저장된 회원 닉네임";

    // 참가자 목록
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: "none",
      currentVideoDevice: undefined,
      // memberId: 1,
      // studyId: 1,
      attendanceId: undefined,
    };

    // 바인드작업
    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    // this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.closeDialogExtension = this.closeDialogExtension.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    // this.checkSize = this.checkSize.bind(this);
  }

  // 컴포넌트가 마운트 된 후에 실행되는 함수
  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: "OV_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    // this.layout.initLayoutContainer(
    //   document.getElementById("layout"),
    //   openViduLayoutOptions
    // );
    window.addEventListener("beforeunload", this.onbeforeunload);
    // window.addEventListener("resize", this.updateLayout);
    // window.addEventListener("resize", this.checkSize);
    this.joinSession();
  }

  // 컴포넌트가 언마운트 되었을때 실행되는 함수
  // 이벤트 리스너 삭제 후 leaveSession 호출
  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    // window.removeEventListener("resize", this.updateLayout);
    // window.removeEventListener("resize", this.checkSize);
    this.leaveSession();
  }

  // 이벤트가 로드되지 않으면 leaveSession 호출
  onbeforeunload(event) {
    this.leaveSession();
  }

  // OpenVidu 객체 초기화 후 세션 연결
  // 1. OpenVidu 객체를 생성
  // 2. state에 있는 session 객체를 초기화
  // 3. subscribeToStreamCreated 함수를 호출하여, 새로운 스트림이 생성될 때마다 해당 스트림을 구독
  // 4. connectToSession 함수를 호출하여, 세션에 연결
  joinSession() {
    //서버에 입실기록 전송
    apiClient
      .post("/study/attendance/in", {
        memberId: 1, //임시값
        studyId: 1, //임시값
        inTime: new Date(),
      })
      .then((res) => {
        console.log(res.data);
        //출석 식별자 저장
        this.attendanceId = res.data.attendanceId;
        console.log(this.attendanceId);
      })
      .catch((err) => {
        console.log("에러");
        console.log(err);
      }); //입실 전송

    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      async () => {
        this.subscribeToStreamCreated();
        await this.connectToSession();
      }
    );
  }
  // 세션 연결 함수
  // 토큰이 존재하면 connect 함수 호출, token 전달
  // 토큰이 없다면 토큰 요청
  async connectToSession() {
    if (this.props.token !== undefined) {
      console.log("token received: ", this.props.token);
      this.connect(this.props.token);
    } else {
      try {
        var token = await this.getToken();
        console.log(token);
        this.connect(token);
      } catch (error) {
        console.error(
          "There was an error getting the token:",
          error.code,
          error.message
        );
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error getting the token:", error.message);
      }
    }
  }
  // 세션에 토큰 커넥팅
  // 성공여부에 따라 connectwebcam 함수 호출
  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  }
  // 웹캠 연결 함수 처리
  async connectWebCam() {
    // OV.getUserMedia를 통해 오디오, 비디오 소스를 받아오고 Ov.getDevices로 디바이스 목록을 가져옴

    await this.OV.getUserMedia({
      audioSource: undefined,
      videoSource: undefined,
    });
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");
    // var audioDevices = devices.filter((device) => device.kind === "audioinput")

    // OV.initPublisher를 통해 오디오, 비디오 소스를 설정

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      // audioSource: audioDevices[0].deviceId,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
    });

    // session.publish() 함수를 호출하여, 로컬 유저의 스트림을 세션에 추가
    if (this.state.session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    // 로컬 유저 정보를 state와 localUser 객체에 저장하고, subscribeToUserChanged와 subscribeToStreamDestroyed 함수를 호출하여 유저 변경 및 스트림 종료 이벤트를 처리

    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.sendSignalUserChanged({
      // sendSignalUserChanged 함수를 호출하여, 로컬 유저의 정보를 신호 메시지로 전달

      isScreenShareActive: localUser.isScreenShareActive(),
    });

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
          publisher.videos[0].video.parentElement.classList.remove(
            "custom-class"
          );
        });
      }
    );
  }

  // 참가자 목록을 업데이트하고, 정렬하여 state.subscribers에 저장
  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          // sendSignalUserChanged 함수를 호출하여, 로컬 유저의 정보를 신호 메시지로 전달
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
          });
        }
      }
    );
  }
  // 세션 연결을 종료합니다.
  // 이 함수는 컴포넌트가 componentWillUnmount()를 통해 호출
  leaveSession() {
    const mySession = this.state.session;
    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    // state 및 OpenVidu 객체를 초기화
    this.setState({
      session: undefined,
      subscribers: [],
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }

    //서버에 퇴실기록 전송
    apiClient
      .put("/study/attendance/out", {
        memberId: 1, //임시값
        attendanceId: this.attendanceId,
        outTime: new Date(),
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/Room"; //퇴실성공시 버튼위치로 돌아감
      })
      .catch((err) => {
        console.log(err);
        window.location.href = "/";
      });
  }
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  nicknameChanged(nickname) {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      nickname: this.state.localUser.getNickname(),
    });
  }

  // 스트림이 종료된 후, 해당 스트림을 subscribers에서 삭제
  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  // 새로운 스트림이 생성될 때마다, 해당 스트림에 대한 subscriber 객체를 생성하고, 세션에 구독
  // joinsession에 들어가있는 3번 함수, 스트림 생성시 해당 스트림 구독
  subscribeToStreamCreated() {
    this.state.session.on("streamCreated", (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      subscriber.on("streamPlaying", (e) => {
        this.checkSomeoneShareScreen();
        subscriber.videos[0].video.parentElement.classList.remove(
          "custom-class"
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }
  // 스트림이 종료될 때마다, 해당 스트림에 대한 subscriber 객체를 삭제
  // checkSomeoneShareScreen 함수를 호출하여 스크린 공유 상태를 업데이트
  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on("streamDestroyed", (event) => {
      // Remove the stream from 'subscribers' array
      this.deleteSubscriber(event.stream);
      setTimeout(() => {
        this.checkSomeoneShareScreen();
      }, 20);
      event.preventDefault();
    });
  }

  //  다른 유저의 상태가 변경되었을 때, 해당 상태 정보를 신호 메시지로 수신
  // 해당 유저 정보에 대하여, subscribers에서 검색하여 업데이트
  // state.subscribers를 업데이트하고, checkSomeoneShareScreen 함수를 호출하여 스크린 공유 상태를 업데이트
  subscribeToUserChanged() {
    this.state.session.on("signal:userChanged", (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log("EVENTO REMOTE: ", event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      this.setState(
        {
          subscribers: remoteUsers,
        },
        () => this.checkSomeoneShareScreen()
      );
    });
  }
  // 로컬 유저의 정보 변경 사항을 신호 메시지로 전달
  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  //   풀스크린 (필요없음)
  toggleFullscreen() {
    const document = window.document;
    const fs = document.getElementById("container");
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  // 카메라 스위치(필요없음)
  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            audioSource: undefined,
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: localUser.isAudioActive(),
            publishVideo: localUser.isVideoActive(),
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(
            this.state.localUser.getStreamManager()
          );
          await this.state.session.publish(newPublisher);
          this.state.localUser.setStreamManager(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice,
            localUser: localUser,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
  // 화면공유 시작
  screenShare() {
    const videoSource =
      navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen";
    const publisher = this.OV.initPublisher(
      undefined,
      {
        videoSource: videoSource,
        publishAudio: localUser.isAudioActive(),
        publishVideo: localUser.isVideoActive(),
        mirror: false,
      },
      (error) => {
        if (error && error.name === "SCREEN_EXTENSION_NOT_INSTALLED") {
          this.setState({ showExtensionDialog: true });
        } else if (error && error.name === "SCREEN_SHARING_NOT_SUPPORTED") {
          alert("Your browser does not support screen sharing");
        } else if (error && error.name === "SCREEN_EXTENSION_DISABLED") {
          alert("You need to enable screen sharing extension");
        } else if (error && error.name === "SCREEN_CAPTURE_DENIED") {
          alert("You need to choose a window or application to share");
        }
      }
    );

    publisher.once("accessAllowed", () => {
      this.state.session.unpublish(localUser.getStreamManager());
      localUser.setStreamManager(publisher);
      this.state.session.publish(localUser.getStreamManager()).then(() => {
        localUser.setScreenShareActive(true);
        this.setState({ localUser: localUser }, () => {
          this.sendSignalUserChanged({
            isScreenShareActive: localUser.isScreenShareActive(),
          });
        });
      });
    });
    publisher.on("streamPlaying", () => {
      publisher.videos[0].video.parentElement.classList.remove("custom-class");
    });
  }
  // 대화창 닫기
  closeDialogExtension() {
    this.setState({ showExtensionDialog: false });
  }
  // 화면공유 멈추기
  stopScreenShare() {
    this.state.session.unpublish(localUser.getStreamManager());
    this.connectWebCam();
  }
  // 화면공유 체크
  checkSomeoneShareScreen() {
    let isScreenShared;
    // return true if at least one passes the test
    isScreenShared =
      this.state.subscribers.some((user) => user.isScreenShareActive()) ||
      localUser.isScreenShareActive();
    // const openviduLayoutOptions = {
    //   maxRatio: 3 / 2,
    //   minRatio: 9 / 16,
    //   fixedRatio: isScreenShared,
    //   bigClass: "OV_big",
    //   bigPercentage: 0.8,
    //   bigFixedRatio: false,
    //   bigMaxRatio: 3 / 2,
    //   bigMinRatio: 9 / 16,
    //   bigFirst: true,
    //   animate: true,
    // };
    // this.layout.setLayoutOptions(openviduLayoutOptions);
    // this.updateLayout();
  }
  // 채팅창 토글
  toggleChat(property) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      console.log("chat", display);
      this.setState({ chatDisplay: display });
    }
    // this.updateLayout();
  }

  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === "none",
    });
  }

  // html 랜더링
  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;
    var chatDisplay = { display: this.state.chatDisplay };

    return (
      <div className={style.container} id="container">
        {/* 화면이 들어있는 컨테이너 */}
        <div className={style.camBox}>
          {/* 내 화면 */}
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div className={style.camCell} id="localUser">
                <CustomStreamComponent user={localUser} />
              </div>
            )}
          {/* 다른사람 화면 */}
          {this.state.subscribers.map((sub, i) => (
            <div className={style.camCell} key={i} id="remoteUsers">
              <CustomStreamComponent
                user={sub}
                streamId={sub.streamManager.stream.streamId}
              />
            </div>
          ))}
          {/* 채팅창 */}
        </div>
        {localUser !== undefined &&
          localUser.getStreamManager() !== undefined && (
            <div className="OT_root OT_publisher custom-class">
              <CustomChatComponent
                user={localUser}
                chatDisplay={this.state.chatDisplay}
                close={this.toggleChat}
                messageReceived={this.checkNotification}
              />
            </div>
          )}
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  //   세션ID -> createToken
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }
  // session id로 axios 요청
  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  }
  // token 발행
  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  }
}
export default CustomVideoRoomComponent;
