import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { isString } from 'lodash';
@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(content: string) {
    return isString(content)
      ? this.sanitizer.bypassSecurityTrustHtml(content)
      : content;
  }
}
