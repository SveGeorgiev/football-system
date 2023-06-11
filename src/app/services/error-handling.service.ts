import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ErrorHandlingService {
  private errorMessage: string = '';

  constructor() { }

  setErrorMessage(message: string): void {
    this.errorMessage = message;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}
