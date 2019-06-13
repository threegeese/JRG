let bookInfo = {
    book: "JavaScript 高级程序设计",
    number: 0,
    id: 0001
};

// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        let { config: { method, url, data } } = response;
        if (url === "/books/1" && method === "get") {
            response.data = bookInfo;
        } else if (url === "/books/1" && method === "put") {
            Object.assign(bookInfo, data);
            response.data = bookInfo;
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

axios.get("/books/1")
    .then(({ data }) => {
        $("#app").html(
            $("#app").html()
                .replace("__book__", data.book)
                .replace("__number__", data.number)
        );
    })
    .catch(error => {
        console.log(error);
    });

// 事件委托
$("#app").on("click", "#addOne", () => {
    let oldNumber = $("#number").text() - 0;
    axios.put("/books/1", {
        number: oldNumber + 1
    }).then(() => {
        $("#number").text(oldNumber + 1);
    });
});

$("#app").on("click", "#minusOne", () => {
    let oldNumber = $("#number").text() - 0;
    axios.put("/books/1", {
        number: oldNumber - 1
    })
    .then(() => {
        $("#number").text(oldNumber - 1);
    });
});

$("#app").on("click", "#clear", () => {
    axios.put("/books/1", {
        number: 0
    })
    .then(() => {
        $("#number").text(0);
    });
});