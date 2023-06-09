export function addErrorsToData(data, errors) {
    const modifiedData = data.map(item => ({ ...item }));

    for (let i = 0; i < modifiedData.length; i++) {
        for (let j = 0; j < errors; j++) {
            const errorType = Math.floor(Math.random() * 3);
            const field = ['name', 'address', 'phone'][Math.floor(Math.random() * 3)];

            if (modifiedData[i][field].length === 0) continue;

            switch (errorType) {
                case 0:
                    if (modifiedData[i][field].length > 1) {
                        const indexToDelete = Math.floor(Math.random() * modifiedData[i][field].length);
                        modifiedData[i][field] = modifiedData[i][field].slice(0, indexToDelete) + modifiedData[i][field].slice(indexToDelete + 1);
                    }
                    break;
                case 1:
                    if (modifiedData[i][field].length < 100) {
                        const indexToAdd = Math.floor(Math.random() * modifiedData[i][field].length);
                        const charToAdd = String.fromCharCode(97 + Math.floor(Math.random() * 26));
                        modifiedData[i][field] = modifiedData[i][field].slice(0, indexToAdd) + charToAdd + modifiedData[i][field].slice(indexToAdd);
                    }
                    break;
                case 2:
                    if (modifiedData[i][field].length > 1) {
                        const indexToSwap = Math.floor(Math.random() * (modifiedData[i][field].length - 1));
                        modifiedData[i][field] = modifiedData[i][field].slice(0, indexToSwap) +
                            modifiedData[i][field][indexToSwap + 1] +
                            modifiedData[i][field][indexToSwap] +
                            modifiedData[i][field].slice(indexToSwap + 2);
                    }
                    break;
            }
        }
    }

    return modifiedData;
}