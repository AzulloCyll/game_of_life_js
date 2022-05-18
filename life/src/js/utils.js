const generateCellSurroundings = () => {
	let result = [];

	for (x = -1; x <= 1; x++)
		for (y = -1; y <= 1; y++) {
			if (!(x === 0 && y === 0)) result.push({ x: x, y: y });
		}
	return result;
};

export { generateCellSurroundings };
