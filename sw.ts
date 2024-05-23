// 定义缓存空间名称
const CACHE_NAME = "test-1"; //修改此值可以强制更新缓存

// 定义需要缓存的文件目录
const FILE_TO_CACHE = [
    "/src/main.tsx",
];

self.addEventListener("install", (e) => {
    console.log("Service Worker 状态： instal45646");
    caches.open(CACHE_NAME).then(function (cache) {
        // cache对象addAll方法解析（同fetch）并缓存所有的文件
        return cache.addAll(FILE_TO_CACHE);
    })
        .then(() => {
            console.log("所有资源缓存成功");
        })
});



self.addEventListener("activate", (e) => {
    console.log("Service Worker 状态： activate");

});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response)
                return response;
            return fetch(event.request);
        })
    );
});

