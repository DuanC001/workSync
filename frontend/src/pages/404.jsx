import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Helmet } from "react-helmet";
const ErrorPage = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Worksynk | 404 Page</title>
        <meta name="description" content="Worksynk 404 Page" />
      </Helmet>
      <Header />
      <div style={{ textAlign: "center", lineHeight: "2", marginTop: "20px" }}>
        <h2>404. Oops this page doesn't exist</h2>
        <p>
          Go Back to the <Link to="/">Home Page</Link>
        </p>
      </div>
    </>
  );
};
export default ErrorPage;
