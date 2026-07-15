import { useEffect } from 'react';
import { useTheme } from '../theme/theme';
import { useWorldStore } from '../store/worldStore';

export function WorldThemeSync() {
  const { setThemeId } = useTheme();
  const worlds = useWorldStore((s) => s.worlds);
  const currentWorldId = useWorldStore((s) => s.currentWorldId);

  useEffect(() => {
    const world = worlds.find((w) => w.id === currentWorldId);
    if (world) setThemeId(world.themeId);
  }, [currentWorldId, worlds, setThemeId]);

  return null;
}