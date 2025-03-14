import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../layout/layout";

export function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/auction/listings?limit=21&sortOrder=asc&active=true&sort=created&page=${page}`,
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [page]);

  const filteredData = data.filter((listing) =>
    listing.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold">ALL LISTINGS</h1>

      <input
        type="text"
        placeholder="Search listings..."
        className="border p-2 rounded mb-4 w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="max-w-7xl flex gap-4 flex-wrap m-auto">
        {filteredData.length > 0 ? (
          filteredData.map((listing) => (
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
          ))
        ) : (
          <p className="text-center text-gray-500">No listings found.</p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 mr-2 bg-gray-500 text-white rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>
      </div>
    </Layout>
  );
}
