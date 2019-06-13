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


/**    MVC     **/

// let model = {
//   data: {
//     book: '',
//     number: 0,
//     id: ''
//   },
//   fetch(id) {
//     return axios.get(`/books/${id}`).then((response) => {
//       this.data = response.data;
//       return response;
//     });
//   },
//   update(id, data) {
//     return axios.put(`/books/${id}`,data).then((response) => {
//       this.data = response.data;
//       return response;
//     });
//   }
// }

// let view = {
//   el: '#app',
//   template: `
//     <div>
//       书名：《__book__》
//       数量：<span id="number">__number__</span>
//     </div>
//     <div>
//       <button id="addOne">加1</button>
//       <button id="minusOne">减1</button>
//       <button id="clear">归零</button>
//     </div>
//   `,
//   render(data) {
//     let html = this.template.replace('__book__', data.book).replace('__number__', data.number);
//     $(this.el).html(html);
//   }
  
// }

// // 添加响应拦截器
// axios.interceptors.response.use((response) => {
//     let { config: {method, url, data} } = response;
//     if (url === '/books/1' && method === 'get') {
//         response.data = model.data;
//     } else if (url === '/books/1' && method === 'put') {
//         Object.assign(model.data, data);
//         response.data = model.data;
//     }
//     return response;
// }, (error) => {
//     return Promise.reject(error);
// });

// model.fetch(1)
//     .then(() => {
//         view.render(model.data);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// // 事件委托
// $('#app').on('click', '#addOne', () => {
//     let oldNumber = $('#number').text() - 0;
//     model.update({number: oldNumber + 1}).then(() => {
//       view.render(model.data);
//     });
// })

// $('#app').on('click', '#minusOne', () => {
//     let oldNumber = $('#number').text() - 0;
//       model.update({number: oldNumber - 1}).then(() => {
//       view.render(model.data);
//     });
// })

// $('#app').on('click', '#clear', () => {
//   model.update({number: 0}).then(() => {
//       view.render(model.data);
//     });
// })