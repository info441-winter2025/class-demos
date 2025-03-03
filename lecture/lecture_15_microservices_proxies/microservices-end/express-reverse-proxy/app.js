import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import request from 'request';
import {createProxyMiddleware } from 'http-proxy-middleware'

import usersRouter from './routes/users.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);

const proxyMiddleware1 = createProxyMiddleware({
    target: 'http://127.0.0.1:5001',
    pathRewrite: (path) => path.replace(/\/(?:(?=\?)|$)/, ""),
    changeOrigin: true
})

app.get('/api/double', proxyMiddleware1);

const servers = ['http://127.0.0.1:6001', 'http://127.0.0.1:6002' ];
let cur_server_index = 0;
app.use('/api/square', (req, res) => {
  try {
  	cur_server_index = (cur_server_index  + 1) % servers.length;
  	req.pipe(request({ url: servers[cur_server_index] + req.originalUrl })).pipe(res);
  } catch (error) {
	console.log("error in /api/square:" + error)
	res.status(500).json({status: "error", error: error});
  }
})


// const proxyMiddleware2 = createProxyMiddleware({
//     target: 'http://127.0.0.1:6001',
//     pathRewrite: (path) => path.replace(/\/(?:(?=\?)|$)/, ""),
//     changeOrigin: true
// })

// app.get('/api/square', proxyMiddleware2);

const proxyMiddleware = createProxyMiddleware({
    target: 'http://127.0.0.1:4000',
    pathRewrite: (path, req) => req.baseUrl,
    changeOrigin: true
})

app.use('/*', proxyMiddleware)

export default app;
