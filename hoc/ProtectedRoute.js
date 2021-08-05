import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const ProtectedRoute = ({ children, role = [], withAuth = false }) => {
  const [session, loading] = useSession();
  const router = useRouter();

  // if (!withAuth) {
  //   return <>{children}</>;
  // }

  if (loading) {
    return null;
  }
  if (!session) {
    router.push(`/login?referer=${encodeURIComponent(router.pathname)}`);
    return null;
  }

  if (role?.length != 0 && !roles.includes(session.user.role)) {
    router.push(`/`);
    return null;
  }
  // return <AuthComponent {...props} />;
  return { children };
};

export default ProtectedRoute;
