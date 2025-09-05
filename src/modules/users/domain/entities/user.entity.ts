import UserRole from '@/core/types/user_role';
import EmailValidator from '@/core/validators/email.validator';
import NameValidator from '@/core/validators/name.validator';
import PasswordValidator from '@/core/validators/password.validator';
import UserDomainException from '@/modules/users/exceptions/user_domain_exception';

interface UserEntityProps {
  id?: number;
  email: string;
  name: string;
  password: string;
  currentCityId?: number | null;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class UserEntity {
  private constructor(private readonly props: UserEntityProps) {
    this.props = {
      id: props.id,
      email: props.email,
      name: props.name,
      password: props.password,
      currentCityId: props.currentCityId ?? null,
      role: props.role,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  private static validade(props: Partial<UserEntityProps>) {
    if (props.email !== undefined && !EmailValidator.validate(props.email)) {
      throw new UserDomainException('Invalid email');
    }
    if (props.name !== undefined && !NameValidator.validate(props.name)) {
      throw new UserDomainException('Invalid name');
    }
    if (
      props.password !== undefined &&
      !PasswordValidator.validate(props.password)
    ) {
      throw new UserDomainException('Invalid password');
    }
    if (!props.role) {
      throw new UserDomainException('Role is required');
    }
  }

  static create(props: UserEntityProps) {
    this.validade(props);
    return new UserEntity(props);
  }

  static fromData(props: UserEntityProps) {
    return new UserEntity(props);
  }

  changePassword(newPasswordHash: string) {
    this.props.password = newPasswordHash;
  }

  get id() {
    if (!this.props.id) {
      throw new UserDomainException('User Id has no generated');
    }
    return this.props.id!;
  }
  get email() {
    return this.props.email!;
  }

  get password() {
    return this.props.password;
  }
  get createdAt() {
    return this.props.createdAt!;
  }
  get updatedAt() {
    return this.props.updatedAt!;
  }
  get currentCityId() {
    return this.props.currentCityId!;
  }

  changeCurrentCity(cityId: number | null) {
    if (this.props.role === UserRole.ADMIN) {
      throw new UserDomainException('Admin user cannot change city');
    }
    if (this.props.currentCityId === cityId) {
      throw new UserDomainException('City is the same as current');
    }
    this.props.currentCityId = cityId;
  }

  toTouch() {
    this.props.updatedAt = new Date();
  }

  toObject() {
    return {
      id: this.props.id,
      email: this.props.email,
      name: this.props.name,
      role: this.props.role,
      currentCityId: this.props.currentCityId,
      password: this.props.password,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
