import { TestBed } from '@angular/core/testing';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { SafeHtmlPipe } from './safe-html.pipe';

describe('SafeHtmlPipe', () => {
  let domSanitizer: DomSanitizer;
  let pipe: SafeHtmlPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule],
    });
    domSanitizer = TestBed.inject(DomSanitizer);
    pipe = new SafeHtmlPipe(domSanitizer);
  });

  it('should test html', () => {
    const html = '<p>Text</p>';

    const result = pipe.transform(html);

    const expected = domSanitizer.bypassSecurityTrustHtml('<p>Text</p>');
    expect(result).toEqual(expected);
  });

  it('should test', () => {
    const html = null;

    const result = pipe.transform(html);

    const expected = domSanitizer.bypassSecurityTrustHtml('<p>Text</p>');
    expect(result).toEqual(null);
  });
});
