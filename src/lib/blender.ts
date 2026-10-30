/**
 * Blender releases that EM lines have used as reference, with the date their
 * support ended (or will end). A line that never declared its own end of
 * support is drawn up to the end of support of its reference Blender.
 *
 * Sources: blender.org/download/lts and endoflife.date/blender. 2.79 had no
 * LTS: its life ends with the release of 2.80 (30 Jul 2019). `expected`
 * marks a release that is not out yet: dates follow the yearly LTS cadence
 * (one LTS each July, two years of fixes).
 */
export interface BlenderRef { label: string; released: string; eol: string; expected?: boolean }
export const BLENDER: Record<string, BlenderRef> = {
  '2.79': { label: 'Blender 2.79', released: '2017-09-11', eol: '2019-07-30' },
  '2.83': { label: 'Blender 2.83 LTS', released: '2020-06-03', eol: '2022-06-01' },
  '2.93': { label: 'Blender 2.93 LTS', released: '2021-06-02', eol: '2023-06-02' },
  '3.3': { label: 'Blender 3.3 LTS', released: '2022-09-07', eol: '2024-09-07' },
  '3.6': { label: 'Blender 3.6 LTS', released: '2023-06-27', eol: '2025-06-27' },
  '4.2': { label: 'Blender 4.2 LTS', released: '2024-07-16', eol: '2026-07-16' },
  '4.5': { label: 'Blender 4.5 LTS', released: '2025-07-14', eol: '2027-07-14' },
  '5.2': { label: 'Blender 5.2 LTS', released: '2026-07-14', eol: '2028-07-14' },
  'next-lts': { label: 'next Blender LTS', released: '2027-07-15', eol: '2029-07-15', expected: true },
};
export const blenderRef = (k?: string) => (k ? BLENDER[k] : undefined);
