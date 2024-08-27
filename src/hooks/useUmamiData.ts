import { useState, useEffect } from "react";
import axios from "axios";

const useUmamiData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const proxyUrl = "/stats";
  const targetUrl =
    "/api/stats?website_id=00f28cd3-4a1f-4260-8c99-6dc2c0629e80";
  const url = `${proxyUrl}${encodeURIComponent(targetUrl)}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useUmamiData;
