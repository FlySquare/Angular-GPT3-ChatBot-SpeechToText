let RecordBtnPressed = !1, mediaRecorder, recordedBlobs, stream, audio1, audioStream, mixedStream;
const recordButton = document.querySelector("button#record");
let audioUrl = ""
  , recording = !1;
function vh_sceneLoaded(e) {
  recordButton.removeAttribute("disabled")
}
async function saytextEvent(e, t, r, o, a, d, i) {
  var n = await sayText(e, t, r, o, a, d, i);
  if (n && n.videoMp3URL) {
    var c = n.videoMp3URL;
    c = audio1 = new Audio(c),
      audio1.crossOrigin = "anonymous"
  }
}
function handleDataAvailable(e) {
  e.data && e.data.size > 0 && recordedBlobs.push(e.data)
}
function vh_audioStarted() {
  "" !== audioUrl && (audio1 = new Audio(audioUrl),
  recording && captureStream())
}
function vh_talkEnded() {
  recording && stopRecording(),
    recordButton.textContent = "Start Recording"
}
function captureStream() {
  stream = document.getElementsByTagName("canvas")[0].captureStream(15);
  let e = navigator.userAgent;
  e.indexOf("Firefox") > -1 ? audioStream = audio1.mozCaptureStream() : (setPlayerVolume(0),
    audioStream = audio1.captureStream());
  var t = setInterval(function() {
    audioStream.getAudioTracks().length > 0 && (clearInterval(t),
      mixedStream = "MediaStream"in window ? new MediaStream([stream.getVideoTracks()[0], audioStream.getAudioTracks()[0]]) : stream,
      audio1.play(),
      setTimeout(function() {
        startRecording()
      }, 100))
  }, 100)
}
function startRecording() {
  recordedBlobs = [];
  let e = {
    mimeType: "video/webm;codecs=vp9,opus"
  };
  MediaRecorder.isTypeSupported(e.mimeType) || (console.error(`${e.mimeType} is not supported`),
    e = {
      mimeType: "video/webm;codecs=vp8,opus"
    },
  MediaRecorder.isTypeSupported(e.mimeType) || (console.error(`${e.mimeType} is not supported`),
    e = {
      mimeType: "video/webm"
    },
  MediaRecorder.isTypeSupported(e.mimeType) || (console.error(`${e.mimeType} is not supported`),
    e = {
      mimeType: ""
    })));
  try {
    mediaRecorder = new MediaRecorder(mixedStream,e)
  } catch (t) {
    console.error("Exception while creating MediaRecorder:", t);
    return
  }
  recordButton.textContent = "Stop Recording",
    mediaRecorder.onstop = handleStop,
    mediaRecorder.ondataavailable = handleDataAvailable,
    mediaRecorder.start()
}
function handleStop(e) {
  new Blob(recordedBlobs,{
    type: "video/webm"
  })
}
function stopRecording() {
  void 0 !== mediaRecorder && (recording = !1,
    setTimeout(function() {
      mediaRecorder.stop()
    }, 600))
}
function handleSuccess(e) {
  recordButton.disabled = !1,
    window.stream = e;
  let t = document.querySelector("video#gum");
  t.srcObject = e
}
async function init(e) {
  try {
    let t = await navigator.mediaDevices.getUserMedia(e);
    handleSuccess(t)
  } catch (r) {
    console.error("navigator.getUserMedia error:", r)
  }
}
recordButton.addEventListener("click", async()=>{
  if ("" === document.getElementById("textToSpeak").value) {
    alert("Use Microphone to record");
    return
  }
  RecordBtnPressed = !0;
  let e = await sayText(document.getElementById("textToSpeak").value, 2, 16, 7, "", "", 1);
  if (stopSpeech(),
  e && e.videoMp3URL) {
    let t = e.videoMp3URL
      , r = new XMLHttpRequest;
    r.open("GET", t),
      r.responseType = "blob",
      r.onload = e=>{
        recording = !0,
          sayMP3Audio(t),
          audioUrl = URL.createObjectURL(r.response)
      }
      ,
      r.send()
  }
  }
);
