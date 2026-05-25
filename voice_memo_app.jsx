import React, { useState, useEffect } from 'react';
import { Play, Pause, Download, Trash2, Volume2, Zap, Music, Sliders } from 'lucide-react';

export default function VoiceMemoApp() {
  const [recordings, setRecordings] = useState([
    { id: 1, name: 'Acoustic Guitar - Summer Song', duration: 3, date: '2 hours ago', type: 'guitar', waveform: [0.2, 0.15, 0.3, 0.25, 0.18, 0.4, 0.35, 0.22] },
    { id: 2, name: 'Guitar Loop - Fingerstyle', duration: 2, date: '5 hours ago', type: 'guitar', waveform: [0.3, 0.25, 0.4, 0.35, 0.28, 0.32, 0.24, 0.18] },
    { id: 3, name: 'Acoustic Jam - Bedroom', duration: 4, date: '1 day ago', type: 'guitar', waveform: [0.15, 0.2, 0.25, 0.3, 0.22, 0.26, 0.19, 0.23] },
    { id: 4, name: 'Strumming Practice', duration: 5, date: '2 days ago', type: 'guitar', waveform: [0.35, 0.4, 0.32, 0.28, 0.38, 0.33, 0.29, 0.36] },
  ]);

  const [selectedId, setSelectedId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processedId, setProcessedId] = useState(null);

  // Simulate processing with waveform animation
  const handleProcess = (id) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setSelectedId(id);

    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setProcessedId(id);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg">
            <Music className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white">Voice Studio</h1>
              <span className="px-3 py-1 bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-500/50 rounded-full text-xs font-semibold text-amber-300">
                🎸 Guitar Optimized
              </span>
            </div>
            <p className="text-slate-400">Studio-quality processing with delay, echo & reverb</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Voice Memos List */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-600 rounded"></div>
              Your Voice Memos
            </h2>

            <div className="space-y-3">
              {recordings.map((recording) => (
                <div
                  key={recording.id}
                  className={`group p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedId === recording.id
                      ? 'bg-slate-700/80 border-blue-500/50'
                      : 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50 hover:border-slate-500'
                  }`}
                  onClick={() => setSelectedId(recording.id)}
                >
                  <div className="flex items-center gap-4">
                    {/* Waveform Thumbnail */}
                    <div className="flex-shrink-0 w-16 h-12 bg-slate-600/50 rounded-lg p-2 flex items-end justify-center gap-0.5">
                      {recording.waveform.map((height, idx) => (
                        <div
                          key={idx}
                          className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-sm opacity-70"
                          style={{ height: `${height * 100}%` }}
                        />
                      ))}
                    </div>

                    {/* Recording Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-white truncate">{recording.name}</h3>
                        {recording.type === 'guitar' && (
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-xs rounded font-semibold flex-shrink-0">
                            🎸
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400">{recording.duration} min • {recording.date}</p>
                    </div>

                    {/* Play Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsPlaying(!isPlaying);
                      }}
                      className="flex-shrink-0 p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/40 transition-colors"
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Processing Panel */}
        <div className="lg:col-span-1">
          {selectedId ? (
            <div className="space-y-4">
              {/* Processing Visualization */}
              {isProcessing && (
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Processing...</h3>

                  {/* Live Waveform */}
                  <div className="bg-slate-900/80 rounded-lg p-4 mb-4 h-24 flex items-end justify-center gap-1">
                    {Array.from({ length: 32 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-purple-500 via-blue-500 to-cyan-400 rounded-sm opacity-80 animate-pulse"
                        style={{
                          height: `${Math.sin((idx + processingProgress / 10) * 0.3) * 50 + 50}%`,
                          animationDelay: `${idx * 20}ms`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Processing Steps */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${processingProgress > 10 ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                      <span className="text-slate-300">Noise gate</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${processingProgress > 20 ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                      <span className="text-slate-300">Compression</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${processingProgress > 30 ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                      <span className="text-slate-300">EQ warmth</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${processingProgress > 45 ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                      <span className="text-slate-300">Room reverb</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${processingProgress > 60 ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                      <span className="text-slate-300">Delay layer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${processingProgress > 75 ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                      <span className="text-slate-300">Echo shimmer</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${processingProgress > 90 ? 'bg-green-500' : 'bg-slate-500'}`}></div>
                      <span className="text-slate-300">Saturation polish</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-300"
                      style={{ width: `${processingProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{processingProgress}%</p>
                </div>
              )}

              {/* Process Button */}
              {!isProcessing && (
                <div className="space-y-3">
                  <button
                    onClick={() => handleProcess(selectedId)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    <Zap className="w-5 h-5" />
                    Enhance Recording
                  </button>

                  {/* Enhancement Options */}
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700 space-y-4">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-600">
                      <Sliders className="w-4 h-4 text-blue-400" />
                      <h4 className="text-sm font-semibold text-slate-300">Guitar Effects</h4>
                    </div>

                    {/* Tone Control */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Warmth & Tone</span>
                        <span className="text-xs text-blue-400 font-medium bg-blue-500/20 px-2 py-1 rounded">Rich</span>
                      </div>
                      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                      </div>
                    </div>

                    {/* Reverb */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Room Reverb</span>
                        <span className="text-xs text-purple-400 font-medium">Studio</span>
                      </div>
                      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-gradient-to-r from-purple-500 to-blue-500"></div>
                      </div>
                    </div>

                    {/* Delay */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Delay Time</span>
                        <span className="text-xs text-cyan-400 font-medium">400ms</span>
                      </div>
                      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                      </div>
                    </div>

                    {/* Echo Feedback */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Echo Repeats</span>
                        <span className="text-xs text-indigo-400 font-medium">3x</span>
                      </div>
                      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-2/5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                      </div>
                    </div>

                    {/* Compression */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Compression</span>
                        <span className="text-xs text-green-400 font-medium">Even</span>
                      </div>
                      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-1/2 bg-gradient-to-r from-green-500 to-emerald-500"></div>
                      </div>
                    </div>

                    {/* Saturation */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Saturation</span>
                        <span className="text-xs text-orange-400 font-medium">Subtle</span>
                      </div>
                      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-1/4 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
                      </div>
                    </div>

                    {/* Presence Boost */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Presence Boost</span>
                        <span className="text-xs text-rose-400 font-medium">Clarity</span>
                      </div>
                      <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full w-3/5 bg-gradient-to-r from-rose-500 to-pink-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Results */}
              {processedId === selectedId && !isProcessing && (
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl p-4 border border-green-500/30">
                  <h4 className="text-sm font-semibold text-green-400 mb-3">✓ Processing Complete</h4>
                  <div className="space-y-2">
                    <button className="w-full bg-green-500/30 hover:bg-green-500/50 text-green-300 text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      Preview Enhanced
                    </button>
                    <button className="w-full bg-slate-600 hover:bg-slate-500 text-white text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Save & Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700 text-center">
              <Volume2 className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">Select a recording to enhance</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}