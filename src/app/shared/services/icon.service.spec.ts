import { TestBed } from '@angular/core/testing';
import { IconService } from './icon.service';

describe('IconService', () => {
  let service: IconService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IconService],
    });
    service = TestBed.inject(IconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should add icons when call `load`', () => {
    const spy = jest.spyOn(IconService.prototype as any, 'addIcons');

    service.load();
    expect(spy).toHaveBeenCalled();
  });
});
