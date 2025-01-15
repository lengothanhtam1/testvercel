const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Đường dẫn proxy chính
app.get("/proxy", async (req, res) => {
    try {
        // Gửi request tới ChatGPT (hoặc API khác)
        const response = await axios.get("https://chatgpt.com/", {
            headers: {
                "Cookie": "__cf_bm=YOUR_COOKIE; __Secure-next-auth.session-token=YOUR_SESSION_TOKEN;",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
            },
        });

        // Gửi phản hồi từ API đến client
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send(`Lỗi proxy: ${error.message}`);
    }
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server đang chạy tại http://localhost:${PORT}`);
});
