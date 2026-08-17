export class LateCheckInValidationError extends Error {
  constructor() {
    super('The check-in can only be validatedunitl 20 minutos of its creation.')
  }
}