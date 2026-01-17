import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';

const VideoCall: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [callEnded, setCallEnded] = useState(false);

  if (callEnded) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <h2 className="text-2xl font-semibold text-gray-600">
          Call Ended
        </h2>
      </div>
    );
  }

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Video Call</h1>

      <div className="bg-black rounded-xl overflow-hidden mb-6">
        {cameraOn ? (
          <Webcam
            ref={webcamRef}
            audio={micOn}
            className="w-[480px] h-[360px]"
          />
        ) : (
          <div className="w-[480px] h-[360px] flex items-center justify-center text-white">
            Camera Off
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setMicOn(!micOn)}
          className="p-3 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          {micOn ? <Mic /> : <MicOff />}
        </button>

        <button
          onClick={() => setCameraOn(!cameraOn)}
          className="p-3 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          {cameraOn ? <Video /> : <VideoOff />}
        </button>

        <button
          onClick={() => setCallEnded(true)}
          className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          <PhoneOff />
        </button>
      </div>
    </div>
  );
};

export default VideoCall;
