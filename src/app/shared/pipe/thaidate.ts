import { Pipe, PipeTransform } from '@angular/core';
const config = {
  dateFormat: {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
  }
}
@Pipe({
  name: 'thaidate',
  pure: true
})
export class ThaidatePipe implements PipeTransform {

  transform(value: Date): unknown {
    let date = new Date(value).toLocaleDateString('th-TH', config.dateFormat)
    return date
  }

}
