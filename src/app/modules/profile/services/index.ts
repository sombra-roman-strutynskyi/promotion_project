import { ProfileDbService } from './profile-db.service';
import { ProfileFormConfigService } from './profile-form-config.service';
import { ProfileFacade } from './profile.facade';

export const SERVICES = [
  ProfileDbService,
  ProfileFacade,
  ProfileFormConfigService,
];

export * from './profile-db.service';
export * from './profile-form-config.service';
export * from './profile.facade';
