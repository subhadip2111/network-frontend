import { Heart, MessageCircle, PlayCircle } from 'lucide-react';

const VideoDemoCard = ({ data }) => {
  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md">
      <div className="relative aspect-video bg-black">
        <video
          src={data.videoUrl}
          controls
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white/60" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white text-base font-semibold mb-1">
          {data.title}
        </h3>
        <p className="text-sm text-gray-400 mb-3">{data.description}</p>
        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <span className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-500" />
            {data.likes}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {data.comments}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VideoDemoCard;
