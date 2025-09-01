export type Either<L, R> = Left<L, R> | Right<L, R>;

export class Left<L, R> {
  value: L;
  constructor(value: L) {
    this.value = value;
  }
  isRight(): this is Right<L, R> {
    return false;
  }
  isLeft(): this is Left<L, R> {
    return true;
  }

  getOrThrow(): never {
    throw this.value;
  }

  get isSuccess(): boolean {
    return false;
  }

  get isFailure(): boolean {
    return true;
  }

  get asSuccess(): null {
    return null;
  }

  get asFailure(): Left<L, R> {
    return this;
  }

  when<W>({
    onSuccess,
    onFailure,
  }: {
    onSuccess: (value: R) => W;
    onFailure: (exception: L) => W;
  }): W {
    return onFailure(this.value);
  }

  map<T>(fn: (value: R) => T): Either<L, T> {
    return new Left<L, T>(this.value);
  }

  onFailure(onFailure: (failure: L) => void): Either<L, R> {
    onFailure(this.value);
    return this;
  }

  onSuccess(onSuccess: (success: R) => void): Either<L, R> {
    return this;
  }
}

export class Right<L, R> {
  value: R;
  constructor(value: R) {
    this.value = value;
  }
  isRight(): this is Right<L, R> {
    return true;
  }
  isLeft(): this is Left<L, R> {
    return false;
  }

  getOrThrow(): R {
    return this.value;
  }

  when<W>({
    onSuccess,
    onFailure,
  }: {
    onSuccess: (value: R) => W;
    onFailure: (exception: L) => W;
  }): W {
    return onSuccess(this.value);
  }

  map<T>(fn: (value: R) => T): Either<L, T> {
    return new Right<L, T>(fn(this.value));
  }

  onFailure(onFailure: (failure: L) => void): Either<L, R> {
    return this;
  }

  onSuccess(onSuccess: (success: R) => void): Either<L, R> {
    onSuccess(this.value);
    return this;
  }
}

export const left = <L, R>(l: L): Either<L, R> => {
  return new Left(l);
};
export const right = <L, R>(r: R): Either<L, R> => {
  return new Right(r);
};
