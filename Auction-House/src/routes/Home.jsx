import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../layout/layout";

export function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/auction/listings?limit=21&sortOrder=asc&active=true&sort=created&page=${page}`,
        );
        const result = await res.json();
        console.log(result);
        setData(result.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [page]);

  return (
    <Layout>
      <h1 className="text-3xl font-bold">ALL LISTINGS</h1>
      <div className="max-w-7xl flex gap-4 flex-wrap m-auto">
        {data.map((listing) => (
          <Link
            key={listing.id}
            to={`/${listing.id}`}
            className="block w-sm h-96 p-4 shadow-2xl"
          >
            <h2>{listing.title}</h2>
            <div className="w-full h-48 flex justify-center items-center bg-gray-100 overflow-hidden">
              {listing.media && listing.media.length > 0 ? (
                <img
                  src={listing.media[0].url}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                  alt="No Image Available"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <p className="truncate">{listing.description}</p>
          </Link>
        ))}
      </div>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </Layout>
  );
}
