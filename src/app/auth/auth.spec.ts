import { AuthComponent } from "./auth.component";
import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

const UserState = {
  data: {} as any,
  error: null,
  success: true,
};

const formValue = {
  value: { email: "test@mail.com", password: "1234" },
};

describe("AuthComponent", () => {
  let component: AuthComponent;
  let router: jest.Mocked<Router>;
  let authService: jest.Mocked<AuthService>;

  beforeEach(() => {
    router = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    authService = {
      createUser: jest.fn(),
      loginUser: jest.fn(),
      resetPassword: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    const fixture = TestBed.overrideComponent(AuthComponent, {
      set: {
        providers: [
          { provide: AuthService, useValue: authService },
          { provide: Router, useValue: router },
        ],
        imports: [FormsModule, FontAwesomeModule],
        schemas: [NO_ERRORS_SCHEMA],
      },
    }).createComponent(AuthComponent);

    component = fixture.componentInstance;
    // Spy component methods
    jest.spyOn(component, "createUser");
    jest.spyOn(component, "loginUser");
    jest.spyOn(component.error, "set");
  });

  describe("handleSubmit", () => {
    it("should set error message on invalid form", () => {
      component.handleSubmit({
        invalid: true,
      } as NgForm);

      expect(component.createUser).not.toHaveBeenCalled();
      expect(component.loginUser).not.toHaveBeenCalled();
      expect(component.error()).toBe("Por favor, completa todos los campos.");
    });

    it("should execute createUser", () => {
      authService.createUser.mockReturnValue(of(UserState));

      component.isLogin.set(false);

      component.handleSubmit(formValue as NgForm);

      expect(component.createUser).toHaveBeenCalledWith(formValue);
      expect(component.createUser).toHaveBeenCalledTimes(1);
      expect(component.loginUser).not.toHaveBeenCalled();
      expect(component.error()).toBe("");
    });

    it("should execute loginUser", () => {
      authService.loginUser.mockReturnValue(of(UserState));

      component.isLogin.set(true);

      component.handleSubmit(formValue as NgForm);

      expect(component.loginUser).toHaveBeenCalledWith(formValue);
      expect(component.loginUser).toHaveBeenCalledTimes(1);
      expect(component.createUser).not.toHaveBeenCalled();
      expect(component.error()).toBe("");
    });
  });

  describe("createUser", () => {
    it("should navigate to dashboard on successful register", () => {
      authService.createUser.mockReturnValue(of({ success: true }));

      component.createUser(formValue as NgForm);

      expect(authService.createUser).toHaveBeenCalledWith(
        formValue.value.email,
        formValue.value.password
      );
      expect(router.navigate).toHaveBeenCalledWith(["/dashboard"]);
    });

    it("should set error message on failed login (API error)", () => {
      authService.createUser.mockReturnValue(
        of({
          success: false,
          error: "Ha habido un problema. Por favor intenta otra vez.",
        })
      );

      component.createUser(formValue as NgForm);

      expect(authService.createUser).toHaveBeenCalledWith(
        formValue.value.email,
        formValue.value.password
      );
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.error.set).toHaveBeenCalledWith(
        "Ha habido un problema. Por favor intenta otra vez."
      );
    });
  });

  describe("loginUser", () => {
    it("should navigate to dashboard on successful login", () => {
      authService.loginUser.mockReturnValue(of({ success: true }));

      component.loginUser(formValue as NgForm);

      expect(authService.loginUser).toHaveBeenCalledWith(
        formValue.value.email,
        formValue.value.password
      );
      expect(router.navigate).toHaveBeenCalledWith(["/dashboard"]);
    });

    it("should set error message on failed login (API error)", () => {
      authService.loginUser.mockReturnValue(
        of({
          success: false,
          error: "Ha habido un problema. Por favor intenta otra vez.",
        })
      );

      component.loginUser(formValue as NgForm);

      expect(authService.loginUser).toHaveBeenCalledWith(
        formValue.value.email,
        formValue.value.password
      );
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.error.set).toHaveBeenCalledWith(
        "Ha habido un problema. Por favor intenta otra vez."
      );
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
      authService.resetPassword.mockReturnValue(of());

      component.recoverPassword({
        value: { email: formValue.value.email },
      } as any);

      expect(authService.resetPassword).toHaveBeenCalledWith(
        formValue.value.email
      );
      expect(component.isRecoveryPass()).toBe(false);
    });
  });

  describe("toggleAuthMode", () => {
    it("should toggle login value", () => {
      component.isLogin.set(true);
      expect(component.isLogin()).toBe(true);

      component.toggleAuthMode();
      expect(component.isLogin()).toBe(false);

      component.toggleAuthMode();
      expect(component.isLogin()).toBe(true);
    });
  });
});
