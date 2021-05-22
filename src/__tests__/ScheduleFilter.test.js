import { render, screen, fireEvent } from "@testing-library/react";
import ScheduleFilter from "../components/ScheduleFilter";

describe("ScheduleFilter tests", () => {
  const handler = jest.fn();

  beforeEach(() => {
    handler.mockReset();
  });

  const pages = ["Week", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const startPage = "Monday";
  const newPage = "Tuesday";

  test("Clicking the day options updates the page", () => {
    render(<ScheduleFilter pageList={pages} currentPage={startPage} setCurrentPage={handler}/>);

    fireEvent.click(screen.getByText(newPage));

    expect(handler).toHaveBeenCalled();
    expect(handler).toHaveBeenCalledWith(newPage);
  });

});