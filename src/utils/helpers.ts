import { v4 as uuidv4 } from "uuid";

export function generateRandomUUID(): string {
  return uuidv4();
}

export function mapToArray<K, V>(map: Map<K, V>): V[] {
  return Array.from(map, ([, value]) => value);
}

export function arrayToMap<K, V>(array: V[], key: keyof V): Map<K, V> {
  return array.reduce(
    (map, item) => map.set(item[key] as K, item),
    new Map<K, V>()
  );
}
