"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, LucideIcon } from "lucide-react";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: LucideIcon;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

export default function RadialOrbitalTimeline({ timelineData }: { timelineData: TimelineItem[] }) {
  const [isMounted, setIsMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Fix hydration mismatch by only rendering math-heavy positioning on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => { if (parseInt(key) !== id) newState[parseInt(key)] = false; });
      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => { newPulseEffect[relId] = true; });
        setPulseEffect(newPulseEffect);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }
      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;
    if (autoRotate && viewMode === "orbital" && isMounted) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.3) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }
    return () => { if (rotationTimer) clearInterval(rotationTimer); };
  }, [autoRotate, viewMode, isMounted]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    setRotationAngle(Number((270 - targetAngle).toFixed(3)));
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 180; 
    const radian = (angle * Math.PI) / 180;
    // Fixed decimals strictly prevent SSR hydration differences
    const x = Number((radius * Math.cos(radian) + centerOffset.x).toFixed(3));
    const y = Number((radius * Math.sin(radian) + centerOffset.y).toFixed(3));
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Number((Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))).toFixed(3));
    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    return getRelatedItems(activeNodeId).includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed": return "text-emerald-400 border-emerald-500/50 bg-emerald-950/50";
      case "in-progress": return "text-blue-400 border-blue-500/50 bg-blue-950/50";
      case "pending": return "text-slate-400 border-slate-700 bg-slate-900/50";
      default: return "text-white bg-black/40 border-white/50";
    }
  };

  if (!isMounted) {
    return <div className="w-full h-[500px] flex items-center justify-center bg-transparent overflow-hidden" />;
  }

  return (
    <div className="w-full h-[500px] flex flex-col items-center justify-center bg-transparent overflow-hidden" ref={containerRef} onClick={handleContainerClick}>
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div className="absolute w-full h-full flex items-center justify-center" ref={orbitRef} style={{ perspective: "1000px", transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)` }}>
          <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-20 h-20 rounded-full border border-emerald-500/30 animate-ping opacity-70"></div>
            <div className="w-8 h-8 rounded-full bg-slate-950 backdrop-blur-md"></div>
          </div>
          <div className="absolute w-[360px] h-[360px] rounded-full border border-slate-800"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            return (
              <div key={item.id} ref={(el) => { nodeRefs.current[item.id] = el; }} className="absolute transition-all duration-700 cursor-pointer"
                style={{ transform: `translate(${position.x}px, ${position.y}px)`, zIndex: isExpanded ? 200 : position.zIndex, opacity: isExpanded ? 1 : position.opacity }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id); }}>
                
                <div className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{ background: `radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0) 70%)`, width: `${item.energy * 0.5 + 40}px`, height: `${item.energy * 0.5 + 40}px`, left: `-${(item.energy * 0.5) / 2}px`, top: `-${(item.energy * 0.5) / 2}px` }}></div>

                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 transform ${isExpanded ? "bg-emerald-500 text-slate-950 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-125" : isRelated ? "bg-slate-800 text-emerald-400 border-emerald-500/50 animate-pulse" : "bg-slate-950 text-slate-400 border-slate-700"}`}>
                  <Icon size={16} />
                </div>

                <div className={`absolute top-12 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 -translate-x-1/2 left-1/2 ${isExpanded ? "text-emerald-400" : "text-slate-500"}`}>
                  {item.title}
                </div>

                {isExpanded && (
                  <div className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-slate-950/95 backdrop-blur-xl border border-slate-800 shadow-2xl shadow-emerald-500/10 rounded-xl p-4">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-emerald-500/50"></div>
                    <div className="flex justify-between items-center mb-2">
                      <span className={`px-2 py-0.5 text-[10px] rounded-full border ${getStatusStyles(item.status)}`}>{item.status.toUpperCase()}</span>
                      <span className="text-[10px] font-mono text-slate-500">{item.date}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-slate-400 mb-4">{item.content}</p>
                    
                    <div className="pt-3 border-t border-slate-800">
                      <div className="flex justify-between items-center text-[10px] mb-1 text-slate-400">
                        <span className="flex items-center"><Zap size={10} className="mr-1 text-emerald-400" /> Focus Level</span>
                        <span className="font-mono">{item.energy}%</span>
                      </div>
                      <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${item.energy}%` }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}