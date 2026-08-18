import type { Dictionary } from "@/app/[locale]/dictionaries";

export interface StackPoiData {
  name: string;
  description: string;
  level: string;
}

export interface StackLevel {
  id: string;
  label: string;
  items: StackPoiData[];
}

export function buildStackLevels(dict: Dictionary["stack"]): StackLevel[] {
  const byName = new Map(dict.items.map((item) => [item.name, item]));

  return dict.map.levels.map((level) => ({
    id: level.id,
    label: level.label,
    items: level.items
      .map((name) => byName.get(name))
      .filter((item): item is Dictionary["stack"]["items"][number] => Boolean(item))
      .map((item) => ({ name: item.name, description: item.description, level: item.level })),
  }));
}
