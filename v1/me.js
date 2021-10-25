import withAuth from "hoc/withAuth";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const me = () => {
  const [session, loading] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/employee/" + session.user.id);
    }
  }, [session]);
  return (
    <div>
      <p>Profile Page</p>
    </div>
  );
};

export default me;
