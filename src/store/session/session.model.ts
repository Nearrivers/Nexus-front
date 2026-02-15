export type SessionUser = {
  id: string;
  pseudonym: string;
};

export type SessionModel = {
  accessToken: string;
  user: SessionUser | null;
};
