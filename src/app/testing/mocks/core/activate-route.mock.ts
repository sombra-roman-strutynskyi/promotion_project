// tslint:disable:ban-types
import { of, Observable, BehaviorSubject } from 'rxjs';
interface MockRouteConfig {
  params?: any;
  parent?: Partial<MockRouteConfig>;
  queryParams?: any;
  url?: Observable<{ path: string }[]>;
  snapshot?: {
    params?: any;
    queryParams?: any;
    data?: any;
    paramMap?: any;
  };
  firstChild?: {
    outlet?: string;
    data?: {
      [key: string]: any;
    };
  };
}

export function activateRouteMockFactory(config: MockRouteConfig) {
  return () => ({
    parent: {
      params: of(config.parent?.params || null),
      snapshot: config.parent?.snapshot || null,
      url: config?.parent?.url || of([]),
    },
    params: of(config.params || null),
    queryParams: of(config.queryParams || null),
    snapshot: config.snapshot,
    firstChild: {
      outlet: config.firstChild?.outlet || null,
      data: new BehaviorSubject(config.firstChild?.data || null),
    },
  });
}
