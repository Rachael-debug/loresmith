import { IconSword } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';


export function ShellNav() {
  const navigate = useNavigate();
  return (
    <div className="flex h-13 shrink-0 items-center border-b border-white/[0.07] px-7" style={{ background: '#0d0d0d' }}>
        <div onClick={() => navigate('/')} className="flex items-center gap-2.5 cursor-pointer">
          <div className="flex h-6.5 w-6.5 items-center justify-center border border-white/10 text-white/50">
            <IconSword size={13} />
          </div>
          <span className="font-shell-display text-sm tracking-[0.12em] text-white/70">Loresmith</span>
        </div>
      </div>
  );
}