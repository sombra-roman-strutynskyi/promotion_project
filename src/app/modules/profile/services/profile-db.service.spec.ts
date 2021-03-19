import { TestBed, inject } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { AuthFacade } from '@auth';
import { environment } from '@env';
import {
  AuthCredential,
  AuthProvider,
  getUrlToFileFromFirebaseStorage$,
  UserCredential,
  UserFirebase,
} from '@shared';
import {
  AuthFacadeMock,
  MOCK_CREDENTIALS,
  MOCK_FIREBASE_USER,
  MOCK_FIREBASE_USER_CREDENTIALS,
  MOCK_REGISTER_USER,
  MOCK_USER,
} from '@testing';
import { MOCK_UPDATED_PROFILE } from '@testing';
import { from, of } from 'rxjs';
import { ProfileDbService } from './profile-db.service';
const providers = [
  ProfileDbService,
  {
    provide: AuthFacade,
    useClass: AuthFacadeMock,
  },
  {
    provide: AngularFireAuth,
    useValue: {
      user: of({
        email: 'test@email.com',
        reauthenticateWithCredential: jest.fn(() => of(null)),
        updatePassword: jest.fn(() => from(Promise.resolve())),
      }),
    },
  },
  {
    provide: AngularFireDatabase,
    useValue: {
      object: jest.fn(() => ({
        update: jest.fn(() => Promise.resolve()),
      })),
    },
  },
  {
    provide: AngularFireStorage,
    useValue: {
      upload: jest.fn(() =>
        Promise.resolve()
      ) as Partial<AngularFireUploadTask>,
      ref: jest.fn(() => ({ getDownloadURL: jest.fn(() => of(null)) })),
    },
  },
  {
    provide: MatDialog,
    useValue: {},
  },
];
describe('Service: ProfileDb', () => {
  let service: ProfileDbService;
  let authFirebase: AngularFireAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers,
    });
    service = TestBed.inject(ProfileDbService);
    authFirebase = TestBed.inject(AngularFireAuth);
  });

  it('should be created', inject([ProfileDbService], () => {
    expect(service).toBeTruthy();
  }));

  it('should return `userCredential` when login with Facebook', (done) => {
    service.changePassword('oldPassword', 'newPassword').subscribe((data) => {
      expect(data).toEqual(undefined);
      done();
    });
  });
  it('should return `userCredential` when login with Google', (done) => {
    service.updateProfile(MOCK_UPDATED_PROFILE).subscribe((data) => {
      expect(data).toEqual(undefined);
      done();
    });
  });
});
