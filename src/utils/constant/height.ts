import {useEffect, useState} from 'react';
//==================== Response Height Screen =================//
export const MainScreenHeight = () => {
    let divide = 60
    const [height, setHeight] = useState(window.innerHeight - divide);

    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - divide);
        };
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, [])
    return height.toString();
};

export const CardScreenHeightReport = () => {
    let divide = 75
    const [height, setHeight] = useState(window.innerHeight - divide);

    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - divide);
        };
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    return height.toString();
};
//==================== Response Height Card =================//
export const CardScreenHeight = () => {
    let divide = 0
    const [height, setHeight] = useState(window.innerHeight - divide);

    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - divide);
        };
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    return height.toString();
};

//==================== Response Height Card =================//
export const MainAuthScreenHeight = () => {
    let divide = 0
    const [height, setHeight] = useState(window.innerHeight - divide);

    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - divide);
        };
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    return height.toString();
};

//==================== Sidebar Height Screen =================//
export const SidebarScreenHeight = () => {
    let divide = 100
    const [height, setHeight] = useState(window.innerHeight - divide);

    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - divide);
        };
        window.addEventListener('resize', updateHeight);
        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    return height.toString();
};


//==================== ChartSection1 Screen =================//
export const ChartLie = () => {
    let divide = 800
    const [height, setHeight] = useState(window.innerHeight - divide);
    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - divide);
        };
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    return height.toString();
};
export const ChartPie = () => {
    let divide = 800
    const [height, setHeight] = useState(window.innerHeight - divide);
    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - divide);
        };
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    return height.toString();
};

export const ChartRainfall = () => {
    let divide = 525
    const [height, setHeight] = useState(window.innerHeight - divide);
    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - divide);
        };
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    return height.toString();
};

export const CardScreenInComOutCome = (input: number) => {
    let divide = input //630
    const [height, setHeight] = useState(window.innerHeight - divide);
    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - divide);
        };
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    return height.toString();
};
export const CardScreenLg = () => {
    let divide = 777
    const [height, setHeight] = useState(window.innerHeight - divide);
    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - divide);
        };
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    return height.toString();
};
export const CardScreenBase = () => {
    let divide = 657
    const [height, setHeight] = useState(window.innerHeight - divide);
    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - divide);
        };
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    return height.toString();
};
export const CardSupply = () => {
    let divide = 776
    const [height, setHeight] = useState(window.innerHeight - divide);
    useEffect(() => {
        const updateHeight = () => {
            setHeight(window.innerHeight - divide);
        };
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);
    return height.toString();
};