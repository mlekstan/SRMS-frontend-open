import { router } from "@/main";


type Router = typeof router;

export class AuthService {
  private listeners: Set<() => void>;
  private state: { accessToken: string | null; isAuthenticated: boolean };
  private router: Router | undefined;

  constructor() {
    this.state = {
      accessToken: null,
      isAuthenticated: false,
    }
    this.listeners = new Set();
  }

  getState() {
    return this.state;
  }

  registerRouter(router: Router) {
    this.router = router;
  }

  signIn(accessToken: string) {
    this.state = {
      accessToken: accessToken,
      isAuthenticated: true,
    }
    this.notify();
  }

  signOut() {
    this.state = {
      accessToken: null,
      isAuthenticated: false,
    }
    this.notify();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    }
  }

  notify() {
    this.listeners.forEach((listener) => listener());
    router.invalidate();
  }

}