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
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <table className="table table-hover table-bordered border-dark">
              <thead>
                <tr>
                  <th className="text-center">Pest &amp; Service Name</th>
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
