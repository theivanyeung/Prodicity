import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import GlobalLoading from "../components/global/pages/Loading";

const AuthRouting = ({ children }) => {
  const router = useRouter();
  const auth = getAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        router.push("/login");
      }
    });
  }, []);

  return <>{loading ? <GlobalLoading /> : children}</>;
};

export default AuthRouting;
