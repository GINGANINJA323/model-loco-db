import express from 'express';
import cors from 'cors';
import webpack from 'webpack';
import middleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.dev';

import api from './api';

const { PORT = 3000, DEV } = process.env;

const server = express();

server.use(cors());
server.use(express.static('public'));
server.use(express.json());

// @ts-ignore - Types for config are incorrect
if (DEV) server.use(middleware(webpack(webpackConfig)));

server.use('/api', api);

server.get('/*', (_, res) => {
    res.render('index');
});

server.listen(PORT, () => console.log('MLDB server listening on port', PORT));