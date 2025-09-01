import UserEntity from './user.entity';

describe('UserEntity', () => {
  it('should create a valid user', () => {
    const user = UserEntity.create({
      id: 1,
      email: 'valid@email.com',
      name: 'Valid User',
      password: 'StrongPassword123',
    });
    expect(user.toObject()).toEqual({
      id: 1,
      email: 'valid@email.com',
      name: 'Valid User',
      password: 'StrongPassword123',
    });
  });

  it('should throw an exception for invalid email', () => {
    expect(() =>
      UserEntity.create({
        id: 2,
        email: 'invalid-email',
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
        name: 'User',
        password: '123',
      }),
    ).toThrow('Invalid password');
  });
});
