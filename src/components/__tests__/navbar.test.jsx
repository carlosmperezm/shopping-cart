import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  render,
  screen,
  getAllByRole,
  act,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import NavBar from "../navbar";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

beforeEach(() => {
  render(
    <MemoryRouter>
      <NavBar />
    </MemoryRouter>
  );
});

afterEach(cleanup);

describe("NavBar component", () => {
  it("renders correctly", () => {
    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();
    const links = getAllByRole(navbar, "link");
    links.forEach((link) => expect(link).toBeInTheDocument());
  });
  it("stays after links are clicked", () => {
    const user = userEvent.setup();
    const navbar = screen.getByRole("navigation");
    const links = getAllByRole(navbar, "link");
    links.forEach(async (link) => {
      await act(async () => await user.click(link));
      expect(navbar).toBeInTheDocument();
    });
  });
});
