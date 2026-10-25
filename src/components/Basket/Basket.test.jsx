import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { BasketProvider, useBasket, normalizeBasket, changeQuantity, calculateTotals } from "./index";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
});
beforeEach(() => localStorage.clear());

function Shop() {
  const { count, openBasket } = useBasket();
  return <button onClick={openBasket}>Basket {count}</button>;
}

test("quick ordering updates quantities, exact totals, removal and saved selections", () => {
  const view = render(<BasketProvider><Shop /></BasketProvider>);
  fireEvent.click(screen.getByRole("button", { name: "Basket 0" }));
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Quick add Golden Harvest" }));
  fireEvent.click(screen.getByRole("button", { name: "Quick add Golden Harvest" }));
  fireEvent.click(screen.getByRole("button", { name: "Quick add Frostbite Stout" }));
  expect(screen.getByRole("button", { name: "Basket 3" })).toBeInTheDocument();
  expect(calculateTotals(JSON.parse(localStorage.getItem("burgbrau-basket-v1")))).toEqual({ count: 3, subtotal: 897, deposit: 24, total: 921 });
  fireEvent.click(screen.getByRole("button", { name: "Decrease Golden Harvest quantity" }));
  fireEvent.click(screen.getByRole("button", { name: "Remove Frostbite Stout" }));
  fireEvent.click(screen.getByRole("button", { name: "Close basket" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  view.unmount();
  render(<BasketProvider><Shop /></BasketProvider>);
  expect(screen.getByRole("button", { name: "Basket 1" })).toBeInTheDocument();
});

test("corrupted saved quantities are discarded and quantities stay between zero and 99", () => {
  expect(normalizeBasket({ "golden-harvest": -3, wildwood: "2", "frostbite-stout": 400, unknown: 9 })).toEqual({ "frostbite-stout": 99 });
  expect(changeQuantity({ wildwood: 1 }, "wildwood", -1)).toEqual({});
  expect(changeQuantity({ wildwood: 99 }, "wildwood", 1)).toEqual({ wildwood: 99 });
  expect(changeQuantity({}, "unknown", 1)).toEqual({});
  expect(calculateTotals({})).toEqual({ count: 0, subtotal: 0, deposit: 0, total: 0 });
});
