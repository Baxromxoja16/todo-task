import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}

  setToStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getToStorage(key: string) {
    return localStorage.getItem(key)
  }
}
