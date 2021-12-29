import { Link } from "react-router-dom";
import { useDataContext } from "../context/data_context";
import { useEffect } from "react";
import { Loading } from "./Loading";

export const Home = () => {
  const { data, fetchData, loading } = useDataContext();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h1 className="text-center mt-5">MSDS/TC Documents Portal</h1>
          <div className="position-absolute top-50 start-50 translate-middle">
            <table className="table table-hover table-bordered border-dark">
              <thead>
                <tr style={{ paddingRight: 500 }}>
                  <th className="text-center">Services</th>
                </tr>
              </thead>
              <tbody>
                {data.map((data) => (
                  <tr key={data.id}>
                    <td>
                      <Link
                        to={`/documents/${data.id}`}
                        style={{ textDecoration: "none" }}
                      >{`${data.title} (${data.pets_name})`}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
