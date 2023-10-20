import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isbnFormatter'
})
export class IsbnFormatterPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.slice(0, 3)+'-'+value.slice(3,4)+'-'+value.slice(4,8)+'-'+value.slice(8,12)+'-'+value.slice(12,13);
  }

}
