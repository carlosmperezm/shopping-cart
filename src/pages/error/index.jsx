import { Link, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div>
      <h1>Opps</h1>
      <p>An unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to="/">Go Main Page</Link>
    </div>
  );
}
