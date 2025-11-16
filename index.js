// let templa = "";
// let allArticles = [];

// async function loadTemplate() {
//     const response = await fetch("./main.hbs");
//     let template = await response.text();
//     templa = Handlebars.compile(template);
// }

// function renderTemplate() {
//     let articles = document.querySelector("#articles");
//     const html = allArticles.map(article => templa(article)).join("");
//     articles.innerHTML = html;
// }

// function loadData() {
//     const response = fetch("https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=8d92af5550d94d538a3ef8df10669c61",
//         { headers: { 'X-Api-Key': '8d92af5550d94d538a3ef8df10669c61' } })

//     let data = response.json();
//     allArticles = data.articles || [];
//     renderTemplate();
// }

// window.addEventListener("DOMContentLoaded", () => {
//     loadTemplate();
//     let btn = document.querySelector(".mainButton")
//     btn.addEventListener("click", () => {
//         if (!allArticles.lengts) {
//             loadData();
//         } else {
//             renderTemplate();
//         }
//     })


// })


//1
let allArticles = [];
let templa;

// 1. Завантаження шаблону
async function loadTemplate() {
    const response = await fetch('./pagination.hbs');
    const template = await response.text();
    templa = Handlebars.compile(template);
}

// 2. Рендер статей
function rendering() {
    const articles = document.getElementById('articles');
    const html = allArticles.map(article => templa(article)).join('');
    articles.innerHTML = html;
}

// 3. Завантаження новин
async function loadData() {
const params = new URLSearchParams ({
    _limit: 7

})

    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts?${params}`
            // 'https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=1aef25568e3e45d8bc7fa22f084bb7d2',
            // { headers: { 'X-Api-Key': '1aef25568e3e45d8bc7fa22f084bb7d2' } }
        );

        const data = await response.json();
        allArticles = data;

        rendering();
    } catch (error) {
        console.error("Помилка при завантаженні даних:", error);
    }
}

// 4. Ініціалізація
window.addEventListener('DOMContentLoaded', async () => {
    await loadTemplate();

    const but = document.getElementById('butt');
    but.addEventListener('click', () => {
        if (!allArticles.length) {
            loadData();
        } else {
            rendering();
        }
    });
});

// const fetchPostsBtn = document.querySelector(".btn");
// const postList = document.querySelector(".posts");

// fetchPostsBtn.addEventListener("click", async () => {
//     try {
//         const posts = await fetchPosts();
//         renderPosts(posts);
//     } catch (error) {
//         console.log(error);
//     }
// });

// async function fetchPosts() {
//     const params = new URLSearchParams({
//         _limit: 2,

//         _page: 1
//     });

//     const response = await axios.get(
//         `https://jsonplaceholder.typicode.com/posts?${params}`
//     );
//     return response.data;
// }

// function renderPosts(posts) {
//     const markup = posts
//         .map(({ id, title, body, userId }) => {
//             return `<li>
//           <h2 class="post-title">${title.slice(0, 30)}</h2>
//           <p><b>Post id</b>: ${id}</p>
//           <p><b>Author id</b>: ${userId}</p>
//           <p class="post-body">${body}</p>
//         </li>`;
//         })
//         .join("");
//     postList.innerHTML = markup;
// }
