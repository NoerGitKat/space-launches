import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { httpAbortLaunch, httpGetLaunches, httpSubmitLaunch } from "./requests";

function useLaunches(onSuccessSound, onAbortSound, onFailureSound) {
    const [launches, saveLaunches] = useState([]);
    const [isPendingLaunch, setPendingLaunch] = useState(false);
    let { push } = useHistory();

    const getLaunches = useCallback(async () => {
        const fetchedLaunches = await httpGetLaunches();
        saveLaunches(fetchedLaunches);
    }, []);

    useEffect(() => {
        getLaunches();
    }, [getLaunches]);

    const submitLaunch = useCallback(
        async (e) => {
            e.preventDefault();
            setPendingLaunch(true);
            const data = new FormData(e.target);
            const launchDate = new Date(data.get("launch-day"));
            const mission = data.get("mission-name");
            const rocket = data.get("rocket-name");
            const destination = data.get("planets-selector");
            const response = await httpSubmitLaunch({
                launchDate,
                mission,
                rocket,
                destination,
            });

            const success = response.ok;

            if (success) {
                getLaunches();
                setTimeout(() => {
                    setPendingLaunch(false);
                    onSuccessSound();
                }, 800);
                push("/upcoming");
            } else {
                onFailureSound();
            }
        },
        [getLaunches, onSuccessSound, onFailureSound, push],
    );

    const abortLaunch = useCallback(
        async (id) => {
            const response = await httpAbortLaunch(id);

            const success = response.ok;
            if (success) {
                getLaunches();
                onAbortSound();
            } else {
                onFailureSound();
            }
        },
        [getLaunches, onAbortSound, onFailureSound],
    );

    return {
        launches,
        isPendingLaunch,
        submitLaunch,
        abortLaunch,
    };
}

export default useLaunches;
