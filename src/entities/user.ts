import Joi from "@hapi/joi";

// the array of users to store in memory
export let users: User[] = [];

// email: string, required
// The system must only allow 1 user per unique email address
// password: string, required to create a new user
// phone number: string, optional
// When provided, the phone number must follow this pattern ###-###-####

export interface IUser {
  email: string;
  password: string;
  phone_number?: string;
}

export interface IValidationResult {
  error: string | undefined;
  params: IUser | undefined;
}

export class User implements IUser {
  public static validateParams(body: any): IValidationResult {
    const schema = Joi.object().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
      phone_number: Joi.string().regex(/^\d{3}-\d{3}-\d{4}$/)
    });

    const obj: IUser = {
      email: body.email,
      password: body.password,
      phone_number: body.phone_number
    };

    // Have Joi validate for me
    const result = Joi.validate(obj, schema);

    const validationResult: IValidationResult = {
      error: undefined,
      params: undefined
    };

    if (result.error === null) {
      validationResult.params = result.value;
    } else {
      let error = result.error.details[0];

      // send a custom message when error is due to phone_number
      validationResult.error =
        error.context && error.context.key === "phone_number"
          ? "phone_number must be in the ###-###-#### format"
          : error.message;
    }

    return validationResult;
  }

  public email: string;
  public password: string;
  public phone_number: string | undefined;

  constructor(obj: IUser) {
    this.email = obj.email;
    this.password = obj.password;
    this.phone_number = obj.phone_number;
  }

  public getProperties(): IUser {
    let result: IUser = {
      email: this.email,
      password: this.password
    };

    // add the phone_number to the return object only if it is a string
    if (typeof this.phone_number === "string") {
      result.phone_number = this.phone_number;
    }

    return result;
  }

  // used for api/users/:user. Don't send password back
  public getPublicProperties(): any {
    let result: any = this.getProperties();

    delete result.password;

    return result;
  }
}

export function addUser(newUser: User): void {
  users.push(newUser);
}

export function userExists(email: string): boolean {
  // convert to lowercase for comparison
  email = email.trim().toLowerCase();

  return users.find(u => u.email.toLowerCase() === email) !== undefined;
}

// only called after verifying that userExists
export function getUser(email: string): User {
  // convert to lowercase for comparison
  email = email.trim().toLowerCase();

  const aUser: any = users.find(d => d.email.toLowerCase() === email);

  return aUser as User;
}
