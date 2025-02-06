import { AuthComponent } from "./auth.component";
import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { of } from "rxjs";
import { Router } from "@angular/router";

jest.mock("./auth.service");

describe("AuthComponent", () => {
  let component: AuthComponent;
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthComponent,
        { provide: AuthService, useValue: new AuthService() },
        { provide: Router, useValue: { navigate: jest.fn() } },
      ],
    });

    component = TestBed.inject(AuthComponent);
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it("should set error message on invalid form", () => {
    authService.loginUser = jest.fn();

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

    expect(authService.loginUser).toHaveBeenCalledWith("test@mail.com", "1234");
    expect(router.navigate).toHaveBeenCalledWith(["/dashboard"]);
  });

  it("should set error message on failed login (missing password)", () => {
    authService.loginUser = jest.fn().mockReturnValue(
      of({
        success: false,
        error: "El correo o la contraseña son incorrectos.",
      })
    );

    component.loginUser({
      value: { email: "test@mail.com", password: "" },
    } as any);

    expect(authService.loginUser).toHaveBeenCalledWith("test@mail.com", "");
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.error()).toBe(
      "El correo o la contraseña son incorrectos."
    );
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

    expect(authService.loginUser).toHaveBeenCalledWith("test@mail.com", "1234");
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
