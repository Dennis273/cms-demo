import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260107_115650 from './20260107_115650';
import * as migration_20260107_125253 from './20260107_125253';
import * as migration_20260108_043032 from './20260108_043032';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260107_115650.up,
    down: migration_20260107_115650.down,
    name: '20260107_115650',
  },
  {
    up: migration_20260107_125253.up,
    down: migration_20260107_125253.down,
    name: '20260107_125253',
  },
  {
    up: migration_20260108_043032.up,
    down: migration_20260108_043032.down,
    name: '20260108_043032'
  },
];
