// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// API route to proxy requests to ChatGPT
app.get('/chatgpt', async (req, res) => {
    try {
        // Lấy cookie từ file cookies.json
        const cookies = require('./cookies');  // Đảm bảo bạn đã có file cookies chứa dữ liệu đúng

        // Gửi yêu cầu đến ChatGPT với cookie
        const response = await axios.get('https://chatgpt.com/', {
            headers: {
                'Cookie': cookies,  // Truyền cookie vào trong header
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
            }
        });

        // Gửi phản hồi từ ChatGPT về client
        res.status(200).send(response.data);
    } catch (error) {
        res.status(500).send('Có lỗi xảy ra: ' + error.message);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
