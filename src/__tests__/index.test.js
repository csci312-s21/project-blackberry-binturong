import fetchMock from "fetch-mock-jest";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import WRMCWebsite from "../pages/index";

describe("Top level integration tests", () => {

  test("Smoke test", async () => {
    await act(async () => {
      await fetchMock.flush(true);
    });
  });
});
  
describe("Show details integration tests", () => {
  let _Date;

  beforeAll(() => {
    _Date = Date;
  });

  afterAll(() => {
    Date = _Date; // eslint-disable-line
  });

  test("clicking on SOTW title brings up details page", () => {
    render(<WRMCWebsite />);
    const showOTW = screen.getByTestId("SOTW title");
    fireEvent.click(showOTW);
    expect(screen.getByTestId("show details page")).toBeInTheDocument();
  });

  test("clicking on show from NextThreeShows brings up details page", () => {
    // mock date.now function for deterministic testing of NextThreeShows
    Date.now = jest.fn(() => new Date(2021, 3, 27, 17));
    render(<WRMCWebsite />);
    const showSnippets = screen.getAllByTestId("show snippet");
    fireEvent.click(showSnippets[0]);
    expect(screen.getByTestId("show details page")).toBeInTheDocument();
  });

  test("clicking a NavBar item removes show details page", () => {
    render(<WRMCWebsite />);
    const showOTW = screen.getByTestId("SOTW title");
    fireEvent.click(showOTW);
    expect(screen.getByTestId("show details page")).toBeInTheDocument();
    const homePage = screen.getByText("Home");
    fireEvent.click(homePage);
    expect(screen.queryByTestId("show details page")).not.toBeInTheDocument();
    expect(screen.getByTestId("SOTW title")).toBeInTheDocument();
  });
});

// describe("Create playlists tests", () => {
//   beforeEach(() => {
//     render(<Home />);
//   });

//   test("Entering song adds to playlist", () => {
    
//   });

//   test("Updating song attribute updates song", () => {
    
//   });

//   test("Deleting entered song removes it from playlist", () => {
    
//   });
// });

describe("Start show button integration tests", () => {
  beforeEach(() => {
    render(<WRMCWebsite />);
  });

  test("Start show button only visible when logged in", () => {
    expect(screen.queryByRole("button", { name: "Start Show!" })).not.toBeInTheDocument();
    fireEvent.click(screen.queryByRole("button", { name: "In" }));
    expect(screen.getByRole("button", { name: "Start Show!" })).toBeInTheDocument();
    fireEvent.click(screen.queryByRole("button", { name: "Out" }));
    expect(screen.queryByRole("button", { name: "Start Show!" })).not.toBeInTheDocument();
  });

  test("Start show button takes user to playlist logger", () => {
    fireEvent.click(screen.queryByRole("button", { name: "In" }));
    expect(screen.getByRole("button", { name: "Start Show!" })).toBeInTheDocument();
    const options = screen.queryAllByTestId("show-option");
    const selector = screen.getByRole("combobox");
    fireEvent.change(selector, { target: { value: options[0].value }});
    const startShowButton = screen.getByRole("button", { name: "Start Show!" });
    expect(startShowButton).toBeEnabled();
    fireEvent.click(startShowButton);
    expect(screen.getByRole("button", { name: "Add Song" })).toBeInTheDocument();
  });
});

describe("PlaylistLogger integration tests", () => {
  const sampleTitle = "Sample Title";
  const sampleArtist = "Sample Artist";
  const sampleAlbum = "Sample Album";

  const populateTextInputs = () => {
    const titleInput = screen.getByRole("textbox", {name: "Title"});
    const artistInput = screen.getByRole("textbox", {name: "Artist"});
    const albumInput = screen.getByRole("textbox", {name: "Album"});

    fireEvent.change(titleInput, { target: { value: sampleTitle } });
    fireEvent.change(artistInput, { target: { value: sampleArtist } });
    fireEvent.change(albumInput, { target: { value: sampleAlbum } });
  }

  beforeEach(() => {
    render(<WRMCWebsite />);
  });
  
  test("PlaylistLogger not visible when logged out", () => {
    fireEvent.click(screen.queryByRole("button", { name: "In" }));
    const options = screen.queryAllByTestId("show-option");
    const selector = screen.getByRole("combobox");
    fireEvent.change(selector, { target: { value: options[0].value }});
    const startShowButton = screen.getByRole("button", { name: "Start Show!" })
    fireEvent.click(startShowButton);
    expect(screen.getByRole("button", { name: "Add Song" })).toBeInTheDocument();
    fireEvent.click(screen.queryByRole("button", { name: "Out" }));
    expect(screen.queryByRole("button", { name: "Add Song" })).not.toBeInTheDocument();
    expect(screen.getByText("Show Of The Week")).toBeInTheDocument();
  });

  test("saved songs persist when navigating to and from PlaylistLogger", () => {
    fireEvent.click(screen.queryByRole("button", { name: "In" }));
    const options = screen.queryAllByTestId("show-option");
    const selector = screen.getByRole("combobox");
    fireEvent.change(selector, { target: { value: options[0].value }});

    fireEvent.click(screen.getByRole("button", { name: "Start Show!" }));
    fireEvent.click(screen.getByRole("button", { name: "Add Song" }));

    populateTextInputs()
    fireEvent.click(screen.getByRole("button", { name: "Enter" }));
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();

    fireEvent.click(screen.getByText("Home"));
    fireEvent.click(screen.getByRole("button", { name: "Go to Current Playlist" }));

    expect(screen.getByRole("textbox", {name: "Title"})).toHaveValue(sampleTitle);
    expect(screen.getByRole("textbox", {name: "Artist"})).toHaveValue(sampleArtist);
    expect(screen.getByRole("textbox", {name: "Album"})).toHaveValue(sampleAlbum);
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });
});

describe("PlaylistDetails integration tests", () => {
  beforeEach(() => {
    render(<WRMCWebsite />);
  });

  test("clicking on a playlist in show details brings up playlist details", () => {
    const showOTW = screen.getByTestId("SOTW title");
    fireEvent.click(showOTW);
    const playlists = screen.getAllByTestId("playlist-date");
    playlists.forEach((pl) => expect(pl).toBeInTheDocument());
    fireEvent.click(playlists[0]);
    expect(screen.getByRole("button", { name: "<< Back to show information" })).toBeInTheDocument();
  });

  test("clicking button in playlist details goes back to show details", () => {
    const showOTW = screen.getByTestId("SOTW title");
    fireEvent.click(showOTW);
    const playlists = screen.getAllByTestId("playlist-date");
    playlists.forEach((pl) => expect(pl).toBeInTheDocument());
    fireEvent.click(playlists[0]);
    const backButton = screen.getByRole("button", { name: "<< Back to show information" });
    expect(backButton).toBeInTheDocument();
    fireEvent.click(backButton);
    screen.getAllByTestId("playlist-date").forEach((pl) => expect(pl).toBeInTheDocument());
    expect(screen.queryByRole("button", { name: "<< Back to show information" })).not.toBeInTheDocument();
  });

  test("Tests that the see-full-schedule button correctly displays the schedule", () => {
    fireEvent.click(screen.queryByRole("button", { name: "See Full Schedule" }));
    expect(screen.queryByTestId("schedule")).toBeInTheDocument();
  });

});