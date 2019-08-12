import Joi from "@hapi/joi";

// the array of events to store in memory
export let events: Event[] = [];

export interface IEvent {
  created: string;
  type: string;
  user: string;
}

export interface IValidationResult {
  error: string | undefined;
  params: IEvent | undefined;
}

export class Event implements IEvent {
  public static validateParams(body: any): IValidationResult {
    const schema = Joi.object().keys({
      created: Joi.string().isoDate(),
      type: Joi.string().required(),
      user: Joi.string().required()
    });

    const obj: IEvent = {
      created:
        typeof body.created === "undefined"
          ? new Date().toISOString()
          : body.created,
      type: body.type,
      user: body.user
    };

    // Have Joi validate for me
    const result = Joi.validate(obj, schema);

    const validationResult: IValidationResult = {
      error: undefined,
      params: undefined
    };

    if (result.error === null) {
      // no errors, so result.value holds the validated params
      validationResult.params = result.value;
    } else {
      // an error occurred
      validationResult.error = result.error.details[0].message;
    }

    return validationResult;
  }

  public created: string;
  public type: string;
  public user: string;

  constructor(obj: IEvent) {
    this.created = obj.created;
    this.type = obj.type;
    this.user = obj.user;
  }

  public getProperties(): IEvent {
    const result: IEvent = {
      created: this.created,
      type: this.type,
      user: this.user
    };

    return result;
  }
}

export function addEvent(newEvent: Event): void {
  // for now just pushing to the in memeory array
  // this will likely be a database method in the future
  events.push(newEvent);
}

// return all events
export function getAll(): IEvent[] {
  return events.map(e => e.getProperties());
}

// return all events for a single user
export function getByUser(user: string): IEvent[] {
  user = user.trim().toLowerCase();

  return events.filter(e => e.user.toLowerCase() === user);
}

// return all events for the last day
export function getWithinDay(): IEvent[] {
  const dayInMilliSex: number = 24 * 3600 * 1000;
  const nowTimeStamp: number = new Date().getTime();

  return events.filter(e => {
    const eTimeStamp: number = new Date(e.created).getTime();
    return nowTimeStamp - eTimeStamp < dayInMilliSex ? e : null;
  });
}
