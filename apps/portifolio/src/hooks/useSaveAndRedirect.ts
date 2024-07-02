// hooks/useSaveAndRedirect.ts
import { useRouter } from "next/router";
import { useRoute } from "../contexts/RouteContext";

const useSaveAndRedirect = () => {
  const router = useRouter();
  const { savedRoute, setSavedRoute } = useRoute();

  const saveCurrentRoute = () => {
    setSavedRoute(router.asPath);
  };

  const redirectToSavedRoute = () => {
    if (savedRoute) {
      router.replace(savedRoute);
    } else {
      alert("No route saved!");
    }
  };

  return { saveCurrentRoute, redirectToSavedRoute, savedRoute };
};

export default useSaveAndRedirect;
