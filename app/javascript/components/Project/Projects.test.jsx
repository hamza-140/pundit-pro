import React from "react";
import { render, screen } from "@testing-library/react";
import Projects from "./Projects";
import { BrowserRouter, Route } from "react-router-dom";

// Mocking the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        /* Mocked response data */
      }),
    ok: true,
  })
);

describe("Projects", () => {
  it("shows up correctly", async () => {
    // Render the component
    render(

    <BrowserRouter>
      <Projects />
    </BrowserRouter>
    );
  });

});
