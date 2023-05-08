import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import LandingPage from "../landingPage/LandingPage";
import {store} from "../../redux/store";

test("renders landing page with banner image", () => {
  render(
    <Provider store={store}>
      <LandingPage />
    </Provider>
  );
  const landingPage = screen.getByTestId("landing-page");
  expect(landingPage).toBeInTheDocument();
});
