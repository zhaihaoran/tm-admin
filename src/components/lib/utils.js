module.exports = {
    /**
     * 将value移动至数组首位
     *
     * @param {any} value obj || num
     * @param {any} array Array[obj] || Array
     * @param {any} name 辨识的字段名称
     * @returns
     */
    moveToTop(value, array, name = "id") {
        const index = array.findIndex(el => el[name] === value[name]);
        array.splice(index, 1);
        array.unshift(value)
        return array;
    }
}
