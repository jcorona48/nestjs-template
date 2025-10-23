import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import qs from 'qs';

@Injectable()
export class TransformQueryPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== 'query') return value;
    const queryString = qs.stringify(value);
    const parsed = qs.parse(queryString, {
      decoder: (str: string): string | number | boolean => {
        const num = Number(str);
        if (!isNaN(num) && str.trim() !== '') {
          return num;
        }
        const bool = str.toLowerCase();
        if (bool === 'true') return true;
        if (bool === 'false') return false;
        return decodeURIComponent(str);
      },
    }) as Record<string, string | number | boolean | Record<string, unknown>>;
    return parsed;
  }
}
