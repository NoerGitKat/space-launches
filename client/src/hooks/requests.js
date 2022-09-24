async function httpGetPlanets() {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/planets`,
        );

        return response.json();
    } catch (err) {
        return { ok: false };
    }
}

async function httpGetLaunches() {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/launches`,
        );

        return response.json();
    } catch (err) {
        return { ok: false };
    }
}

async function httpSubmitLaunch(launch) {
    const opts = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(launch),
    };

    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/launches`,
            opts,
        );

        return response;
    } catch (err) {
        return { ok: false };
    }
}

async function httpAbortLaunch(id) {
    // TODO: Once API is ready.
    // Delete launch with given ID.
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
