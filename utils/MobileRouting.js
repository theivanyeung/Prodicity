import { useEffect } from "react";
import { useRouter } from "next/router";

const MobileRouting = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (window.innerWidth < 750) {
      router.push("/404mobile");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 750) {
        router.push("/404mobile");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{children}</>;
};

export default MobileRouting;
