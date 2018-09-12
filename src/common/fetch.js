const FETCH = async ({ url = '', options = {method: 'GET'} }) => {
    // Promise 模式
    // 通过 fetch 向 api 请求登录
    // fetch 内无法直接传入 fetch 外部变量, 需要用 window.sessionStorage 存储
    // 再在 fetch 外部提取
    /*
    fetch(url, options)
    .then(response => {
        console.log("response");
        console.log(response);
        return response.json();
    })
    .then(resJSON => {
        console.log("resJSON");
        console.log(resJSON);
        // 因为 sessionStorage 无法储存 object, 所以需要讲 resJSON 转换成 string 再
        // 储存在 sessionStorage
        window.sessionStorage.setItem('fetchResponse', JSON.stringify(resJSON))
    });

    // 从 sessionStorage 提取 fetchResponse, 再将 fetchResponse 转换成 object
    let fetchResponse = JSON.parse(window.sessionStorage.getItem('fetchResponse'));
    window.sessionStorage.clear();
    return [fetchResponse];
    */
    // async/await 模式
    // 通过 fetch 向 api 请求登录
    // 通过 await, async 函数会暂停执行, 直到 fetch 执行完成
    let response = await fetch(url, options);
    // 函数会暂停执行, 直到 res.json() 执行完成
    response = await response.json();
    return response;
}

export default FETCH;
