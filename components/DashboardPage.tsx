
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { 
  LayoutDashboard, 
  Ticket, 
  Users, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Zap,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  CreditCard,
  Target,
  ShieldCheck,
  FileDown,
  Plus,
  MoreVertical,
  X,
  Loader2,
  Globe,
  Command,
  HelpCircle,
  BrainCircuit,
  Radio,
  GripVertical,
  Wallet,
  CheckCircle2,
  Download,
  Maximize2,
  Activity,
  Cpu,
  Layout,
  Menu,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Clock,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Sparkle,
  Layers,
  Map as MapIcon,
  Navigation,
  Focus,
  DollarSign,
  PieChart,
  ArrowUp,
  History,
  PlusCircle,
  ShieldAlert,
  FileText,
  Lock,
  Monitor,
  Video,
  Play,
  Share2,
  AlertTriangle,
  Heart,
  Smartphone,
  EyeOff,
  Scan,
  Gauge,
  Timer,
  User,
  Tags,
  BarChart3,
  Rocket,
  Wand2,
  LineChart as LineChartIcon,
  MousePointer2,
  Settings2,
  Radar,
  Info,
  Layers3,
  Camera,
  SmartphoneNfc,
  Globe2,
  QrCode,
  ArrowRightLeft,
  RotateCcw,
  Ban,
  MonitorPlay,
  Flame,
  ZapOff,
  Database,
  RefreshCw,
  Waves,
  Mic2,
  Volume2,
  Wind,
  Smile,
  Navigation2,
  Star,
  GripHorizontal,
  MapPin,
  ExternalLink,
  UserCheck,
  Save,
  RotateCcw as ResetIcon
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import DashboardPreview from './DashboardPreview';
import { useToast } from '../App';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface DashboardPageProps {
  onLogout: () => void;
}

interface SeatData {
  id: string;
  heat: number;
  occupied: boolean;
  status: 'available' | 'booked' | 'premium';
  price?: number;
}

interface ClickedSeatInfo {
  seat: SeatData;
  x: number;
  y: number;
  zoneName: string;
  zoneId: string;
  row: number;
  col: number;
}

interface HoveredSeatInfo {
  seat: SeatData;
  x: number;
  y: number;
  zoneName: string;
  row: number;
  col: number;
}

interface NotificationItem {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'surge' | 'sales' | 'system';
  isRead: boolean;
}

const KPICard: React.FC<{ 
  label: string; 
  val: string; 
  target: string;
  change: string; 
  icon: React.ReactNode; 
  themeColor: 'teal' | 'gold' | 'blue' | 'purple';
  data: { v: number }[];
  highlight?: boolean;
  isEditMode?: boolean;
  onRemove?: () => void;
  viewMode: 'live' | 'historical';
}> = ({ label, val, target, change, icon, themeColor, data, highlight, isEditMode, onRemove, viewMode }) => {
  const themes = {
    teal: { 
      text: 'text-electric-teal', 
      bg: 'bg-electric-teal/10', 
      border: 'border-electric-teal/20', 
      accent: '#64FFDA',
      glow: 'group-hover:shadow-electric-teal/10',
      gradient: 'from-electric-teal/10',
      dot: 'bg-electric-teal'
    },
    gold: { 
      text: 'text-amber-gold', 
      bg: 'bg-amber-gold/10', 
      border: 'border-amber-gold/20', 
      accent: '#FFB400',
      glow: 'group-hover:shadow-amber-gold/10',
      gradient: 'from-amber-gold/10',
      dot: 'bg-amber-gold'
    },
    blue: { 
      text: 'text-blue-400', 
      bg: 'bg-blue-400/10', 
      border: 'border-blue-400/20', 
      accent: '#60A5FA',
      glow: 'group-hover:shadow-blue-400/10',
      gradient: 'from-blue-400/10',
      dot: 'bg-blue-400'
    },
    purple: { 
      text: 'text-purple-400', 
      bg: 'bg-purple-400/10', 
      border: 'border-purple-400/20', 
      accent: '#A78BFA',
      glow: 'group-hover:shadow-purple-400/10',
      gradient: 'from-purple-400/10',
      dot: 'bg-purple-400'
    }
  };
  
  const theme = themes[themeColor];
  const isUp = change.includes('+');

  return (
    <div className={`glass-card p-6 md:p-8 rounded-[48px] border flex flex-col group hover:border-white/10 transition-all duration-700 shadow-3xl relative overflow-hidden h-full cursor-default text-right ${highlight ? 'border-amber-gold/30 shadow-[0_0_40px_rgba(255,180,0,0.1)]' : 'border-white/5'} ${isEditMode ? 'border-dashed border-white/20' : ''} ${theme.glow}`}>
      
      {/* Background Theme Gradient */}
      <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${theme.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none`} />

      {isEditMode && (
        <>
          <div className="absolute top-4 left-4 p-2 bg-white/10 rounded-full cursor-grab active:cursor-grabbing z-20">
            <GripVertical className="w-4 h-4 text-white/40" />
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
            className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all z-20"
          >
            <X className="w-3 h-3" />
          </button>
        </>
      )}

      <div className="absolute inset-x-0 bottom-0 h-32 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <Area type="monotone" dataKey="v" stroke={theme.accent} strokeWidth={4} fill={theme.accent} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-start justify-between mb-4 md:mb-8 flex-row-reverse relative z-10">
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-[22px] flex items-center justify-center transition-all group-hover:scale-110 border shadow-2xl ${theme.bg} ${theme.text} ${theme.border}`}>{icon}</div>
        <div className={`px-3 py-1 rounded-full border border-white/5 font-black text-[10px] font-plex flex items-center gap-2 ${isUp ? 'text-green-400 bg-green-500/5' : 'text-blue-400 bg-blue-500/5'}`}>
          {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>

      <div className="relative z-10 mb-4 md:mb-6">
        <div className="flex items-center justify-end gap-2 mb-2">
           {viewMode === 'historical' && <History className="w-3 h-3 text-amber-gold/60" />}
           <p className="text-gray-500 font-black text-[10px] uppercase tracking-[0.3em] font-plex">{label}</p>
        </div>
        <h3 className={`text-2xl md:text-3xl lg:text-5xl font-black tracking-tighter font-plex group-hover:scale-105 transition-all duration-500 origin-right whitespace-nowrap overflow-hidden text-ellipsis ${highlight ? 'text-amber-gold animate-pulse' : 'text-white'}`}>{val}</h3>
      </div>

      <div className="mt-auto pt-4 md:pt-6 border-t border-white/5 flex items-center justify-between flex-row-reverse relative z-10">
        <div className="text-right">
          <p className="text-[9px] text-slate-400 font-bold font-plex uppercase tracking-widest">المستهدف</p>
          <p className="text-xs md:text-sm font-black text-white/80 font-plex">{target}</p>
        </div>
        {highlight && (
          <div className="flex items-center gap-2 bg-amber-gold/10 px-2 py-0.5 rounded-full border border-amber-gold/20">
             <Star className="w-2.5 h-2.5 text-amber-gold fill-amber-gold" />
             <span className="text-[8px] font-black text-amber-gold font-plex uppercase">AI</span>
          </div>
        )}
        {!highlight && (
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${viewMode === 'live' ? 'bg-green-500 animate-pulse' : theme.dot}`} />
            <span className="text-[9px] font-black text-gray-600 font-plex uppercase">{viewMode === 'live' ? 'LIVE' : 'HISTORICAL'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface TheatreZone {
  id: string;
  name: string;
  occupancy: number;
  revenue: string;
  heat: number; 
  capacity: number;
  seats: SeatData[];
}

const DEFAULT_ACTIVE_WIDGETS = [
  'conductor', 'kpi-revenue', 'kpi-occupancy', 'kpi-prediction', 'kpi-security', 
  'occupancy-heatmap', 'seat-density', 'main-charts'
];

const DEFAULT_LAYOUT = {
  lg: [
    { i: 'conductor', x: 0, y: 0, w: 12, h: 4, static: false },
    { i: 'kpi-revenue', x: 0, y: 4, w: 3, h: 4 },
    { i: 'kpi-occupancy', x: 3, y: 4, w: 3, h: 4 },
    { i: 'kpi-prediction', x: 6, y: 4, w: 3, h: 4 },
    { i: 'kpi-security', x: 9, y: 4, w: 3, h: 4 },
    { i: 'occupancy-heatmap', x: 0, y: 8, w: 8, h: 10 },
    { i: 'seat-density', x: 8, y: 8, w: 4, h: 5 },
    { i: 'main-charts', x: 8, y: 13, w: 4, h: 5 },
    { i: 'ai-advisor-mini', x: 8, y: 18, w: 4, h: 3 },
    { i: 'system-logs', x: 0, y: 18, w: 4, h: 4 },
    { i: 'kpi-attendance', x: 4, y: 18, w: 4, h: 4 }
  ],
  md: [
    { i: 'conductor', x: 0, y: 0, w: 10, h: 4 },
    { i: 'kpi-revenue', x: 0, y: 4, w: 5, h: 4 },
    { i: 'kpi-occupancy', x: 5, y: 4, w: 5, h: 4 },
    { i: 'kpi-prediction', x: 0, y: 8, w: 5, h: 4 },
    { i: 'kpi-security', x: 5, y: 8, w: 5, h: 4 },
    { i: 'occupancy-heatmap', x: 0, y: 12, w: 10, h: 10 },
    { i: 'seat-density', x: 0, y: 22, w: 5, h: 6 },
    { i: 'main-charts', x: 5, y: 22, w: 5, h: 6 }
  ],
  sm: [
    { i: 'conductor', x: 0, y: 0, w: 6, h: 4 },
    { i: 'kpi-revenue', x: 0, y: 4, w: 6, h: 4 },
    { i: 'kpi-occupancy', x: 0, y: 8, w: 6, h: 4 },
    { i: 'occupancy-heatmap', x: 0, y: 12, w: 6, h: 10 },
    { i: 'seat-density', x: 0, y: 22, w: 6, h: 6 },
    { i: 'main-charts', x: 0, y: 28, w: 6, h: 8 }
  ]
};

const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('الرئيسية');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [viewMode, setViewMode] = useState<'live' | 'historical'>('live');
  const [clickedSeat, setClickedSeat] = useState<ClickedSeatInfo | null>(null);
  const [hoveredSeat, setHoveredSeat] = useState<HoveredSeatInfo | null>(null);
  const [isAddWidgetOpen, setIsAddWidgetOpen] = useState(false);
  const [liveSimulationOffset, setLiveSimulationOffset] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const dashboardContainerRef = useRef<HTMLDivElement>(null);

  const { addToast } = useToast();

  // Parallax Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (dashboardContainerRef.current) {
        setScrollTop(dashboardContainerRef.current.scrollTop);
      }
    };
    const el = dashboardContainerRef.current;
    el?.addEventListener('scroll', handleScroll);
    return () => el?.removeEventListener('scroll', handleScroll);
  }, []);

  // Load from LocalStorage or use defaults
  const [activeWidgets, setActiveWidgets] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('stagemind_active_widgets');
      return saved ? JSON.parse(saved) : DEFAULT_ACTIVE_WIDGETS;
    } catch (e) {
      return DEFAULT_ACTIVE_WIDGETS;
    }
  });

  const [currentLayout, setCurrentLayout] = useState(() => {
    try {
      const saved = localStorage.getItem('stagemind_dashboard_layout');
      return saved ? JSON.parse(saved) : DEFAULT_LAYOUT;
    } catch (e) {
      return DEFAULT_LAYOUT;
    }
  });

  // Persist state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('stagemind_dashboard_layout', JSON.stringify(currentLayout));
    localStorage.setItem('stagemind_active_widgets', JSON.stringify(activeWidgets));
  }, [currentLayout, activeWidgets]);

  // States for Editing Form
  const [editStatus, setEditStatus] = useState<SeatData['status']>('available');
  const [editPrice, setEditPrice] = useState<number>(0);

  const generateSeats = (count: number, baseHeat: number, zoneId: string): SeatData[] => {
    return Array.from({ length: count }).map((_, i) => {
      const heat = Math.min(1, baseHeat + (Math.random() * 0.4 - 0.2));
      const occupied = Math.random() < baseHeat;
      let status: 'available' | 'booked' | 'premium' = occupied ? 'booked' : 'available';
      if (!occupied && (zoneId.startsWith('v') || (zoneId === 'o1' && i < 20))) {
        status = 'premium';
      }
      return { 
        id: `${zoneId}-s-${i}`, 
        heat, 
        occupied, 
        status, 
        price: Math.round(50 + heat * 150) 
      };
    });
  };

  const initialTheatreZones: TheatreZone[] = useMemo(() => [
    { id: 'v1', name: 'جناح ملكي - يمين', occupancy: 100, revenue: '$12,400', heat: 0.95, capacity: 12, seats: generateSeats(12, 0.95, 'v1') },
    { id: 'v2', name: 'جناح ملكي - يسار', occupancy: 92, revenue: '$11,200', heat: 0.88, capacity: 12, seats: generateSeats(12, 0.92, 'v2') },
    { id: 'o1', name: 'الأوركسترا - مقدمة', occupancy: 98, revenue: '$45,000', heat: 0.98, capacity: 64, seats: generateSeats(64, 0.98, 'o1') },
    { id: 'o2', name: 'الأوركسترا - وسط', occupancy: 84, revenue: '$38,500', heat: 0.72, capacity: 96, seats: generateSeats(96, 0.84, 'o2') },
    { id: 'o3', name: 'الأوركسترا - خلفية', occupancy: 70, revenue: '$22,000', heat: 0.55, capacity: 120, seats: generateSeats(120, 0.70, 'o3') },
    { id: 'b1', name: 'الشرفة الأولى', occupancy: 88, revenue: '$28,400', heat: 0.82, capacity: 80, seats: generateSeats(80, 0.88, 'b1') },
    { id: 'b2', name: 'الشرفة الثانية', occupancy: 62, revenue: '$12,500', heat: 0.40, capacity: 100, seats: generateSeats(100, 0.62, 'b2') },
  ], []);

  const [theatreZones, setTheatreZones] = useState<TheatreZone[]>(initialTheatreZones);

  // Live Simulation Logic
  useEffect(() => {
    let interval: number;
    if (viewMode === 'live') {
      interval = window.setInterval(() => {
        setLiveSimulationOffset(prev => prev + (Math.random() * 2 - 1));
        setTheatreZones(prevZones => prevZones.map(zone => ({
          ...zone,
          seats: zone.seats.map(s => {
            if (Math.random() > 0.95) {
              return { ...s, heat: Math.min(1, Math.max(0.1, s.heat + (Math.random() * 0.1 - 0.05))) };
            }
            return s;
          })
        })));
      }, 2500);
    } else {
      setLiveSimulationOffset(0);
    }
    return () => clearInterval(interval);
  }, [viewMode]);

  const [isDynamicPricingActive, setIsDynamicPricingActive] = useState(false);
  const [isActivatingPricing, setIsActivatingPricing] = useState(false);

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    { id: 1, title: 'تحذير تدفق', message: 'ارتفاع مفاجئ في كثافة الجمهور عند البوابة 4.', time: 'منذ دقيقتين', type: 'surge', isRead: false },
    { id: 2, title: 'تنبيه مبيعات', message: 'معدل حجز عرض "أوبرا عايدة" أقل من المتوقع بنسبة 12%.', time: 'منذ ساعة', type: 'sales', isRead: true },
  ]);

  const handleToggleDynamicPricing = async () => {
    if (isDynamicPricingActive) {
      setIsDynamicPricingActive(false);
      addToast('تم إيقاف التسعير الديناميكي.', 'info');
      return;
    }
    
    setIsActivatingPricing(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsActivatingPricing(false);
    setIsDynamicPricingActive(true);
    addToast('تم تفعيل التسعير الديناميكي. الخوارزمية تراقب الطلب الآن.', 'success');
  };

  const handleToggleViewMode = (mode: 'live' | 'historical') => {
    setViewMode(mode);
    addToast(mode === 'live' ? 'تم الانتقال إلى وضع البث المباشر.' : 'تم الانتقال إلى عرض البيانات التاريخية.', 'info');
  };

  const menuItems = [
    { label: 'الرئيسية', icon: <Monitor className="w-5 h-5" /> },
    { label: 'تفاعل الجمهور', icon: <Activity className="w-5 h-5" /> },
    { label: 'إدارة العروض', icon: <Ticket className="w-5 h-5" /> },
    { label: 'إدارة التذاكر', icon: <Tags className="w-5 h-5" /> },
    { label: 'تكامل البيانات', icon: <Database className="w-5 h-5" /> },
    { label: 'الجمهور', icon: <Users className="w-5 h-5" /> },
    { label: 'العملاء', icon: <User className="w-5 h-5" /> },
    { label: 'التنبؤ بالإقبال', icon: <Target className="w-5 h-5" /> },
    { label: 'التسعير الديناميكي', icon: <Rocket className="w-5 h-5" /> },
    { label: 'مركز الأرباح', icon: <TrendingUp className="w-5 h-5" /> },
  ];

  const handleSeatClick = (seat: SeatData, x: number, y: number, zoneName: string, row: number, col: number, zoneId: string) => {
    if (clickedSeat?.seat.id === seat.id) {
      setClickedSeat(null);
    } else {
      setClickedSeat({ seat, x, y, zoneName, row, col, zoneId });
      setEditStatus(seat.status);
      setEditPrice(seat.price || 0);
    }
  };

  const handleUpdateSeat = () => {
    if (!clickedSeat) return;

    const updatedZones = theatreZones.map(zone => {
      if (zone.id === clickedSeat.zoneId) {
        return {
          ...zone,
          seats: zone.seats.map(s => {
            if (s.id === clickedSeat.seat.id) {
              return { 
                ...s, 
                status: editStatus, 
                price: editPrice,
                occupied: editStatus === 'booked' 
              };
            }
            return s;
          })
        };
      }
      return zone;
    });

    setTheatreZones(updatedZones);
    addToast('تم تحديث بيانات المقعد بنجاح.', 'success');
    setClickedSeat(null);
  };

  const handleSeatHover = (seat: SeatData | null, e: React.MouseEvent | null, zoneName?: string, row?: number, col?: number) => {
    if (!seat || !e || !zoneName || row === undefined || col === undefined) {
      setHoveredSeat(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredSeat({
      seat,
      x: rect.left + rect.width / 2,
      y: rect.top,
      zoneName,
      row,
      col
    });
  };

  // Improved Color Interpolation for Heatmap
  const getHeatmapColor = (heat: number, status: string, occupied: boolean) => {
    if (!occupied && status === 'available') return 'rgba(100, 255, 218, 0.15)';
    if (!occupied && status === 'premium') return 'rgba(99, 102, 241, 0.6)';
    
    // Scale: Green (low) -> Yellow (mid) -> Red (high)
    const r = Math.round(255 * heat);
    const g = Math.round(255 * (1 - heat));
    const b = 50;
    const opacity = 0.6 + (heat * 0.4);
    
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const SeatGrid: React.FC<{ 
    seats: SeatData[]; 
    cols: number; 
    size?: 'sm' | 'md' | 'lg'; 
    zoneName: string;
    zoneId: string;
    onSeatClick?: (seat: SeatData, x: number, y: number, zoneName: string, row: number, col: number, zoneId: string) => void;
    onSeatHover?: (seat: SeatData | null, e: React.MouseEvent | null, zoneName?: string, row?: number, col?: number) => void;
  }> = ({ seats, cols, size = 'md', zoneName, zoneId, onSeatClick, onSeatHover }) => {
    return (
      <div className={`grid p-1 ${size === 'sm' ? 'gap-0.5' : 'gap-1.5'}`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {seats.map((seat, index) => {
          const isSelected = clickedSeat?.seat.id === seat.id;
          const isHovered = hoveredSeat?.seat.id === seat.id;
          const rowNum = Math.floor(index / cols) + 1;
          const colNum = (index % cols) + 1;
          const seatColor = getHeatmapColor(seat.heat, seat.status, seat.occupied);

          return (
            <button 
              key={seat.id} 
              onMouseEnter={(e) => onSeatHover?.(seat, e, zoneName, rowNum, colNum)}
              onMouseLeave={() => onSeatHover?.(null, null)}
              onClick={(e) => {
                e.stopPropagation();
                if (onSeatClick) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  onSeatClick(seat, rect.left + rect.width / 2, rect.top, zoneName, rowNum, colNum, zoneId);
                }
              }}
              style={{ backgroundColor: seatColor }}
              className={`
                ${size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-5 h-5 md:w-6 md:h-6' : 'w-4 h-4 md:w-5 md:h-5'} 
                rounded-full transition-all duration-300 border border-white/5
                ${isSelected ? 'scale-[2.5] z-30 ring-[8px] ring-electric-teal/50 ring-offset-2 ring-offset-[#0A192F] shadow-[0_0_40px_rgba(100,255,218,1)] !bg-white' : 
                  isHovered ? 'scale-[1.8] z-20 ring-2 ring-white shadow-[0_0_15px_rgba(255,255,255,0.6)]' : 
                  'hover:scale-[1.4] hover:z-10'} 
                relative flex items-center justify-center cursor-pointer focus:outline-none
              `}
            >
              {isSelected && (
                <div className="absolute inset-0 rounded-full animate-ping bg-electric-teal opacity-60 scale-[2.5]" />
              )}
              {isHovered && (
                <span className="text-[6px] md:text-[8px] font-black text-black absolute inset-0 flex items-center justify-center pointer-events-none">
                  {Math.round(seat.heat * 100)}%
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    const handleGlobalClick = () => {
      setClickedSeat(null);
      setIsNotificationsOpen(false);
      setIsAddWidgetOpen(false);
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const sparklineData = Array.from({ length: 10 }).map(() => ({ v: 30 + Math.random() * 40 }));

  const onLayoutChange = (layout: any, layouts: any) => {
    setCurrentLayout(layouts);
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    addToast(isEditMode ? 'وضع التخصيص نشط الآن. يمكنك سحب، تغيير حجم، أو حذف الودجات.' : 'تم حفظ التعديلات في النظام.', isEditMode ? 'info' : 'success');
  };

  const handleResetLayout = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في إعادة تعيين واجهة التحكم إلى الإعدادات الافتراضية؟ ستفقد جميع التخصيصات الحالية.')) {
      setActiveWidgets(DEFAULT_ACTIVE_WIDGETS);
      setCurrentLayout(DEFAULT_LAYOUT);
      localStorage.removeItem('stagemind_dashboard_layout');
      localStorage.removeItem('stagemind_active_widgets');
      addToast('تمت إعادة تعيين واجهة التحكم للإعدادات الافتراضية.', 'info');
    }
  };

  const handleRemoveWidget = (id: string) => {
    setActiveWidgets(prev => prev.filter(w => w !== id));
    addToast(`تمت إزالة العنصر من اللوحة.`, 'info');
  };

  const handleAddWidget = (id: string) => {
    if (activeWidgets.includes(id)) {
      addToast('هذا العنصر موجود بالفعل على اللوحة.', 'error');
      return;
    }
    setActiveWidgets(prev => [...prev, id]);
    addToast('تمت إضافة العنصر الجديد بنجاح.', 'success');
    setIsAddWidgetOpen(false);
  };

  const availableWidgetsToPick = [
    { id: 'occupancy-heatmap', label: 'خارطة كثافة الإشغال الذكية', icon: <MapIcon className="w-4 h-4" /> },
    { id: 'kpi-attendance', label: 'كثافة الحضور', icon: <Users className="w-4 h-4" /> },
    { id: 'ai-advisor-mini', label: 'نصائح الذكاء الاصطناعي', icon: <BrainCircuit className="w-4 h-4" /> },
    { id: 'system-logs', label: 'سجلات النظام اللحظية', icon: <Activity className="w-4 h-4" /> },
    { id: 'kpi-revenue', label: 'العائد لكل مقعد', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'kpi-occupancy', label: 'نسبة الإشغال', icon: <Layout className="w-4 h-4" /> },
    { id: 'kpi-prediction', label: 'دقة التنبؤ', icon: <Target className="w-4 h-4" /> },
    { id: 'kpi-security', label: 'أمان النظام', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const renderOccupancyHeatmap = (isEdit: boolean) => (
    <div className={`glass-card p-8 md:p-12 rounded-[56px] border border-white/5 relative overflow-hidden group shadow-3xl h-full flex flex-col ${isEdit ? 'border-dashed border-white/20' : ''}`}>
      {isEdit && (
        <>
          <div className="absolute top-6 left-6 p-2 bg-white/10 rounded-full cursor-grab active:cursor-grabbing z-20">
            <GripVertical className="w-6 h-6 text-white/60" />
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); handleRemoveWidget('occupancy-heatmap'); }}
            className="absolute top-6 right-6 p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all z-20"
          >
            <X className="w-4 h-4" />
          </button>
        </>
      )}
      
      <div className="flex items-center justify-between mb-8 flex-row-reverse relative z-10">
        <div className="text-right">
          <h3 className="text-2xl font-black text-white font-plex">خارطة كثافة الإشغال الذكية</h3>
          <p className="text-gray-500 text-[10px] font-bold font-plex mt-1 uppercase tracking-widest">تحليل توزيع الحشود والطلب اللحظي على المقاعد</p>
        </div>
        <div className="flex items-center gap-3 bg-black/40 px-5 py-2.5 rounded-2xl border border-white/5">
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#ef4444] shadow-[0_0_8px_#ef4444]" /><span className="text-[8px] font-black text-gray-400 uppercase font-plex">High Demand</span></div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24] shadow-[0_0_8px_#fbbf24]" /><span className="text-[8px] font-black text-gray-400 uppercase font-plex">Moderate</span></div>
           <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" /><span className="text-[8px] font-black text-gray-400 uppercase font-plex">Available</span></div>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-[#0A192F]/60 rounded-[48px] border border-white/5 p-6 md:p-10 flex flex-col items-center overflow-auto custom-scrollbar relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(100,255,218,0.03),transparent)] pointer-events-none" />
          
          <div className="w-full h-10 bg-gradient-to-b from-slate-800/40 to-transparent rounded-b-[40px] mb-12 relative flex items-center justify-center border-t border-slate-700/20">
             <div className="absolute inset-x-0 bottom-0 h-[1px] bg-electric-teal/10 blur-sm" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[1em] font-plex ml-4">STAGE - الخشبة</span>
          </div>
          
          <div className="w-full space-y-16 pb-12 relative z-10">
             <div className="flex justify-center gap-12">
                {theatreZones.slice(0, 2).map(zone => (
                   <div key={zone.id} className="p-5 bg-white/[0.02] border border-white/10 rounded-[32px] flex flex-col items-center gap-4 transition-all hover:bg-white/[0.05] hover:border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-3 h-3 text-amber-gold fill-amber-gold" />
                        <span className="text-[10px] font-black text-amber-gold uppercase tracking-widest">{zone.name}</span>
                      </div>
                      <SeatGrid seats={zone.seats} cols={4} size="md" zoneName={zone.name} zoneId={zone.id} onSeatClick={handleSeatClick} onSeatHover={handleSeatHover} />
                   </div>
                ))}
             </div>
             
             <div className="space-y-12 flex flex-col items-center">
                {theatreZones.slice(2, 5).map(zone => (
                   <div key={zone.id} className="p-8 bg-white/[0.01] border border-white/5 rounded-[48px] flex flex-col items-center w-full max-w-5xl group/zone hover:bg-white/[0.03] transition-colors relative">
                      <div className="absolute top-4 right-8 flex items-center gap-2">
                        <Users className="w-3 h-3 text-gray-500" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover/zone:text-electric-teal transition-colors">{zone.name}</span>
                      </div>
                      <div className="mt-4">
                        <SeatGrid 
                          seats={zone.seats} 
                          cols={zone.id === 'o1' ? 8 : zone.id === 'o2' ? 12 : 15} 
                          size="md" 
                          zoneName={zone.name} 
                          zoneId={zone.id}
                          onSeatClick={handleSeatClick} 
                          onSeatHover={handleSeatHover} 
                        />
                      </div>
                   </div>
                ))}
             </div>
          </div>
      </div>
      
      <div className="mt-8 flex items-center justify-between flex-row-reverse border-t border-white/5 pt-8">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">متوسط الإشغال</span>
            <span className="text-xl font-black text-white font-plex">88.4%</span>
          </div>
          <div className="w-12 h-12 bg-electric-teal/10 rounded-2xl flex items-center justify-center text-electric-teal border border-electric-teal/20">
            <Activity className="w-6 h-6" />
          </div>
        </div>
        <button onClick={() => addToast('جاري تحديث بيانات الكثافة...', 'info')} className="flex items-center gap-3 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-black text-gray-400 hover:text-white hover:bg-white/10 transition-all font-plex">
          <RefreshCw className="w-4 h-4" />
          <span>تحديث الخريطة اللحظي</span>
        </button>
      </div>
    </div>
  );

  const renderDashboardWidgets = () => (
    <ResponsiveGridLayout
      className="layout"
      layouts={currentLayout}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={100}
      isDraggable={isEditMode}
      isResizable={isEditMode}
      onLayoutChange={onLayoutChange}
      draggableHandle={isEditMode ? ".cursor-grab" : ""}
      margin={[24, 24]}
    >
      {activeWidgets.map(widgetId => {
        switch (widgetId) {
          case 'conductor':
            return (
              <div key="conductor">
                <div className={`flex flex-col md:flex-row-reverse p-6 md:p-10 lg:p-12 items-center justify-between gap-6 bg-[#112240]/40 rounded-[56px] border border-white/5 relative overflow-hidden group shadow-2xl transition-all duration-700 hover:border-electric-teal/20 h-full ${isEditMode ? 'border-dashed border-white/20' : ''}`}>
                  {isEditMode && (
                    <>
                      <div className="absolute top-6 left-6 p-2 bg-white/10 rounded-full cursor-grab active:cursor-grabbing z-20">
                        <GripVertical className="w-5 h-5 text-white/60" />
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleRemoveWidget('conductor'); }}
                        className="absolute top-6 right-6 p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all z-20"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_50%,rgba(100,255,218,0.08),transparent)] pointer-events-none" />
                  <div className="flex items-center gap-6 flex-row relative z-10 flex-col md:flex-row text-right">
                    <div className="relative">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-electric-teal rounded-[30px] flex items-center justify-center text-[#0A192F] shadow-[0_0_80px_rgba(100,255,218,0.4)] transition-transform group-hover:scale-110 duration-700 relative overflow-hidden">
                        <BrainCircuit className="w-8 h-8 md:w-10 md:h-10" />
                      </div>
                    </div>
                    <div className="text-right">
                      <h2 className="text-xl md:text-3xl font-black text-white tracking-tighter font-plex drop-shadow-2xl">StageMind Conductor™</h2>
                      <p className="text-gray-400 text-xs md:text-sm font-medium leading-relaxed max-w-xl font-plex italic">
                        {viewMode === 'live' 
                          ? 'أهلاً بك يا محمد. القاعة جاهزة للعرض القادم، يمكنك الآن تفعيل التسعير الذكي لرفع كفاءة العوائد.' 
                          : 'أنت تشاهد الآن التقارير التحليلية للمواسم السابقة. استخدم هذه البيانات لتحسين استراتيجية العام القادم.'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 relative z-10 flex-row-reverse justify-center">
                    <button onClick={handleToggleDynamicPricing} className={`px-6 md:px-10 py-3 md:py-4 rounded-[20px] text-xs font-black transition-all flex items-center gap-3 font-plex shadow-xl relative overflow-hidden active:scale-95 border ${isDynamicPricingActive ? 'bg-amber-gold text-[#0A192F] border-amber-gold/50' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
                      <Zap className={`w-4 h-4 ${isDynamicPricingActive ? 'fill-current animate-pulse' : 'text-amber-gold'}`} />
                      <span>{isDynamicPricingActive ? 'التسعير نشط' : 'تفعيل التسعير'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          case 'kpi-revenue':
            return (
              <div key="kpi-revenue">
                <KPICard label="العائد لكل مقعد" val={viewMode === 'live' ? `$${(242 + liveSimulationOffset).toFixed(0)}` : "$198"} target="$210" change="+14.2%" icon={<TrendingUp className="w-6 h-6" />} themeColor="gold" data={sparklineData} isEditMode={isEditMode} onRemove={() => handleRemoveWidget('kpi-revenue')} viewMode={viewMode} />
              </div>
            );
          case 'kpi-occupancy':
            return (
              <div key="kpi-occupancy">
                <KPICard label="الإشغال" val={viewMode === 'live' ? `${(88.4 + (liveSimulationOffset/10)).toFixed(1)}%` : "76.2%"} target="85.0%" change="+5.1%" icon={<Users className="w-6 h-6" />} themeColor="teal" data={sparklineData} isEditMode={isEditMode} onRemove={() => handleRemoveWidget('kpi-occupancy')} viewMode={viewMode} />
              </div>
            );
          case 'kpi-prediction':
            return (
              <div key="kpi-prediction">
                <KPICard label="دقة التنبؤ" val="96.4%" target="94.0%" change="مستقر" icon={<Target className="w-6 h-6" />} themeColor="purple" data={sparklineData} isEditMode={isEditMode} onRemove={() => handleRemoveWidget('kpi-prediction')} viewMode={viewMode} />
              </div>
            );
          case 'kpi-security':
            return (
              <div key="kpi-security">
                <KPICard label="أمان النظام" val="محصن" target="Secure" change="Active" icon={<ShieldCheck className="w-6 h-6" />} themeColor="blue" data={sparklineData} isEditMode={isEditMode} onRemove={() => handleRemoveWidget('kpi-security')} viewMode={viewMode} />
              </div>
            );
          case 'kpi-attendance':
            return (
              <div key="kpi-attendance">
                <KPICard label="كثافة الحضور" val="مزدحم" target="Normal" change="+22%" icon={<Flame className="w-6 h-6" />} themeColor="purple" data={sparklineData} isEditMode={isEditMode} onRemove={() => handleRemoveWidget('kpi-attendance')} viewMode={viewMode} />
              </div>
            );
          case 'ai-advisor-mini':
            return (
              <div key="ai-advisor-mini" className={`glass-card p-8 rounded-[48px] border border-white/5 relative overflow-hidden group shadow-2xl h-full flex flex-col ${isEditMode ? 'border-dashed border-white/20' : ''}`}>
                {isEditMode && (
                  <>
                    <div className="absolute top-4 left-4 p-2 bg-white/10 rounded-full cursor-grab active:cursor-grabbing z-20">
                      <GripVertical className="w-4 h-4 text-white/40" />
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRemoveWidget('ai-advisor-mini'); }}
                      className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all z-20"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </>
                )}
                <div className="flex items-center gap-3 justify-end mb-4">
                   <span className="text-xs font-black text-white font-plex">توصية الذكاء الاصطناعي</span>
                   <BrainCircuit className="w-5 h-5 text-electric-teal" />
                </div>
                <p className="text-xs text-gray-400 leading-relaxed text-right mb-4">نظام Conductor يقترح تقليل السعر في "الشرفة الثانية" بنسبة 5% لملء آخر 20 مقعداً قبل بدء العرض بـ 30 دقيقة.</p>
                <button onClick={() => addToast('تم تطبيق التوصية آلياً.', 'success')} className="mt-auto w-full py-2 bg-electric-teal/10 text-electric-teal text-[10px] font-black rounded-xl border border-electric-teal/20 hover:bg-electric-teal hover:text-[#0A192F] transition-all">تطبيق التوصية الآن</button>
              </div>
            );
          case 'system-logs':
            return (
              <div key="system-logs" className={`glass-card p-6 rounded-[48px] border border-white/5 relative overflow-hidden group shadow-2xl h-full flex flex-col ${isEditMode ? 'border-dashed border-white/20' : ''}`}>
                {isEditMode && (
                  <>
                    <div className="absolute top-4 left-4 p-2 bg-white/10 rounded-full cursor-grab active:cursor-grabbing z-20">
                      <GripVertical className="w-4 h-4 text-white/40" />
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleRemoveWidget('system-logs'); }}
                      className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all z-20"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </>
                )}
                <div className="flex items-center gap-3 justify-end mb-4 border-b border-white/5 pb-2">
                   <span className="text-[10px] font-black text-gray-400 font-plex">سجلات التشغيل الحية</span>
                   <Activity className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2">
                   {[
                     { t: '10:42', m: 'فتح البوابة 4 آلياً لتخفيف الضغط' },
                     { t: '10:38', m: 'تحديث الأسعار في منطقة الأوركسترا' },
                     { t: '10:35', m: 'اكتمال فحص أنظمة الصوت' },
                   ].map((log, i) => (
                     <div key={i} className="flex flex-row-reverse justify-between gap-2">
                       <span className="text-[8px] font-black text-gray-600">{log.t}</span>
                       <span className="text-[9px] text-gray-400 text-right">{log.m}</span>
                     </div>
                   ))}
                </div>
              </div>
            );
          case 'seat-density':
            return (
              <div key="seat-density">
                <div className={`glass-card p-6 md:p-10 rounded-[56px] border border-white/5 shadow-2xl relative overflow-hidden group/seats h-full ${isEditMode ? 'border-dashed border-white/20' : ''}`}>
                  {isEditMode && (
                    <>
                      <div className="absolute top-4 left-4 p-2 bg-white/10 rounded-full cursor-grab active:cursor-grabbing z-20">
                        <GripVertical className="w-4 h-4 text-white/40" />
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleRemoveWidget('seat-density'); }}
                        className="absolute top-4 right-4 p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all z-20"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <div className="flex items-center justify-between mb-6 flex-row-reverse relative z-10">
                    <h4 className="text-sm font-black text-white font-plex">{viewMode === 'live' ? 'كثافة المقاعد الحالية' : 'توزيع الكثافة التاريخي'}</h4>
                    <Navigation2 className="w-4 h-4 text-electric-teal -rotate-45" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="bg-black/20 rounded-[32px] p-4 flex flex-col items-center justify-center border border-white/5">
                      <div className="w-full h-2 md:h-4 bg-slate-700/30 rounded-b-2xl mb-4 flex items-center justify-center">
                        <span className="text-[6px] text-slate-500 font-black tracking-[0.2em] uppercase font-plex">Stage</span>
                      </div>
                      <div className="flex flex-col gap-1 scale-[0.7] md:scale-90 origin-top">
                        <div className="flex justify-between w-full gap-2">
                          <SeatGrid seats={theatreZones[0].seats.slice(0, 8)} cols={4} size="sm" zoneName={theatreZones[0].name} zoneId={theatreZones[0].id} onSeatClick={handleSeatClick} onSeatHover={handleSeatHover} />
                          <SeatGrid seats={theatreZones[1].seats.slice(0, 8)} cols={4} size="sm" zoneName={theatreZones[1].name} zoneId={theatreZones[1].id} onSeatClick={handleSeatClick} onSeatHover={handleSeatHover} />
                        </div>
                        <SeatGrid seats={theatreZones[2].seats.slice(0, 32)} cols={8} size="sm" zoneName={theatreZones[2].name} zoneId={theatreZones[2].id} onSeatClick={handleSeatClick} onSeatHover={handleSeatHover} />
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('الجمهور')} className="w-full py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-gray-400 hover:text-white hover:bg-white/10 transition-all font-plex">الخريطة الكاملة</button>
                  </div>
                </div>
              </div>
            );
          case 'occupancy-heatmap':
            return (
              <div key="occupancy-heatmap">
                {renderOccupancyHeatmap(isEditMode)}
              </div>
            );
          case 'main-charts':
            return (
              <div key="main-charts">
                <div className={`glass-card p-6 md:p-10 rounded-[56px] border border-white/5 shadow-3xl text-right relative overflow-hidden h-full ${isEditMode ? 'border-dashed border-white/20' : ''}`}>
                  {/* Subtle Parallax Background Blobs */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                    <div 
                      className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-electric-teal/5 rounded-full blur-[80px] transition-transform duration-200 ease-out" 
                      style={{ transform: `translateY(${scrollTop * 0.08}px) scale(${1 + Math.sin(scrollTop/1000) * 0.1})` }}
                    />
                    <div 
                      className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-amber-gold/5 rounded-full blur-[70px] transition-transform duration-300 ease-out" 
                      style={{ transform: `translateY(${scrollTop * -0.04}px)` }}
                    />
                  </div>
                  
                  {isEditMode && (
                    <>
                      <div className="absolute top-6 left-6 p-2 bg-white/10 rounded-full cursor-grab active:cursor-grabbing z-20">
                        <GripVertical className="w-5 h-5 text-white/60" />
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleRemoveWidget('main-charts'); }}
                        className="absolute top-6 right-6 p-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all z-20"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  )}
                  <div className="flex items-center justify-between mb-8 flex-row relative z-10">
                    <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${viewMode === 'live' ? 'bg-electric-teal/10 border-electric-teal/20 text-electric-teal' : 'bg-amber-gold/10 border-amber-gold/20 text-amber-gold'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${viewMode === 'live' ? 'bg-electric-teal animate-pulse' : 'bg-amber-gold'}`} />
                      <span className="text-[9px] font-black uppercase tracking-widest font-plex">{viewMode === 'live' ? 'AI Monitoring Live' : 'Historical Analysis'}</span>
                    </div>
                    <h3 className="text-xl font-black text-white font-plex tracking-tight">لوحة المؤشرات التشغيلية</h3>
                  </div>
                  <div className="h-full max-h-[calc(100%-80px)] overflow-hidden relative z-10">
                    <DashboardPreview isLive={viewMode === 'live'} />
                  </div>
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </ResponsiveGridLayout>
  );

  return (
    <div className="min-h-screen bg-[#0A192F] flex flex-row overflow-hidden font-cairo selection:bg-electric-teal/30">
      {isSidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[45] lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
      <aside className={`fixed lg:relative inset-y-0 right-0 w-72 md:w-80 bg-[#070D17] border-l border-white/5 flex flex-col z-50 transition-all duration-500 shadow-[-60px_0_120px_rgba(0,0,0,0.8)] lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-8 md:p-12 flex items-center gap-4 md:gap-5 border-b border-white/5 mb-6 md:mb-10 justify-end group cursor-pointer transition-all relative z-10 text-right">
          <div><span className="text-xl md:text-2xl font-black text-white tracking-tighter group-hover:text-electric-teal transition-colors font-plex">StageMind <span className="text-electric-teal">AI</span></span><p className="text-[8px] md:text-[9px] text-gray-500 font-black uppercase tracking-[0.4em] mt-1.5 opacity-40 font-plex">OS 3.1</p></div>
          <div className="bg-electric-teal/5 p-3 rounded-2xl border border-electric-teal/10 group-hover:bg-electric-teal group-hover:text-[#0A192F] transition-all duration-700 shadow-2xl"><Zap className="w-6 h-6 fill-current" /></div>
        </div>
        <nav className="flex-1 px-4 md:px-8 space-y-2 relative z-10 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, i) => (
            <button key={i} onClick={() => { setActiveTab(item.label); if (window.innerWidth < 1024) setIsSidebarOpen(false); }} className={`w-full flex items-center justify-start gap-4 md:gap-5 px-4 md:px-6 py-4 rounded-2xl transition-all duration-500 relative group overflow-hidden flex-row-reverse text-right active:scale-95 ${activeTab === item.label ? 'bg-white/5 text-electric-teal font-black shadow-inner border border-white/5' : 'text-gray-500 hover:bg-white/5 hover:text-white font-bold opacity-60'}`}>
              <span className="text-sm md:text-base tracking-wide font-plex flex-1">{item.label}</span>
              <div className={`transition-all duration-500 ${activeTab === item.label ? 'scale-125 text-electric-teal drop-shadow-[0_0_10px_rgba(100,255,218,0.5)]' : 'group-hover:scale-110 opacity-40 group-hover:opacity-100'}`}>{item.icon}</div>
              {activeTab === item.label && <div className="absolute right-0 top-3 bottom-3 w-1 bg-electric-teal rounded-full animate-pulse" />}
            </button>
          ))}
        </nav>
        <div className="p-6 md:p-10 space-y-4 border-t border-white/5 bg-black/30 relative z-10">
           <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 py-3 md:py-5 rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-400/5 transition-all font-black text-xs font-plex group shadow-inner">إنهاء الجلسة الآمنة<LogOut className="w-4 h-4" /></button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_0%,#0F223D_0%,#0A192F_100%)] relative">
        <header className="h-20 md:h-28 bg-[#0A192F]/40 backdrop-blur-3xl border-b border-white/5 flex items-center justify-between px-6 md:px-16 z-40 relative shadow-2xl">
          <div className="flex items-center gap-4 relative z-10">
            <button onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(true); }} className="lg:hidden p-3 text-gray-400 hover:text-white transition-all bg-white/5 border border-white/10 rounded-xl active:scale-95"><Menu className="w-5 h-5" /></button>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-3xl shadow-inner group cursor-help transition-all duration-500 ${viewMode === 'live' ? 'bg-green-500/5 border-green-500/10' : 'bg-amber-gold/5 border-amber-gold/10'}`}>
              <span className={`text-[8px] md:text-[11px] font-black uppercase tracking-[0.2em] font-plex ${viewMode === 'live' ? 'text-green-500' : 'text-amber-gold'}`}>
                {viewMode === 'live' ? 'Engine Live' : 'Archive Mode'}
              </span>
              <div className={`w-2 h-2 rounded-full shadow-lg ${viewMode === 'live' ? 'bg-green-500 animate-pulse' : 'bg-amber-gold'}`} />
            </div>
          </div>
          <div className="flex items-center gap-4 flex-row relative z-10">
            <div className="relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setIsNotificationsOpen(!isNotificationsOpen); }}
                className={`p-3 md:p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all relative group ${isNotificationsOpen ? 'text-electric-teal border-electric-teal/30' : 'text-gray-400'}`}
              >
                <Bell className="w-5 h-5 md:w-6 md:h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#0A192F] shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                  {notifications.filter(n => !n.isRead).length}
                </span>
              </button>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer bg-white/5 pl-3 pr-4 py-2 rounded-[16px] border border-white/5 hover:bg-white/10 transition-all">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-white font-plex">محمد آل علي</p>
                <p className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.1em] opacity-40 font-plex">Ops Conductor</p>
              </div>
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-electric-teal to-blue-600 flex items-center justify-center font-black text-[#0A192F] shadow-2xl text-[10px] md:sm font-plex">MA</div>
            </div>
          </div>
        </header>

        <div 
          ref={dashboardContainerRef}
          className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12 xl:p-16 space-y-12 relative z-10"
        >
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8 border-b border-white/5 pb-12">
             <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto justify-center lg:justify-start">
               {/* Quick Access Toggle View Mode */}
               <div className="flex items-center gap-2 bg-white/5 p-1.5 rounded-[22px] border border-white/10 shadow-inner group">
                  <button 
                    onClick={() => handleToggleViewMode('historical')}
                    className={`px-5 py-2.5 rounded-2xl text-[11px] font-black transition-all flex items-center gap-2 font-plex ${viewMode === 'historical' ? 'bg-amber-gold text-[#0A192F] shadow-xl' : 'text-gray-500 hover:text-white'}`}
                  >
                    <History className="w-3.5 h-3.5" />
                    <span>أرشيف</span>
                  </button>
                  <button 
                    onClick={() => handleToggleViewMode('live')}
                    className={`px-5 py-2.5 rounded-2xl text-[11px] font-black transition-all flex items-center gap-2 font-plex ${viewMode === 'live' ? 'bg-electric-teal text-[#0A192F] shadow-xl' : 'text-gray-500 hover:text-white'}`}
                  >
                    <Radio className={`w-3.5 h-3.5 ${viewMode === 'live' ? 'animate-pulse' : ''}`} />
                    <span>مباشر</span>
                  </button>
               </div>

               <div className="h-8 w-px bg-white/10 hidden sm:block mx-2" />

               <div className="flex items-center gap-2">
                <button 
                  onClick={handleToggleEditMode}
                  className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black text-sm transition-all border ${isEditMode ? 'bg-electric-teal text-[#0A192F] border-electric-teal shadow-xl' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
                >
                  {isEditMode ? <CheckCircle2 className="w-5 h-5" /> : <Settings2 className="w-5 h-5" />}
                  <span>{isEditMode ? 'حفظ التخطيط' : 'تخصيص اللوحة'}</span>
                </button>
                
                {isEditMode && (
                  <button 
                    onClick={handleResetLayout}
                    title="إعادة ضبط الواجهة للافتراضي"
                    className="flex items-center justify-center p-3.5 rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-xl active:scale-95"
                  >
                    <ResetIcon className="w-5 h-5" />
                  </button>
                )}
               </div>

               {isEditMode && (
                 <div className="relative">
                   <button 
                    onClick={(e) => { e.stopPropagation(); setIsAddWidgetOpen(!isAddWidgetOpen); }}
                    className="flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black text-sm bg-white/10 text-white border border-white/10 hover:bg-white/20 transition-all shadow-xl"
                   >
                     <PlusCircle className="w-5 h-5 text-electric-teal" />
                     <span>إضافة عنصر</span>
                   </button>
                   {isAddWidgetOpen && (
                     <div className="absolute top-full left-0 mt-4 bg-[#0F172A] border border-white/10 p-4 rounded-3xl shadow-3xl z-[100] min-w-[280px] animate-in slide-in-from-top-4">
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4 text-right">اختر عنصر لإضافته</p>
                        <div className="space-y-2">
                           {availableWidgetsToPick.map(w => (
                             <button 
                              key={w.id} 
                              onClick={() => handleAddWidget(w.id)}
                              className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all ${activeWidgets.includes(w.id) ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:bg-white/5'}`}
                             >
                               {activeWidgets.includes(w.id) ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Plus className="w-4 h-4 text-electric-teal" />}
                               <div className="flex items-center gap-3 flex-row-reverse">
                                 <span className="text-xs font-bold text-white font-plex">{w.label}</span>
                                 <span className="text-gray-500">{w.icon}</span>
                               </div>
                             </button>
                           ))}
                        </div>
                     </div>
                   )}
                 </div>
               )}

               <button onClick={() => setIsExporting(true)} className="relative bg-white text-[#0A192F] px-8 py-3.5 rounded-[20px] font-black text-sm md:text-base hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] transition-all flex items-center gap-3 active:scale-95 group">
                 <span className="relative z-10 flex items-center gap-3">
                   {isExporting ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileDown className="w-5 h-5 group-hover:translate-y-[-2px] transition-transform" />} 
                   {isExporting ? `جاري التصدير...` : 'تصدير التقارير'}
                 </span>
               </button>
             </div>
             <div className="text-right space-y-3 relative z-10 w-full lg:w-auto">
               <div className="flex items-center gap-3 justify-end text-gray-500 font-black text-[9px] uppercase tracking-[0.2em] mb-2 opacity-50 font-plex">
                  <span className="text-electric-teal bg-electric-teal/5 px-3 py-1 rounded-full border border-electric-teal/10">{activeTab}</span>
                  <ChevronLeft className="w-3 h-3 translate-x-1" />
                  <span>مركز التحكم التشغيلي</span>
               </div>
               <h1 className="text-3xl md:text-5xl xl:text-6xl font-black text-white tracking-tighter flex items-center gap-4 justify-end font-plex drop-shadow-2xl">{activeTab === 'الرئيسية' ? 'غرفة العمليات المركزية' : activeTab}</h1>
             </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 relative">
            {activeTab === 'الرئيسية' ? (
              <div className="relative min-h-[1200px]">
                {renderDashboardWidgets()}
              </div>
            ) : activeTab === 'الجمهور' ? (
              <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    {renderOccupancyHeatmap(false)}
                  </div>
                  <div className="space-y-8">
                     <div className="glass-card p-8 md:p-10 rounded-[48px] border border-white/5 shadow-2xl text-right">
                        <div className="flex items-center justify-between mb-8 flex-row-reverse">
                          <h4 className="text-xl font-black text-white font-plex">تحليل توزيع الحضور</h4>
                          <Users className="w-6 h-6 text-electric-teal" />
                        </div>
                        <div className="space-y-6">
                          {theatreZones.map((zone, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between items-center flex-row-reverse">
                                <span className="text-sm font-bold text-gray-400">{zone.name}</span>
                                <span className="text-sm font-black text-white font-plex">{zone.occupancy}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full transition-all duration-1000 ${zone.heat > 0.8 ? 'bg-red-500' : zone.heat > 0.4 ? 'bg-amber-gold' : 'bg-electric-teal'}`} 
                                  style={{ width: `${zone.occupancy}%` }} 
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                     </div>
                     
                     <div className="glass-card p-8 md:p-10 rounded-[48px] border border-white/5 bg-electric-teal/5 text-right relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-20 h-1 bg-electric-teal" />
                        <div className="flex items-center gap-4 justify-end mb-6">
                          <div className="text-right">
                            <h4 className="text-lg font-black text-white font-plex">بصيرة StageMind AI</h4>
                            <p className="text-[10px] text-electric-teal font-black uppercase tracking-widest">Real-time Optimization</p>
                          </div>
                          <BrainCircuit className="w-8 h-8 text-electric-teal animate-pulse" />
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed font-medium mb-6">
                          بناءً على وتيرة الدخول الحالية، من المتوقع اكتمال إشغال منطقة "الأوركسترا مقدمة" خلال 8 دقائق. ننصح ببدض تحضير الكادر التنظيمي لمسح التذاكر عند المدخل الشمالي.
                        </p>
                        <button onClick={() => addToast('جاري إرسال التعليمات للكادر الميداني...', 'info')} className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-electric-teal hover:bg-electric-teal/10 transition-all font-plex">توجيه الكادر الميداني</button>
                     </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-12 animate-in fade-in zoom-in duration-1000">
                <div className="relative p-16 bg-[#112240]/40 rounded-[64px] border border-white/10 backdrop-blur-3xl shadow-3xl group cursor-help"><Loader2 className="w-28 h-28 text-electric-teal animate-spin" /></div>
                <div className="space-y-6 relative z-10">
                  <h2 className="text-5xl font-black text-white tracking-tight font-plex">{activeTab}</h2>
                  <p className="text-gray-400 max-w-2xl text-xl font-medium leading-relaxed opacity-70 font-plex">نظام الحوسبة اللحظية يقوم الآن بمعالجة البيانات الضخمة لهذا القسم.</p>
                </div>
              </div>
            )}

            {/* REFINED HOVER TOOLTIP */}
            {hoveredSeat && !clickedSeat && (
              <div 
                className="fixed z-[110] -translate-x-1/2 -translate-y-[110%] pointer-events-none animate-in fade-in zoom-in-95 duration-200"
                style={{ left: hoveredSeat.x, top: hoveredSeat.y }}
              >
                <div className="bg-[#0A192F]/98 border border-white/30 p-5 rounded-2xl shadow-3xl backdrop-blur-2xl text-right min-w-[220px] ring-1 ring-white/10">
                  <div className="flex items-center justify-between mb-3 flex-row-reverse border-b border-white/10 pb-2">
                    <span className="text-[10px] font-black text-electric-teal font-plex uppercase tracking-widest">{hoveredSeat.zoneName}</span>
                    <span className="text-xs font-black text-white font-plex">{hoveredSeat.row} : {hoveredSeat.col}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between flex-row-reverse">
                      <span className="text-[9px] text-gray-500 font-bold font-plex uppercase">الحالة</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${hoveredSeat.seat.status === 'booked' ? 'text-red-400 bg-red-400/10' : hoveredSeat.seat.status === 'premium' ? 'text-indigo-400 bg-indigo-400/10' : 'text-emerald-400 bg-emerald-400/10'}`}>
                        {hoveredSeat.seat.status === 'booked' ? 'محجوز' : hoveredSeat.seat.status === 'premium' ? 'مميز' : 'متاح'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between flex-row-reverse">
                      <span className="text-[9px] text-gray-500 font-bold font-plex uppercase">الإشغال</span>
                      <span className="text-xs font-black text-white font-plex">{Math.round(hoveredSeat.seat.heat * 100)}%</span>
                    </div>
                    <div className="flex items-center justify-between flex-row-reverse">
                      <span className="text-[9px] text-gray-500 font-bold font-plex uppercase">فئة السعر</span>
                      <span className="text-[10px] font-black text-amber-gold font-plex">{hoveredSeat.seat.status === 'premium' ? 'Tier 1 (VIP)' : hoveredSeat.seat.heat > 0.6 ? 'Tier 2 (High Demand)' : 'Tier 3 (Standard)'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODAL BACKDROP */}
            {clickedSeat && (
              <div 
                className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setClickedSeat(null)}
              />
            )}

            {/* ENHANCED SEAT INSPECTOR / EDITOR (MODAL) */}
            {clickedSeat && (
              <div 
                className="fixed z-[101] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mb-4 animate-in zoom-in-95 duration-300 pointer-events-none"
              >
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#0A192F]/95 backdrop-blur-3xl border border-white/20 p-8 rounded-[44px] shadow-[0_60px_150px_rgba(0,0,0,0.9)] min-w-[380px] sm:min-w-[420px] text-right pointer-events-auto border-b-electric-teal/40 border-b-4 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-6 flex-row-reverse border-b border-white/10 pb-5">
                    <div className="flex flex-col items-end">
                      <h5 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] font-plex leading-none mb-2">{clickedSeat.zoneName}</h5>
                      <div className="flex items-center gap-3 mt-1 text-white">
                        <span className="text-2xl font-black font-plex tracking-tight">الصف {clickedSeat.row}</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-electric-teal/30" />
                        <span className="text-2xl font-black text-electric-teal font-plex tracking-tight">المقعد {clickedSeat.col}</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setClickedSeat(null); }}
                      className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-gray-500 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 transition-all active:scale-90"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-8 relative z-10">
                      {/* STATUS EDITOR */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-1">تحديث حالة المقعد</label>
                        <div className="grid grid-cols-3 gap-2">
                           {[
                             { id: 'available', label: 'متاح', icon: <CheckCircle2 className="w-3 h-3" />, color: 'text-emerald-400' },
                             { id: 'booked', label: 'محجوز', icon: <Lock className="w-3 h-3" />, color: 'text-red-400' },
                             { id: 'premium', label: 'مميز', icon: <Star className="w-3 h-3" />, color: 'text-indigo-400' }
                           ].map(s => (
                             <button 
                              key={s.id}
                              onClick={() => setEditStatus(s.id as any)}
                              className={`flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border transition-all ${editStatus === s.id ? 'bg-white/10 border-electric-teal shadow-xl' : 'bg-white/[0.03] border-white/5 opacity-40 hover:opacity-100'}`}
                             >
                               <span className={s.color}>{s.icon}</span>
                               <span className="text-[10px] font-black text-white font-plex">{s.label}</span>
                             </button>
                           ))}
                        </div>
                      </div>

                      {/* PRICE EDITOR */}
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mr-1">تعديل القيمة السعرية ($)</label>
                        <div className="relative group">
                          <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-gold group-focus-within:scale-110 transition-transform" />
                          <input 
                            type="number" 
                            value={editPrice}
                            onChange={(e) => setEditPrice(parseInt(e.target.value) || 0)}
                            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pr-12 pl-4 text-white font-black text-2xl focus:outline-none focus:border-amber-gold/50 focus:ring-4 focus:ring-amber-gold/5 transition-all text-right font-plex"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-2">
                         <button onClick={() => addToast('جاري التحقق من سجل الحجز...', 'info')} className="flex items-center justify-center gap-2 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-gray-400 hover:text-white hover:bg-white/10 transition-all font-plex group">
                           <UserCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                           <span>سجل المقعد</span>
                         </button>
                         <button 
                          onClick={handleUpdateSeat}
                          className="flex items-center justify-center gap-3 py-4 bg-electric-teal text-[#0A192F] rounded-2xl text-sm font-black hover:shadow-[0_20px_40px_rgba(100,255,218,0.3)] hover:scale-[1.02] active:scale-[0.95] transition-all font-plex"
                         >
                           <Save className="w-4 h-4" />
                           <span>حفظ التعديلات</span>
                         </button>
                      </div>

                      <div className="pt-6 flex items-center justify-between flex-row-reverse border-t border-white/5 opacity-50">
                         <div className="text-right">
                           <p className="text-[9px] text-gray-500 font-black font-plex uppercase tracking-[0.2em] mb-1">تحليل الكثافة</p>
                           <p className="text-xl font-black text-white font-plex tracking-tighter">{Math.round(clickedSeat.seat.heat * 100)}%</p>
                         </div>
                         <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < (clickedSeat.seat.heat * 5) ? 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]' : 'bg-white/10'}`} />
                            ))}
                         </div>
                      </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
