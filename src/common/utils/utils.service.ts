import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  filterByQuery<T>(items: T[], query?: Partial<Record<keyof T, unknown>>): T[] {
    if (!query) return items;
    return items.filter((item) => {
      return Object.entries(query).every(([key, value]) => {
        if (Array.isArray(value)) {
          return value.includes(item[key as keyof T]);
        }
        if (typeof value === 'object' && value !== null) {
          const range = value as { min?: number; max?: number };
          const itemValue = item[key as keyof T];
          if (typeof itemValue === 'number') {
            if (range.min !== undefined && itemValue < range.min) {
              return false;
            }
            if (range.max !== undefined && itemValue > range.max) {
              return false;
            }
            return true;
          }
        }
        if (
          typeof value === 'string' &&
          typeof item[key as keyof T] === 'string'
        ) {
          return (item[key as keyof T] as unknown as string)
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        return item[key as keyof T] == value;
      });
    });
  }
}
