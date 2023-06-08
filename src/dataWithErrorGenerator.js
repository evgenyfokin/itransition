function dataWithErrorGenerator(value, errors, region) {
    const alphabet = region === 'region1' ? 'abcdefghijklmnopqrstuvwxyz' : 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const digits = '0123456789';
    const validChars = alphabet + digits;

    for(let i = 0; i < errors; i++) {
        const errorType = Math.floor(Math.random() * 3);

        switch(errorType) {
            case 0:
                const deleteIndex = Math.floor(Math.random() * value.length);
                value = value.slice(0, deleteIndex) + value.slice(deleteIndex + 1);
                break;
            case 1:
                const addIndex = Math.floor(Math.random() * value.length);
                const randomChar = validChars[Math.floor(Math.random() * validChars.length)];
                value = value.slice(0, addIndex) + randomChar + value.slice(addIndex);
                break;
            case 2:
                if (value.length < 2) {
                    break;
                }
                const swapIndex = Math.floor(Math.random() * (value.length - 1));
                value = value.slice(0, swapIndex) + value.charAt(swapIndex + 1) + value.charAt(swapIndex) + value.slice(swapIndex + 2);
                break;
            default:
                break;
        }
    }

    return value;
}
export default dataWithErrorGenerator