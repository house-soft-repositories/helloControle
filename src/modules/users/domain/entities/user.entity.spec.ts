import UserRole from '@/core/types/user_role';
import UserEntity from './user.entity';

describe('UserEntity', () => {
  it('should create a valid user', () => {
    const user = UserEntity.create({
      id: 1,
      email: 'valid@email.com',
      role: UserRole.USER,
      name: 'Valid User',
      password: 'StrongPassword123',
    });

    expect(user.toObject()).toMatchObject({
      id: 1,
      email: 'valid@email.com',
      role: UserRole.USER,
      name: 'Valid User',
      password: 'StrongPassword123',
    });

    // Verificar que as datas foram criadas
    expect(user.toObject().createdAt).toBeInstanceOf(Date);
    expect(user.toObject().updatedAt).toBeInstanceOf(Date);
  });

  it('should set createdAt and updatedAt automatically when not provided', () => {
    const beforeCreation = new Date();

    const user = UserEntity.create({
      id: 1,
      email: 'test@email.com',
      role: UserRole.USER,
      name: 'Test User',
      password: 'StrongPassword123',
    });

    const afterCreation = new Date();
    const userObject = user.toObject();

    expect(userObject.createdAt).toBeInstanceOf(Date);
    expect(userObject.updatedAt).toBeInstanceOf(Date);
    expect(userObject.createdAt!.getTime()).toBeGreaterThanOrEqual(
      beforeCreation.getTime(),
    );
    expect(userObject.createdAt!.getTime()).toBeLessThanOrEqual(
      afterCreation.getTime(),
    );
    expect(userObject.updatedAt!.getTime()).toBeGreaterThanOrEqual(
      beforeCreation.getTime(),
    );
    expect(userObject.updatedAt!.getTime()).toBeLessThanOrEqual(
      afterCreation.getTime(),
    );
  });

  it('should use provided createdAt and updatedAt when given', () => {
    const customCreatedAt = new Date('2023-01-01');
    const customUpdatedAt = new Date('2023-06-01');

    const user = UserEntity.create({
      id: 1,
      email: 'test@email.com',
      role: UserRole.USER,
      name: 'Test User',
      password: 'StrongPassword123',
      createdAt: customCreatedAt,
      updatedAt: customUpdatedAt,
    });

    const userObject = user.toObject();
    expect(userObject.createdAt).toBe(customCreatedAt);
    expect(userObject.updatedAt).toBe(customUpdatedAt);
  });

  it('should throw an exception for invalid email', () => {
    expect(() =>
      UserEntity.create({
        id: 2,
        email: 'invalid-email',
        role: UserRole.USER,
        name: 'User',
        password: 'StrongPassword123',
      }),
    ).toThrow('Invalid email');
  });

  it('should throw an exception for invalid name', () => {
    expect(() =>
      UserEntity.create({
        id: 3,
        email: 'valid@email.com',
        role: UserRole.USER,
        name: '',
        password: 'StrongPassword123',
      }),
    ).toThrow('Invalid name');
  });

  it('should throw an exception for invalid password', () => {
    expect(() =>
      UserEntity.create({
        id: 4,
        email: 'valid@email.com',
        role: UserRole.USER,
        name: 'User',
        password: '123',
      }),
    ).toThrow('Invalid password');
  });
});
