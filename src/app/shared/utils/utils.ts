import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { isNil, isObject, isEmpty, isString } from 'lodash';
import { from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export function deepMerge(source, obj) {
  const newObj = {};
  for (const key of Object.keys(source)) {
    if (obj instanceof Object && key in obj) {
      if (source[key] instanceof Object) {
        newObj[key] = deepMerge(source[key], obj[key]);
      } else {
        newObj[key] = isNil(obj[key]) ? source[key] : obj[key];
      }
    } else {
      newObj[key] = source[key];
    }
  }
  return newObj;
}

export function deepRemoveEmptyObjProperty<T>(object: T): T {
  const obj = { ...object };
  Object.keys(obj).forEach((key) => {
    const val = obj[key];
    if (isObject(val) && !isEmpty(val)) {
      obj[key] = deepRemoveEmptyObjProperty(val);
    }
    if (isNil(val) || (isString(val) && isEmpty(val))) {
      console.log(obj[key], isEmpty(val));

      delete obj[key];
    }
  });
  return obj;
}

export function getUrlToFileFromFirebaseStorage$(
  uploadTask: AngularFireUploadTask,
  path: string,
  storageFirebase: AngularFireStorage
): Observable<string> {
  return from(uploadTask).pipe(
    switchMap(() => storageFirebase.ref(path).getDownloadURL())
  );
}

export function getAllFailureActions(actions) {
  return Object.keys(actions).reduce((failureActions, action) => {
    if (action.toLowerCase().endsWith('failure')) {
      failureActions.push(actions[action]);
    }
    return failureActions;
  }, []);
}

export function getOptionsForSelect(
  request: Observable<{ id: string; name: string }[]>
): Observable<{ label: string; value: string }[]> {
  return request.pipe(
    map((data) => data.map(({ id, name }) => ({ label: name, value: id })))
  );
}
