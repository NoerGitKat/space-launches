async function httpGetPlanets() {
    const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/planets`,
    );

    return response.json();
}

async function httpGetLaunches() {
    const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/launches`,
    );

    return response.json();
}

async function httpSubmitLaunch(launch) {
    // TODO: Once API is ready.
    // Submit given launch data to launch system.
}

async function httpAbortLaunch(id) {
    // TODO: Once API is ready.
    // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
