interface AuthTokenProps {
  accessToken: string;
  refreshToken: string;
}
export default class AuthTokenEntity {
  constructor(private readonly props: AuthTokenProps) {}

  get accessToken() {
    return this.props.accessToken;
  }

  get refreshToken() {
    return this.props.refreshToken;
  }

  toObject() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }
}
