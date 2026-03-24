import { Youtube, MonitorPlay, MessageSquare, Briefcase } from 'lucide-react';

export const FACTORS = {
  youtube: { audio: 0.005, '144p': 0.015, '360p': 0.035, '720p': 0.1, '1080p': 0.2, '4k': 0.8 },
  streaming: { netflix: 0.15, spotify: 0.02, twitch: 0.2 },
  social: { tiktok: 0.12, instagram: 0.08, twitter: 0.02 },
  work: { zoom: 1.2, email: 0.01, email_attachment: 0.05, slack: 0.005, cloud_gb: 0.03 },
  ai: { chatgpt: 0.005, midjourney: 0.05, copilot: 0.002 }
};

export const CATEGORIES = [
  {
    id: 'youtube', title: 'YouTube', icon: Youtube, color: 'text-rose-500', 
    theme: 'from-rose-500 to-rose-400', statLabel: 'Menonton Video', bgGlow: 'bg-rose-500/20',
    fields: [
      { id: 'url', label: 'URL Video YouTube', type: 'url', placeholder: 'https://youtube.com/watch?v=...' },
      { id: 'duration', label: 'Durasi Menonton (Menit)', type: 'number', unit: 'menit' },
      { id: 'quality', label: 'Kualitas Streaming', type: 'select', 
        options: [
          { value: 'audio', label: 'Audio Only', desc: '~0.005 kg CO₂/jam' },
          { value: '360p', label: 'SD (360p)', desc: '~0.035 kg CO₂/jam' },
          { value: '1080p', label: 'HD (1080p)', desc: '~0.2 kg CO₂/jam' },
          { value: '4k', label: '4K Ultra HD', desc: '~0.8 kg CO₂/jam' }
        ]}
    ]
  },
  {
    id: 'streaming', title: 'Streaming', icon: MonitorPlay, color: 'text-purple-600', 
    theme: 'from-purple-600 to-purple-500', statLabel: 'Konsumsi Konten', bgGlow: 'bg-purple-500/20',
    fields: [
      { id: 'netflix', label: 'Netflix / Disney+ (Jam/Hari)', type: 'number', unit: 'jam' },
      { id: 'spotify', label: 'Spotify / Apple Music (Jam/Hari)', type: 'number', unit: 'jam' }
    ]
  },
  {
    id: 'social', title: 'Sosial', icon: MessageSquare, color: 'text-sky-500', 
    theme: 'from-sky-500 to-blue-500', statLabel: 'Interaksi Sosial', bgGlow: 'bg-blue-500/20',
    fields: [
      { id: 'tiktok', label: 'TikTok (Jam/Hari)', type: 'number', unit: 'jam' },
      { id: 'instagram', label: 'Instagram (Jam/Hari)', type: 'number', unit: 'jam' }
    ]
  },
  {
    id: 'work', title: 'Kerja & Cloud', icon: Briefcase, color: 'text-emerald-600', 
    theme: 'from-emerald-600 to-emerald-500', statLabel: 'Aktivitas Produktif', bgGlow: 'bg-emerald-500/20',
    fields: [
      { id: 'zoom', label: 'Video Call (Jam/Hari)', type: 'number', unit: 'jam' },
      { id: 'emails', label: 'Kirim Email (Email/Hari)', type: 'number', unit: 'email' },
      { id: 'cloud', label: 'Penyimpanan Cloud (GB)', type: 'number', unit: 'GB' },
      { id: 'ai', label: 'Prompt AI (Prompt/Hari)', type: 'number', unit: 'prompt' }
    ]
  }
];
