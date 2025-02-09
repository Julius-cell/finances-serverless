import { AuthComponent } from "./auth.component";
import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/core";

jest.mock("./auth.service");

describe("AuthComponent", () => {
  let component: AuthComponent;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    authService = {
      userState: {
        value: { success: false, data: null, error: null },
        set: jest.fn(),
      },
      createUser: jest.fn(),
      loginUser: jest.fn(),
      logOutUser: jest.fn(),
      resetPassword: jest.fn(),
      getErrorMessageRegister: jest.fn(),
      getErrorMessageLogin: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    router = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    const fixture = TestBed.overrideComponent(AuthComponent, {
      set: {
        providers: [
          { provide: AuthService, useValue: authService },
          { provide: Router, useValue: router },
        ],
        imports: [],
        schemas: [NO_ERRORS_SCHEMA],
      },
    }).createComponent(AuthComponent);

    component = fixture.componentInstance;
  });

  describe("createUser", () => {
    it("should set error message on invalid form", () => {
      component.createUser({
        invalid: true,
      } as any);

      expect(authService.createUser).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.error()).toBe("Por favor, completa todos los campos.");
    });

    it("should navigate to dashboard on successful register", () => {
      authService.createUser = jest.fn().mockReturnValue(of({ success: true }));

      component.createUser({
        value: { email: "test@mail.com", password: "1234" },
      } as any);

      expect(authService.createUser).toHaveBeenCalledWith(
        "test@mail.com",
        "1234"
      );
      expect(router.navigate).toHaveBeenCalledWith(["/dashboard"]);
    });

    it("should set error message on failed login (API error)", () => {
      authService.createUser = jest.fn().mockReturnValue(
        of({
          success: false,
          error: "Ha habido un problema. Por favor intenta otra vez.",
        })
      );

      component.createUser({
        value: { email: "test@mail.com", password: "1234" },
      } as any);

      expect(authService.createUser).toHaveBeenCalledWith(
        "test@mail.com",
        "1234"
      );
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe("loginUser", () => {
    it("should set error message on invalid form", () => {
      component.loginUser({
        invalid: true,
      } as any);

      expect(authService.loginUser).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.error()).toBe("Por favor, completa todos los campos.");
    });

    it("should navigate to dashboard on successful login", () => {
      authService.loginUser = jest.fn().mockReturnValue(of({ success: true }));

      component.loginUser({
        value: { email: "test@mail.com", password: "1234" },
      } as any);

      expect(authService.loginUser).toHaveBeenCalledWith(
        "test@mail.com",
        "1234"
      );
      expect(router.navigate).toHaveBeenCalledWith(["/dashboard"]);
    });

    it("should set error message on failed login (API error)", () => {
      authService.loginUser = jest.fn().mockReturnValue(
        of({
          success: false,
          error: "Ha habido un problema. Por favor intenta otra vez",
        })
      );

      component.loginUser({
        value: { email: "test@mail.com", password: "1234" },
      } as any);

      expect(authService.loginUser).toHaveBeenCalledWith(
        "test@mail.com",
        "1234"
      );
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe("recoverPassword", () => {
    it("should set error message on invalid form", () => {
      component.recoverPassword({
        invalid: true,
      } as any);

      expect(authService.resetPassword).not.toHaveBeenCalled();
      expect(component.error()).toBe("Por favor, completa todos los campos.");
    });

    it("should call resetPassword service", () => {
      authService.resetPassword = jest.fn().mockReturnValue(of());

      component.recoverPassword({
        value: { email: "test@mail.com" },
      } as any);

      expect(authService.resetPassword).toHaveBeenCalledWith("test@mail.com");
      expect(component.isRecoveryPass()).toBe(false);
    });
  });

  describe("navigateTo", () => {
    beforeEach(() => {
      expect(component.error()).toBe("");
    });

    it("should switch to login view", () => {
      component.navigateTo("login");
      expect(component.isSignUp()).toBe(false);
      expect(component.isRecoveryPass()).toBe(false);
    });

    it("should switch to sign-up view", () => {
      component.navigateTo("sign-up");
      expect(component.isSignUp()).toBe(true);
    });

    it("should switch to forgot-password view", () => {
      component.navigateTo("forgot-password");
      expect(component.isRecoveryPass()).toBe(true);
    });
  });
});
