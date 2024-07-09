import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/fs");
        setData(res.data.data);
        setLoading(false)
      } catch (error) {
        setData(`Error: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  if(loading) return <h4>Loading.....</h4>

  return (
    <div>
      {data}
    </div>
  );
};

export default App;
