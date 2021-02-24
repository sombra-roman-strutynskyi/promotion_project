import { TestBed } from '@angular/core/testing';

import { CreateEditArticleFormConfigService } from './create-edit-article-form-config.service';

describe('CreateEditArticleFormConfigService', () => {
  let service: CreateEditArticleFormConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateEditArticleFormConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
