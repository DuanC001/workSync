import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Helmet } from "react-helmet";

const EmployeeJoin = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Worksynk | Employee joining</title>
        <meta name="description" content="Worksynk employee joining page" />
      </Helmet>
      <Header />
      <div style={{ textAlign: "center", lineHeight: "2", marginTop: "40px" }}>
        <h2>Congratulations, you successfully joined our company🎉</h2>
      </div>
    </>
  );
};
export default EmployeeJoin;
