const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000; // Dùng PORT từ môi trường nếu có

// Route để xử lý request tới ChatGPT
app.get('/chatgpt', async (req, res) => {
    try {
        // Cookie của bạn
        const cookies = `__cf_bm=...; __Secure-next-auth.session-token=...`;

        // Gửi request tới ChatGPT
        const response = await axios.get('https://chatgpt.com/', {
            headers: {
                'Cookie': cookies,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
            }
        });

        // Gửi phản hồi từ ChatGPT về client
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Có lỗi xảy ra: ' + error.message);
    }
});

// Bắt đầu server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
