import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "./Layout";
import { Spinner } from "flowbite-react";
import { envs } from "../Config";
import tom from "../assets/tom.png";

export const Redirect = () => {
  const [destination, setDestination] = useState<null | string>(null);
  const [error, setError] = useState<string>("");
  const location = useLocation();
  const shortId: string = location.pathname.split("/")[1];

  useEffect(() => {
    handleRedirect();
  }, [shortId]);

  useEffect(() => {
    if (destination) {
      window.location.replace(destination);
    }
  }, [destination]);

  const handleRedirect = async () => {
    return axios
      .get(`${envs.API_URL}/api/url/${shortId}`)
      .then((resp) => setDestination(resp.data.destination))
      .catch((error) => {
        setError(error.message);
        console.log(error.message);
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
