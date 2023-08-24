import { render, screen, cleanup } from "@testing-library/react";
import App from "./App";

jest.mock('App', () => jest.fn())
describe("renders learn react link", () => {
  beforeAll(() => {
    cleanup();
  });

  render(<App />);

  expect(screen.getByTestId("main-app")).toBeInTheDocument();
});
