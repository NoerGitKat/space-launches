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
    const opts = {
        method: "DELETE",
    };
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_BASE_URL}/launches/${id}`,
            opts,
        );

        return response;
    } catch (error) {
        return { ok: false };
    }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
