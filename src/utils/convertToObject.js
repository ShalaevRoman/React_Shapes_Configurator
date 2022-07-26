export const convertToObject = (value) => {
    const positionKeys = ["x", "y", "z"];

    const valueArray = value.split(",").splice(0, 3);

    return valueArray.reduce((accumulator, value, index) => {
        accumulator = { ...accumulator, [positionKeys[index]]: Number(value).toString() };
        return accumulator;
    }, {});
};


export const uniqueID = () => {
    return Math.floor(Math.random() * Date.now())
}

export const normalizeInitialDataFigure = ({name, type, color, wireframe, visible, position, rotation, scale}) => {
    const getCoordinates = ({x, y, z}) => {
        let result = '';

        if(x) {
            result = y ? `${x},` : x
        };
        if(y) {
            result += z ? `${y},` : y
        };
        if(z) {
            result += z
        }

        return result;
    };

    return {
        name,
        type,
        position: getCoordinates(position),
        rotation: getCoordinates(rotation),
        scale: getCoordinates(scale),
        color,
        wireframe,
        visible,
    };
};