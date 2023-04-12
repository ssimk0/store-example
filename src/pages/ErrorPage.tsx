import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div id="error-page" className="grid place-content-center text-center min-h-screen gap-4">
      <h1 className="text-5xl font-bold" >Oops!</h1>
      <p className="text-xl">Sorry, an unexpected error has occurred.</p>
      <p className="text-2xl font-italic">
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage
