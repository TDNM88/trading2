declare module 'react-router-dom' {
  import * as React from 'react';

  export interface RouteProps {
    path?: string;
    element?: React.ReactNode;
    children?: React.ReactNode;
  }

  export interface NavigateProps {
    to: string;
    replace?: boolean;
    state?: any;
  }

  export function Routes(props: { children: React.ReactNode }): JSX.Element;
  export function Route(props: RouteProps): JSX.Element;
  export function BrowserRouter(props: { children: React.ReactNode }): JSX.Element;
  export function useLocation(): { pathname: string; state?: any };
  export function NavLink(props: { to: string; className?: string | ((props: { isActive: boolean }) => string); children: React.ReactNode; end?: boolean }): JSX.Element;
  export function Outlet(): JSX.Element;
  export function Navigate(props: NavigateProps): JSX.Element;
  export function useParams<T extends Record<string, string | undefined>>(): T;
  export function useNavigate(): (to: string, options?: { replace?: boolean, state?: any }) => void;
}
