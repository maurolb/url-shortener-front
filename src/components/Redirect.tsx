import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "./Layout";
import { Spinner } from "flowbite-react";

import tom from "../assets/tom.png";
import { getByShortId } from "../firebase/api";

export const Redirect = () => {
  const [destination, setDestination] = useState<null | string>(null);
  const [error, setError] = useState<string>("");
  const location = useLocation();
  const array: string[] = location.pathname.split("/");
  const shortId: string = array[array.length - 1];

  useEffect(() => {
    handleRedirect();
  }, [shortId]);

  useEffect(() => {
    if (destination) {
      window.location.replace(destination);
    }
  }, [destination]);

  const handleRedirect = async () => {
    const docs = await getByShortId(shortId);
    if (docs!.size == 0 || docs == undefined) return setError("Error");

    docs!.forEach((doc: any) => {
      const link = doc.data();
      setDestination(link.destination);
    });
  };

  return (
    <Layout>
      <>
        {!error && (
          <div className="text-center text-white/80 text-4xl lg:text-6xl">
            <Spinner size={"xl"} color={"success"} light={false} />
            <h1>Redirecting...</h1>
          </div>
        )}
        {error && (
          <>
            <h1 className="text-center text-white/80 text-4xl lg:text-6xl">
              Error 404, No se pudo encontrar la página
            </h1>
            <img src={tom} alt="tom" className="ml-auto mr-auto mt-8" />
          </>
        )}
      </>
    </Layout>
  );
};
