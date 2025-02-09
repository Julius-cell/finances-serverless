import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { Auth } from "@angular/fire/auth";
import { UserService } from "../services/user.service";

describe("AuthService", () => {
  let service: AuthService;
  let authFirebase: Auth;
  let userService: UserService;

  beforeEach(() => {
    authFirebase = {
      createUserWithEmailAndPassword: jest.fn(),
      sendPasswordResetEmail: jest.fn(),
      signInWithEmailAndPassword: jest.fn(),
      signOut: jest.fn(),
    } as any;

    userService = {
      saveUser: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: authFirebase },
        { provide: UserService, useValue: userService },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
