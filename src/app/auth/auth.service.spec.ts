import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { UserService } from "../services/user.service";

import { Auth } from "@angular/fire/auth";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "@angular/fire/auth";
import { of } from "rxjs";

jest.mock("@angular/fire/auth", () => ({
  Auth: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

describe("AuthService", () => {
  let service: AuthService;
  let userService: UserService;
  let authFirebase: Auth;

  const credentials = {
    email: "test@example.com",
    password: "Test@123",
  };

  const mockUserCredentialResponse = {
    user: { uid: "123", email: "test@example.com" },
  } as any;

  beforeEach(() => {
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(
      {} as UserCredential
    );
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
      {} as UserCredential
    );
    (signOut as jest.Mock).mockResolvedValue(undefined);
    (sendPasswordResetEmail as jest.Mock).mockResolvedValue(undefined);

    userService = {
      saveUser: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: {} },
        { provide: UserService, useValue: userService },
      ],
    });

    authFirebase = TestBed.inject(Auth) as jest.Mocked<Auth>;
    service = TestBed.inject(AuthService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("createUser", () => {
    it("should create a user and update state", (done) => {
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockUserCredentialResponse
      );

      service.createUser(credentials.email, credentials.password);

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        authFirebase,
        credentials.email,
        credentials.password
      );
      done();
    });

    it("should login the user and update state", (done) => {
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(
        mockUserCredentialResponse
      );

      service.loginUser(credentials.email, credentials.password);

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        authFirebase,
        credentials.email,
        credentials.password
      );
      done();
    });

    it("should logout the user and update state", (done) => {
      (signOut as jest.Mock).mockResolvedValue(of());

      service.logOutUser();

      expect(signOut).toHaveBeenCalledWith(authFirebase);
      done();
    });

    it("should send a password reset email", (done) => {
      service.resetPassword(credentials.email);

      expect(sendPasswordResetEmail).toHaveBeenCalledWith(authFirebase, credentials.email);
      done();
    });
  });
});
