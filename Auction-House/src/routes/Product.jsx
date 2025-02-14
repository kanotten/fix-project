import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../layout/layout";

export function Product() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  console.log("Product ID:", id);

  useEffect(() => {
    if (!id) return; // Prevent API call if id is undefined

    async function getData() {
      try {
        const res = await fetch(
          `https://v2.api.noroff.dev/auction/listings/${id}`,
        );
        if (!res.ok) throw new Error("Failed to fetch data");

        const result = await res.json();
        console.log("API Response:", result);

        setData(result.data || {}); // Ensure data is always an object
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    getData();
  }, [id]);

  return (
    <Layout>
      <div id="card" className="m-auto max-w-2xl p-4">
        {data && data.id ? (
          <div>
            <h2 className="text-2xl font-bold">{data.title}</h2>

            {/* Image Handling */}
            <div className="mt-4 w-full flex justify-center">
              {data.media && data.media.length > 0 ? (
                <img
                  src={data.media[0].url}
                  alt={data.title}
                  className="w-full max-h-96 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src =
                      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg";
                  }}
                />
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                  alt="No Image Available"
                  className="w-full max-h-96 object-cover rounded-lg"
                />
              )}
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-700">
              {data.description || "No description available."}
            </p>

            {/* Metadata */}
            <div className="mt-6 text-gray-500 text-sm">
              <p>
                <strong>Created:</strong>{" "}
                {data.created ? new Date(data.created).toLocaleString() : "N/A"}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {data.updated ? new Date(data.updated).toLocaleString() : "N/A"}
              </p>
              <p>
                <strong>Ends At:</strong>{" "}
                {data.endsAt ? new Date(data.endsAt).toLocaleString() : "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <h2 className="text-center text-lg font-semibold">Loading...</h2>
        )}
      </div>
    </Layout>
  );
}
