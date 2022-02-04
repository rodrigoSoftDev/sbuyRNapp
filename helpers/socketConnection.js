import io from '../assets/socket.io';
import { mediaDevices } from 'react-native-webrtc';

const socketIOaddress = "https://streaming.vivet.app/";

const socketOptions = {
    secure: true,
    reconnection: true,
    reconnectionDelay: 1000,
    timeout: 15000,
    pingTimeout: 15000,
    pingInterval: 45000,
    query: {
        framespersecond: 15,
        audioBitrate: 22050
    }
};

const mediaConstraints = sourceId => {
    return {
        audio: {
            sampleRate: 22050,
            echoCancellation: true
        },
        video: {
            width: {
                min: 100,
                ideal: 240,
                max: 1920
            },
            height: {
                min: 100,
                ideal: 240,
                max: 1080
            },
            frameRate: {
                ideal: 15
            },
            facingMode: (false ? "user" : "environment"),
            deviceId: sourceId
        }
    };
};

export const initSocket = (setSocket, rtmpUrl) => {
    var socket = io.connect(socketIOaddress, socketOptions);
    
    socket.on('connect', () => alert('connected'));
			
    socket.on('connect_timeout', (timeout) =>  alert("state on connection timeout= " + timeout));

    socket.on('error', error => alert("state on connection error= " + error));

    socket.on('connect_error', error => alert("state on connection error= " + error));

    //setSocket(socket);
    //startStream(socket, rtmpUrl);
};


const startStream = (socket, rtmpUrl) => {
    mediaDevices.getUserMedia(mediaConstraints({audio: true, video: true}))
        .then(stream => {
            alert("HERE")
            socket.emit('config_rtmpDestination', rtmpUrl);
            socket.emit('start', 'start');
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start(250);

            mediaRecorder.onstop = e => alert("stopped! by" + e);
            mediaRecorder.onpause = e => alert("media recorder paused!! by " + e);
            mediaRecorder.onerror = e => alert("error", e.error.name);
            mediaRecorder.ondataavailable = e => socket.emit("binarystream", e.data);
            })
        .catch(err => {
            alert('The following error occured: ' + err);
            alert('Local getUserMedia ERROR:' + err);
        });
};