import axios from "axios";
import { useState } from "react";
import { ResultCard } from "./ResultCard";
import { Spinner } from "flowbite-react";
import { envs } from "../Config";

export const SearchBar = () => {
  const [destination, setDestination] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShortUrl("");
    if (destination.length <= 0) {
      return;
    }

    setLoader(true);

    const result = await axios
      .post(`${envs.API_URL}/api/url`, {
        destination,
      })
      .then((resp) => resp.data)
      .catch((error) =>
        console.log("Error trying to create short url: ", error)
      );

    setLoader(false);
    setShortUrl(result.shortId);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <div className="relative">
          <label className="text-white/80">Paste large URL</label>
          <input
            type="search"
            id="default-search"
            className="mt-1 w-full p-4 text-md text-gray-900 border rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 "
            placeholder="https://stackoverflow.com/questions/72597602/nanoid4..."
            onChange={handleInputChange}
            value={destination}
          />
        </div>

        <button
          type="submit"
          className="text-white mt-2 bg-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          Generate
        </button>
      </form>
      {loader && (
        <div className="mt-6 flex text-white/80 text-2xl lg:text-4xl">
          <Spinner size={"lg"} color={"success"} light={false} />
          <h1 className="pl-4">Building...</h1>
        </div>
      )}
      {shortUrl && <ResultCard shortUrl={shortUrl} />}
    </>
  );
};
