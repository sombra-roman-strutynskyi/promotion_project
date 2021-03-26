import { AngularFireStorage } from '@angular/fire/storage';
import { of } from 'rxjs';
import {
  deepMerge,
  deepRemoveEmptyObjProperty,
  getOptionsForSelect,
  getUrlToFileFromFirebaseStorage$,
} from './utils';

describe('Utils Function', () => {
  it('should merge two objects', () => {
    const object1 = {
      id: null,
      name: 'name',
      surname: undefined,
      data: {
        age: '1',
      },
    };
    const object2 = {
      id: '1',
      name: null,
      surname: 'surname',
      data: {
        age: '2',
      },
    };
    const object3 = {
      id: '1',
      name: 'name',
      surname: 'surname',
      data: {
        age: '2',
      },
    };

    expect(deepMerge(object1, object2)).toEqual(object3);
  });
  it('should empty property from object', () => {
    const object = {
      idInvalid: null,
      idValid: 1,
      nameInvalid: '',
      nameValid: 'name',
      surnameInvalid: undefined,
      surnameValid: 'text',
      booleanTrue: true,
      booleanFalse: false,
      other: ['1', 2],
      data: {
        age: '1',
      },
    };
    const result = {
      idValid: 1,
      nameValid: 'name',
      surnameValid: 'text',
      booleanTrue: true,
      booleanFalse: false,
      other: ['1', 2],
      data: {
        age: '1',
      },
    };

    expect(deepRemoveEmptyObjProperty(object)).toEqual(result);
  });

  it('should return options for select', (done) => {
    const request = of([
      {
        id: 'id',
        name: 'name',
      },
    ]);
    const result = [
      {
        value: 'id',
        label: 'name',
      },
    ];
    getOptionsForSelect(request).subscribe((options) => {
      expect(options).toEqual(result);
      done();
    });
  });
  it('should return url from firebase', (done) => {
    const uploadTask = Promise.resolve({}) as any;
    const storageFirebase: Partial<AngularFireStorage> = {
      ref: jest.fn(() => ({
        getDownloadURL: jest.fn(() => of('url')),
      })) as any,
    };
    getUrlToFileFromFirebaseStorage$(
      uploadTask,
      'path',
      storageFirebase as AngularFireStorage
    ).subscribe((url) => {
      expect(url).toEqual('url');
      done();
    });
  });
});
