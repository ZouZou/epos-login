import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    setItem(key: string, value: any): void {
        sessionStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key: string): any {
        try {
            const item = sessionStorage.getItem(key);
            if (item == null) return null;
            return JSON.parse(item || "{}");
        } catch (e) {
            return null;
        }
    }

    removeItem(key: string): any {
        sessionStorage.removeItem(key);
    }

    clear(): void {
        sessionStorage.clear();
    }
}